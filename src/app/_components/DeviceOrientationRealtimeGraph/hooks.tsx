import { useRef, useEffect, useMemo } from 'react';
import * as d3 from 'd3';

type PathValue = {
  gamma: [number, number][];
  alpha: [number, number][];
  beta: [number, number][];
};
type OrientationData = {
  timestamp: number;
  gamma: number;
  alpha: number;
  beta: number;
};
export const useGetPathValues = (data: OrientationData[]) => {
  const result = useMemo(() => {
    return data.reduce(
      (acc, d) => {
        const now = Date.now();
        const x = ((now - d.timestamp) / 1000) * -1;
        const nextValue: PathValue = {
          gamma: [[x, d.gamma], ...acc.gamma],
          alpha: [[x, d.alpha], ...acc.alpha],
          beta: [[x, d.beta], ...acc.beta],
        };
        return nextValue;
      },
      {
        gamma: [],
        alpha: [],
        beta: [],
      } as PathValue,
    );
  }, [data]);

  return result;
};

export const useScaleLinear = ({ width, height }: { width: number; height: number }) => {
  const x = useMemo(() => {
    return d3.scaleLinear().domain([-30, 0]).range([0, width]);
  }, [width]);

  const y = useMemo(() => {
    return d3.scaleLinear().domain([-180, 360]).range([height, 0]);
  }, [height]);

  const line = d3
    .line()
    .x((d) => x(d[0]))
    .y((d) => y(d[1]));

  return { x, y, line };
};

export const useXAxisLine = ({
  x,
  width,
}: {
  x: d3.ScaleLinear<number, number>;
  width: number;
}) => {
  const gx = useRef<SVGSVGElement>(null);

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
  }, [x, width]);

  return { gx };
};

export const useYAxisLine = ({ y }: { y: d3.ScaleLinear<number, number> }) => {
  const gy = useRef<SVGSVGElement>(null);

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
  }, [y]);

  return { gy };
};
