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
export const useGetLineValues = (data: OrientationData[], line: d3.Line<[number, number]>) => {
  const result = useMemo(() => {
    return data.reduce(
      (acc, d) => {
        const ts = d.timestamp;
        const nextValue: PathValue = {
          gamma: [[ts, d.gamma], ...acc.gamma],
          alpha: [[ts, d.alpha], ...acc.alpha],
          beta: [[ts, d.beta], ...acc.beta],
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

  const lines = useMemo(() => {
    return {
      alpha: line(result.alpha)!,
      gamma: line(result.gamma)!,
      beta: line(result.beta)!,
    };
  }, [line, result]);

  return { lines };
};

export const useScaleLinear = ({
  width,
  height,
  data,
}: {
  width: number;
  height: number;
  data: OrientationData[];
}) => {
  const first = data[0];
  const last = data[data.length - 1];

  const x = useMemo(() => {
    return d3.scaleLinear().domain([first.timestamp, last.timestamp]).range([0, width]);
  }, [first, last, width]);

  const y = useMemo(() => {
    return d3.scaleLinear().domain([-180, 360]).range([height, 0]);
  }, [height]);

  const line = useMemo(() => {
    return d3
      .line()
      .x((d) => x(d[0]))
      .y((d) => y(d[1]));
  }, [x, y]);

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
        .ticks(width < 640 ? 2 : 5)
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
