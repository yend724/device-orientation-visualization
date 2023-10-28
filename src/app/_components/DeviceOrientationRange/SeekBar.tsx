'use client';
import { useRef, useEffect, useMemo } from 'react';
import * as d3 from 'd3';

type SeekBarProps = {
  orientationData: {
    timestamp: number;
    gamma: number;
    alpha: number;
    beta: number;
  }[];
  width: number;
  height: number;
  progress: number;
  onBrush: (selection: [number, number]) => void;
};
export const SeekBar: React.FC<SeekBarProps> = ({
  orientationData,
  width,
  height,
  progress,
  onBrush,
}) => {
  const gx = useRef<SVGSVGElement>(null);
  const gy = useRef<SVGSVGElement>(null);
  const brushRef = useRef<SVGGElement>(null);

  const first = orientationData[0];
  const last = orientationData[orientationData.length - 1];

  const x = useMemo(() => {
    return d3.scaleLinear().domain([first.timestamp, last.timestamp]).range([0, width]);
  }, [first, last, width]);

  const y = useMemo(() => {
    return d3.scaleLinear().domain([-180, 360]).range([height, 0]);
  }, [height]);

  const { gamma, alpha, beta } = orientationData.reduce(
    (acc, d) => {
      const x = d.timestamp;
      return {
        gamma: [[x, d.gamma], ...acc.gamma] as [number, number][],
        alpha: [[x, d.alpha], ...acc.alpha] as [number, number][],
        beta: [[x, d.beta], ...acc.beta] as [number, number][],
      };
    },
    {
      gamma: [] as [number, number][],
      alpha: [] as [number, number][],
      beta: [] as [number, number][],
    },
  );

  const brush = useMemo(() => {
    return d3
      .brushX()
      .extent([
        [0, 0],
        [width, height],
      ])
      .on('brush', (event) => {
        const startTimestamp = x.invert(event.selection[0]);
        const endTimestamp = x.invert(event.selection[1]);
        console.log(startTimestamp < endTimestamp);
        onBrush([startTimestamp, endTimestamp]);
      })
      .on('end', (event) => {
        if (!event.selection) {
          onBrush([0, width]);
        }
      });
  }, [width, height, x, onBrush]);

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
          return `${
            date.getMonth() + 1
          }/${date.getDate()}/${date.getHours()} ${date.getMinutes()}:${date.getSeconds()}`;
        }),
    );
    return () => {
      d3.select(targetElement).selectAll('g').remove();
    };
  }, [gx, x]);

  useEffect(() => {
    const targetElement = gy.current;
    if (!targetElement) return;
    d3.select(targetElement).call(d3.axisLeft(y).tickValues([-180, -90, 0, 90, 180, 270, 360]));
    return () => {
      d3.select(targetElement).selectAll('g').remove();
    };
  }, [gy, y]);

  useEffect(() => {
    const targetElement = brushRef.current;
    if (!targetElement) return;
    d3.select(targetElement).call(brush);
    return () => {
      d3.select(targetElement).selectAll('g').remove();
    };
  }, [brush]);

  const currentLinePoositionX = x(orientationData[progress].timestamp);

  return (
    <svg width={width} height={height}>
      <title>デバイスの回転の値（alpha、beta、gamma）の折れ線グラフのシークバー</title>
      <path className="stroke-rose-300" fill="none" strokeWidth="2" d={line(alpha)!} />
      <path className="stroke-green-300" fill="none" strokeWidth="2" d={line(gamma)!} />
      <path className="stroke-sky-300" fill="none" stroke="blue" strokeWidth="2" d={line(beta)!} />
      <line
        x1={currentLinePoositionX}
        x2={currentLinePoositionX}
        y1="0"
        y2={height}
        fill="none"
        stroke="red"
      />
      <g ref={brushRef} />
    </svg>
  );
};
