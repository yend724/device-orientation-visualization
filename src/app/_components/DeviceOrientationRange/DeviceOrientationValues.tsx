import { VALUE_MAP } from './constants';
export type DeviceOrientationValuesProps = {
  alpha: number;
  gamma: number;
  beta: number;
};
export const DeviceOrientationValues: React.FC<DeviceOrientationValuesProps> = ({
  alpha,
  gamma,
  beta,
}) => {
  return (
    <dl className="space-y-8">
      <DeviceOrientationValue type="alpha" value={alpha} />
      <DeviceOrientationValue type="gamma" value={gamma} />
      <DeviceOrientationValue type="beta" value={beta} />
    </dl>
  );
};

type DeviceOrientationValueProps = {
  type: keyof typeof VALUE_MAP;
  value: number;
};
const DeviceOrientationValue: React.FC<DeviceOrientationValueProps> = ({ type, value }) => {
  return (
    <div
      className={`grid min-w-[8rem] grid-rows-2 gap-y-2 rounded-md p-4 ${VALUE_MAP[type].bgColor} ${VALUE_MAP[type].color}`}
    >
      <dt>{type} の値</dt>
      <dd>{value}</dd>
    </div>
  );
};
