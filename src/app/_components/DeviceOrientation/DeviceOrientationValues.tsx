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

const valueMap = {
  alpha: {
    bgColor: 'bg-rose-300',
    color: 'text-neutral-900',
  },
  gamma: {
    bgColor: 'bg-green-300',
    color: 'text-neutral-900',
  },
  beta: {
    bgColor: 'bg-sky-300',
    color: 'text-neutral-900',
  },
};

const DeviceOrientationValue: React.FC<{
  type: keyof typeof valueMap;
  value: number;
}> = ({ type, value }) => {
  return (
    <div
      className={`grid min-w-[8rem] grid-rows-2 gap-y-2 rounded-md p-4 ${valueMap[type].bgColor} ${valueMap[type].color}`}
    >
      <dt>{type} の値</dt>
      <dd>{value}</dd>
    </div>
  );
};
