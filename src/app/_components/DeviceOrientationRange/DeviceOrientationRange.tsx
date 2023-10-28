import { DeviceOrientationRangeGraph } from './DeviceOrientationRangeGraph';

type DeviceOrientationRangeProps = {
  orientationData: {
    timestamp: number;
    gamma: number;
    alpha: number;
    beta: number;
  }[];
};
export const DeviceOrientationRange: React.FC<DeviceOrientationRangeProps> = ({
  orientationData,
}) => {
  if (orientationData.length === 0) return <div>選択されていません</div>;

  return (
    <div>
      <DeviceOrientationRangeGraph orientationData={orientationData} />
    </div>
  );
};
