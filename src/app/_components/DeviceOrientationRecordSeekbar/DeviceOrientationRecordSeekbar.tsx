'use client';
import { useGetPathValues, useScaleLinear, useBrushX } from './hooks';
import { STROKE_COLORS } from '@/app/_constants/orientation';

type OrientationData = {
  timestamp: number;
  gamma: number;
  alpha: number;
  beta: number;
};
type DeviceOrientationRecordSeekbarProps = {
  data: OrientationData[];
  width?: number;
  height?: number;
  currentTimestamp: number;
  onBrush: (selection: [number, number]) => void;
};
export const DeviceOrientationRecordSeekbar: React.FC<DeviceOrientationRecordSeekbarProps> = ({
  data,
  width = 640,
  height = 100,
  currentTimestamp,
  onBrush,
}) => {
  const { x, line } = useScaleLinear({ data, width, height });
  const { gamma, alpha, beta } = useGetPathValues(data);
  const { brushXRef } = useBrushX({
    x,
    width,
    height,
    onBrush,
  });

  const currentLinePoositionX = x(currentTimestamp);

  return (
    <svg className="h-full w-full">
      <title>デバイスの回転の値（alpha、beta、gamma）の折れ線グラフのシークバー</title>
      <path className={STROKE_COLORS.ALPHA} fill="none" strokeWidth="2" d={line(alpha)!} />
      <path className={STROKE_COLORS.GAMMA} fill="none" strokeWidth="2" d={line(gamma)!} />
      <path
        className={STROKE_COLORS.BETA}
        fill="none"
        stroke="blue"
        strokeWidth="2"
        d={line(beta)!}
      />
      <g ref={brushXRef} />
      <line
        x1={currentLinePoositionX}
        x2={currentLinePoositionX}
        y1="0"
        y2={height}
        fill="none"
        className={STROKE_COLORS.PROGRESS_LINE}
        strokeWidth={4}
      />
    </svg>
  );
};
