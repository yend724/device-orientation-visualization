import { useState } from 'react';
import { STROKE_COLORS } from '@/app/_constants/orientation';
import { twMerge } from 'tailwind-merge';
import { useScaleLinear } from './hooks';

type OrientationData = {
  timestamp: number;
  gamma: number;
  alpha: number;
  beta: number;
};
export type DeviceOrientationProgressControllerProps = {
  data: OrientationData[];
  currentTimestamp: number;
  width?: number;
  height?: number;
  onUpdateCurrentProgress: (timestamp: number) => void;
};
export const DeviceOrientationProgressController: React.FC<
  DeviceOrientationProgressControllerProps
> = ({ data, currentTimestamp, width = 640, onUpdateCurrentProgress }) => {
  const [isDragging, setIsDragging] = useState(false);

  const { x } = useScaleLinear({
    width,
    data,
  });

  const onDrag = (e: React.PointerEvent<SVGElement>) => {
    if (!isDragging) return;
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const posX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    onUpdateCurrentProgress(posX / width);
  };

  return (
    <svg
      className="h-full w-full overflow-visible"
      onPointerMove={onDrag}
      onPointerDown={() => setIsDragging(true)}
      onPointerUp={() => setIsDragging(false)}
    >
      <title>デバイスの回転の値（alpha、beta、gamma）の折れ線グラフの現在地</title>
      <circle
        cx={x(currentTimestamp)}
        cy="10"
        r="8"
        className={twMerge(STROKE_COLORS.PROGRESS_LINE, 'cursor-pointer')}
      ></circle>
    </svg>
  );
};
