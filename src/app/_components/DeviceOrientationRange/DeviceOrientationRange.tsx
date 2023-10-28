import { LineGraph } from './LineGraph';

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
  if (orientationData.length === 0) return <p>選択されていません</p>;
  return <LineGraph orientationData={orientationData} width={640} height={320} />;
};
