'use client';
import { useRef, useEffect, useMemo } from 'react';
import * as d3 from 'd3';

type MainVisualGraphProps = {
  data: {
    timestamp: number;
    gamma: number;
    alpha: number;
    beta: number;
  }[];
  width: number;
  height: number;
  currentTimestamp: number;
};
export const MainVisualGraph: React.FC<MainVisualGraphProps> = ({
  data,
  width,
  height,
  currentTimestamp,
}) => {
  const gx = useRef<SVGSVGElement>(null);
  const gy = useRef<SVGSVGElement>(null);

  const margin = useMemo(() => {
    return { top: 20, right: 20, bottom: 20, left: 50 };
  }, []);
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const first = data[0];
  const last = data[data.length - 1];

  const x = useMemo(() => {
    return d3.scaleLinear().domain([first.timestamp, last.timestamp]).range([0, innerWidth]);
  }, [first, last, innerWidth]);

  const y = useMemo(() => {
    return d3.scaleLinear().domain([-180, 360]).range([innerHeight, 0]);
  }, [innerHeight]);

  const { gamma, alpha, beta } = useMemo(() => {
    return data.reduce(
      (acc, d) => {
        const ts = d.timestamp;
        const nextValue = {
          gamma: [[ts, d.gamma], ...acc.gamma] as [number, number][],
          alpha: [[ts, d.alpha], ...acc.alpha] as [number, number][],
          beta: [[ts, d.beta], ...acc.beta] as [number, number][],
        };
        return nextValue;
      },
      {
        gamma: [] as [number, number][],
        alpha: [] as [number, number][],
        beta: [] as [number, number][],
      },
    );
  }, [data]);

  const line = d3
    .line()
    .x((d) => x(d[0]))
    .y((d) => y(d[1]));

  useEffect(() => {
    const targetElement = gx.current;
    if (!targetElement) return;
    d3.select(targetElement).call(
      d3
        .axisBottom(x)
        .ticks(4)
        .tickFormat((d) => {
          const date = new Date(d as number);
          if (width < 640) {
            return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
          }
          return `${
            date.getMonth() + 1
          }/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        }),
    );
    return () => {
      d3.select(targetElement).selectAll('g').remove();
    };
  }, [gx, x, width]);

  useEffect(() => {
    const targetElement = gy.current;
    if (!targetElement) return;
    d3.select(targetElement).call(
      d3
        .axisLeft(y)
        .tickValues([-180, -90, 0, 90, 180, 270, 360])
        .tickFormat((d) => {
          if (d === 360) {
            return '360deg';
          }
          return `${d}`;
        }),
    );
    return () => {
      d3.select(targetElement).selectAll('g').remove();
    };
  }, [gy, y]);

  const currentLinePoositionX = x(currentTimestamp);
  const isCurrentLineVisible =
    currentTimestamp >= first.timestamp && currentTimestamp <= last.timestamp;

  return (
    <svg width={width} height={height}>
      <title>デバイスの回転の値（alpha、beta、gamma）の折れ線グラフ</title>
      <g ref={gx} transform={`translate(${margin.left},${height - margin.bottom})`} />
      <g ref={gy} transform={`translate(${margin.left},${margin.bottom})`} />
      <path
        className="stroke-rose-300"
        transform={`translate(${margin.left}, ${margin.top})`}
        fill="none"
        strokeWidth="2"
        d={line(alpha)!}
      />
      <path
        className="stroke-green-300"
        transform={`translate(${margin.left}, ${margin.top})`}
        fill="none"
        strokeWidth="2"
        d={line(gamma)!}
      />
      <path
        className="stroke-sky-300"
        transform={`translate(${margin.left}, ${margin.top})`}
        fill="none"
        stroke="blue"
        strokeWidth="2"
        d={line(beta)!}
      />
      {isCurrentLineVisible && (
        <line
          transform={`translate(${margin.left}, ${margin.top})`}
          x1={currentLinePoositionX}
          x2={currentLinePoositionX}
          y1="0"
          y2={height - margin.bottom - margin.top}
          fill="none"
          stroke="rgb(239 68 68)"
          strokeWidth={4}
        />
      )}
    </svg>
  );
};
