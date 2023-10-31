import { useMemo } from 'react';
import * as d3 from 'd3';

export type OrientationData = {
  timestamp: number;
  gamma: number;
  alpha: number;
  beta: number;
};
export const useScaleLinear = ({ data, width }: { data: OrientationData[]; width: number }) => {
  const x = useMemo(() => {
    const first = data[0];
    const last = data[data.length - 1];
    return d3.scaleLinear().domain([first.timestamp, last.timestamp]).range([0, width]);
  }, [data, width]);

  return { x };
};
