'use client';
import { useRef, useEffect, useMemo, useState } from 'react';
import * as d3 from 'd3';

type DeviceOrientationRangeGraphProps = {
  orientationData: {
    timestamp: number;
    gamma: number;
    alpha: number;
    beta: number;
  }[];
  width?: number;
  height?: number;
};
export const DeviceOrientationRangeGraph: React.FC<DeviceOrientationRangeGraphProps> = ({
  orientationData,
  width = 640,
}) => {
  const length = orientationData.length;
  const [brushSelection, setBrushSelection] = useState<[number, number]>([0, width]);
  const handleBurash = (selection: [number, number]) => {
    setBrushSelection(selection);
  };

  const percentStart = brushSelection[0] / width;
  const targetStart = Math.floor(percentStart * length);

  const percentEnd = brushSelection[1] / width;
  const targetEnd = Math.floor(percentEnd * length);

  return (
    <div className="grid gap-y-4">
      <MainGraph orientationData={orientationData.slice(targetStart, targetEnd)} />
      <BrushGraph orientationData={orientationData} height={200} onBrush={handleBurash} />
    </div>
  );
};

const MainGraph: React.FC<DeviceOrientationRangeGraphProps> = ({
  orientationData,
  width = 640,
  height = 320,
}) => {
  const gx = useRef<SVGSVGElement>(null);
  const gy = useRef<SVGSVGElement>(null);

  const margin = useMemo(() => {
    return { top: 20, right: 20, bottom: 20, left: 60 };
  }, []);
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const first = orientationData[0];
  const last = orientationData[orientationData.length - 1];

  const x = useMemo(() => {
    return d3.scaleLinear().domain([first.timestamp, last.timestamp]).range([0, innerWidth]);
  }, [first, last, innerWidth]);

  const y = useMemo(() => {
    return d3.scaleLinear().domain([-180, 360]).range([innerHeight, 0]);
  }, [innerHeight]);

  const { gamma, alpha, beta } = orientationData.reduce(
    (acc, d) => {
      const x = d.timestamp;
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
    </svg>
  );
};

const BrushGraph: React.FC<
  DeviceOrientationRangeGraphProps & {
    onBrush: (selection: [number, number]) => void;
  }
> = ({ orientationData, width = 640, height = 320, onBrush }) => {
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

  const brush = useMemo(() => {
    return d3
      .brushX()
      .extent([
        [0, 0],
        [width, height],
      ])
      .on('brush', (event) => {
        onBrush(event.selection);
      })
      .on('end', (event) => {
        if (!event.selection) {
          onBrush([0, width]);
        }
      });
  }, [width, height, onBrush]);

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

  return (
    <svg width={width} height={height}>
      <g ref={brushRef} className="border" />
      <path className="stroke-rose-300" fill="none" strokeWidth="2" d={line(alpha)!} />
      <path className="stroke-green-300" fill="none" strokeWidth="2" d={line(gamma)!} />
      <path className="stroke-sky-300" fill="none" stroke="blue" strokeWidth="2" d={line(beta)!} />
    </svg>
  );
};
