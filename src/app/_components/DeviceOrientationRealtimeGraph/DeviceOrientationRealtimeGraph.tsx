'use client';
import { STROKE_COLORS } from '@/app/_constants/orientation';
import { MARGIN } from './constants';
import { useGetPathValues, useScaleLinear, useXAxisLine, useYAxisLine } from './hooks';

type DeviceOrientationRealtimeGraphProps = {
  data: {
    timestamp: number;
    gamma: number;
    alpha: number;
    beta: number;
  }[];
  width?: number;
  height?: number;
};

export const DeviceOrientationRealtimeGraph: React.FC<DeviceOrientationRealtimeGraphProps> = ({
  data,
  width = 640,
  height = 320,
}) => {
  const innerWidth = width - MARGIN.left - MARGIN.right;
  const innerHeight = height - MARGIN.top - MARGIN.bottom;

  const { gamma, alpha, beta } = useGetPathValues(data);
  const { x, y, line } = useScaleLinear({ width: innerWidth, height: innerHeight });

  const { gx } = useXAxisLine({ x, width: innerWidth });
  const { gy } = useYAxisLine({ y });

  return (
    <svg className="h-full w-full">
      <title>直近30秒間のデバイスの回転の値（alpha、beta、gamma）の折れ線グラフ</title>
      <g ref={gx} transform={`translate(${MARGIN.left},${height - MARGIN.bottom})`} />
      <g ref={gy} transform={`translate(${MARGIN.left},${MARGIN.bottom})`} />
      <path
        className={STROKE_COLORS.ALPHA}
        transform={`translate(${MARGIN.left}, ${MARGIN.top})`}
        fill="none"
        strokeWidth="2"
        d={line(alpha)!}
      />
      <path
        className={STROKE_COLORS.GAMMA}
        transform={`translate(${MARGIN.left}, ${MARGIN.top})`}
        fill="none"
        strokeWidth="2"
        d={line(gamma)!}
      />
      <path
        className={STROKE_COLORS.BETA}
        transform={`translate(${MARGIN.left}, ${MARGIN.top})`}
        fill="none"
        stroke="blue"
        strokeWidth="2"
        d={line(beta)!}
      />
    </svg>
  );
};
