'use client';
import { useRef, useEffect, useMemo } from 'react';
import * as d3 from 'd3';

type DeviceOrientationLineGraphProps = {
  orientationData: {
    timestamp: number;
    gamma: number;
    alpha: number;
    beta: number;
  }[];
  width?: number;
  height?: number;
};

export const DeviceOrientationLineGraph: React.FC<DeviceOrientationLineGraphProps> = ({
  orientationData,
  width = 640,
  height = 320,
}) => {
  const gx = useRef<SVGSVGElement>(null);
  const gy = useRef<SVGSVGElement>(null);

  const margin = { top: 20, right: 20, bottom: 20, left: 50 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const x = useMemo(() => {
    return d3.scaleLinear().domain([-30, 0]).range([0, innerWidth]);
  }, [innerWidth]);

  const y = useMemo(() => {
    return d3.scaleLinear().domain([-180, 360]).range([innerHeight, 0]);
  }, [innerHeight]);

  const line = d3
    .line()
    .x((d) => x(d[0]))
    .y((d) => y(d[1]));

  const { gamma, alpha, beta } = orientationData.reduce(
    (acc, d) => {
      const now = Date.now();
      const x = ((now - d.timestamp) / 1000) * -1;
      if (x < -30) return acc;
      const nextValue = {
        gamma: [[x, d.gamma], ...acc.gamma] as [number, number][],
        alpha: [[x, d.alpha], ...acc.alpha] as [number, number][],
        beta: [[x, d.beta], ...acc.beta] as [number, number][],
      };
      return nextValue;
    },
    {
      gamma: [] as [number, number][],
      alpha: [] as [number, number][],
      beta: [] as [number, number][],
    },
  );

  useEffect(() => {
    const targetElement = gx.current;
    if (!targetElement) return;

    d3.select(targetElement).call(
      d3
        .axisBottom(x)
        .ticks(width > 640 ? 15 : 5)
        .tickFormat((d) => {
          if (d === 0) {
            return '0秒前';
          }
          return `${d}`;
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

  return (
    <svg width={width} height={height}>
      <title>直近30秒間のデバイスの回転の値（alpha、beta、gamma）の折れ線グラフ</title>
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
    </svg>
  );
};
