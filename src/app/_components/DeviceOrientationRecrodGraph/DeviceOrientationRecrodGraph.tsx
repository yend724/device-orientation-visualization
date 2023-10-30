'use client';
import { STROKE_COLORS } from '@/app/_constants/orientation';
import { MARGIN } from './constants';
import { useScaleLinear, useGetLineValues, useXAxisLine, useYAxisLine } from './hooks';

type DeviceOrientationRecrodGraphProps = {
  data: {
    timestamp: number;
    gamma: number;
    alpha: number;
    beta: number;
  }[];
  width?: number;
  height?: number;
  currentTimestamp: number;
};
export const DeviceOrientationRecrodGraph: React.FC<DeviceOrientationRecrodGraphProps> = ({
  data,
  width = 640,
  height = 320,
  currentTimestamp,
}) => {
  const innerWidth = width - MARGIN.left - MARGIN.right;
  const innerHeight = height - MARGIN.top - MARGIN.bottom;

  const { line, x, y } = useScaleLinear({ width: innerWidth, height: innerHeight, data });
  const { lines } = useGetLineValues(data, line);

  const { gx } = useXAxisLine({ x, width });
  const { gy } = useYAxisLine({ y });

  const currentLinePoositionX = x(currentTimestamp);
  const first = data[0];
  const last = data[data.length - 1];
  const isCurrentLineVisible =
    currentTimestamp >= first.timestamp && currentTimestamp <= last.timestamp;

  return (
    <svg className="h-full w-full">
      <title>デバイスの回転の値（alpha、beta、gamma）の折れ線グラフ</title>
      <g ref={gx} transform={`translate(${MARGIN.left},${height - MARGIN.bottom})`} />
      <g ref={gy} transform={`translate(${MARGIN.left},${MARGIN.bottom})`} />
      <path
        className={STROKE_COLORS.ALPHA}
        transform={`translate(${MARGIN.left}, ${MARGIN.top})`}
        fill="none"
        strokeWidth="2"
        d={lines.alpha}
      />
      <path
        className={STROKE_COLORS.GAMMA}
        transform={`translate(${MARGIN.left}, ${MARGIN.top})`}
        fill="none"
        strokeWidth="2"
        d={lines.gamma}
      />
      <path
        className={STROKE_COLORS.BETA}
        transform={`translate(${MARGIN.left}, ${MARGIN.top})`}
        fill="none"
        stroke="blue"
        strokeWidth="2"
        d={lines.beta}
      />
      {isCurrentLineVisible && (
        <line
          transform={`translate(${MARGIN.left}, ${MARGIN.top})`}
          x1={currentLinePoositionX}
          x2={currentLinePoositionX}
          y1="0"
          y2={height - MARGIN.bottom - MARGIN.top}
          fill="none"
          stroke="rgb(239 68 68)"
          strokeWidth={4}
        />
      )}
    </svg>
  );
};
