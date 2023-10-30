import { VALUE_MAP, VALUE_BG_COLORS } from '@/app/_constants/orientation';
import { twMerge } from 'tailwind-merge';

export type DeviceOrientationValueListProps = {
  alpha: number;
  gamma: number;
  beta: number;
};
export const DeviceOrientationValueList: React.FC<DeviceOrientationValueListProps> = ({
  alpha,
  gamma,
  beta,
}) => {
  return (
    <dl className="space-y-6">
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
      className={twMerge(
        'grid min-w-[8rem] grid-rows-2 gap-y-2 rounded-md p-4 text-neutral-900',
        VALUE_BG_COLORS[VALUE_MAP[type]],
      )}
    >
      <dt>{type} の値</dt>
      <dd>{value}</dd>
    </div>
  );
};
