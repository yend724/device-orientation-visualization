import { LineGraph } from './LineGraph';

type DeviceOrientationRangeProps = {
  data: {
    timestamp: number;
    gamma: number;
    alpha: number;
    beta: number;
  }[];
  currentTimestamp: number;
};
export const DeviceOrientationRange: React.FC<DeviceOrientationRangeProps> = ({
  data,
  currentTimestamp,
}) => {
  return <LineGraph data={data} width={640} height={320} currentTimestamp={currentTimestamp} />;
};
