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
        const x = d.timestamp;
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

export const useScaleLinear = ({
  data,
  width,
  height,
}: {
  data: OrientationData[];
  width: number;
  height: number;
}) => {
  const x = useMemo(() => {
    const first = data[0];
    const last = data[data.length - 1];
    return d3.scaleLinear().domain([first.timestamp, last.timestamp]).range([0, width]);
  }, [data, width]);

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

export const useBrushX = ({
  width,
  height,
  onBrush,
  x,
}: {
  width: number;
  height: number;
  onBrush: (selection: [number, number]) => void;
  x: d3.ScaleLinear<number, number>;
}) => {
  const brushXRef = useRef<SVGGElement>(null);

  const brushX = useMemo(() => {
    return d3
      .brushX()
      .extent([
        [0, 0],
        [width, height],
      ])
      .on('brush', (event) => {
        const startTimestamp = x.invert(event.selection[0]);
        const endTimestamp = x.invert(event.selection[1]);
        console.log(event);
        onBrush([startTimestamp, endTimestamp]);
      })
      .on('end', (event) => {
        if (!event.selection) {
          onBrush([0, width]);
        }
      });
  }, [width, height, x, onBrush]);

  useEffect(() => {
    const targetElement = brushXRef.current;
    if (!targetElement) return;
    d3.select(targetElement).call(brushX);
    return () => {
      d3.select(targetElement).selectAll('g').remove();
    };
  }, [brushX]);

  return { brushXRef };
};
