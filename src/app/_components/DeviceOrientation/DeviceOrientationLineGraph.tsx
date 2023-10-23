'use client';
import { useRef, useEffect, useMemo } from 'react';
import * as d3 from 'd3';

type OrientationValue = {
  timestamp: number;
  value: number;
};
type DeviceOrientationLineGraphProps = {
  gummaData: OrientationValue[];
  alphaData: OrientationValue[];
  betaData: OrientationValue[];
  width?: number;
  height?: number;
};

export const DeviceOrientationLineGraph: React.FC<DeviceOrientationLineGraphProps> = ({
  gummaData,
  alphaData,
  betaData,
  width = 640,
  height = 320,
}) => {
  const gx = useRef<SVGSVGElement>(null);
  const gy = useRef<SVGSVGElement>(null);

  const margin = { top: 20, right: 60, bottom: 20, left: 20 };
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
    .x((_, i) => x(-1 * i))
    .y((d) => y(d[1]));
  // lineのX軸をセット

  useEffect(() => {
    const targetElement = gx.current;
    if (targetElement) {
      d3.select(targetElement).call(
        d3.axisBottom(x).tickFormat((d) => {
          if (d === 0) {
            return '0秒';
          }
          return `${d}`;
        }),
      );
    }
    return () => {
      d3.select(targetElement).selectAll('g').remove();
    };
  }, [gx, x]);

  useEffect(() => {
    const targetElement = gy.current;
    if (targetElement) {
      d3.select(targetElement).call(
        d3
          .axisLeft(y)
          .tickValues([-180, -90, 0, 90, 180, 270, 360])
          .tickSize(-innerWidth)
          .tickFormat((d) => {
            if (d === 360) {
              return '360deg';
            }
            return `${d}`;
          }),
      );
    }
    return () => {
      d3.select(targetElement).selectAll('g').remove();
    };
  }, [gy, y, innerWidth]);

  return (
    <svg width={width} height={height}>
      <title>直近30秒間のデバイスの回転の値（alpha、beta、gamma）の折れ線グラフ</title>
      <g ref={gx} transform={`translate(${margin.left + 40},${height - margin.bottom})`} />
      <g ref={gy} transform={`translate(${margin.left + 40},${margin.bottom})`} />
      <path
        transform={`translate(${margin.left + 40}, ${margin.top})`}
        fill="none"
        stroke="red"
        strokeWidth="1.5"
        d={line(gummaData.map((d) => [d.timestamp, d.value]))!}
      />
      <path
        transform={`translate(${margin.left + 40}, ${margin.top})`}
        fill="none"
        stroke="green"
        strokeWidth="1.5"
        d={line(alphaData.map((d) => [d.timestamp, d.value]))!}
      />
      <path
        transform={`translate(${margin.left + 40}, ${margin.top})`}
        fill="none"
        stroke="blue"
        strokeWidth="1.5"
        d={line(betaData.map((d) => [d.timestamp, d.value]))!}
      />
    </svg>
  );
};
