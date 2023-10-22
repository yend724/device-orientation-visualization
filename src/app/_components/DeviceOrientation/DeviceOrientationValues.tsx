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
    <dl className="flex h-full flex-col justify-between">
      <DeviceOrientationValue label="alpha" value={alpha} />
      <DeviceOrientationValue label="gamma" value={gamma} />
      <DeviceOrientationValue label="beta" value={beta} />
    </dl>
  );
};

const DeviceOrientationValue: React.FC<{ label: string; value: number }> = ({ label, value }) => {
  return (
    <div className="grid min-w-[8rem] border-separate grid-rows-2 gap-y-2 rounded-md border-2 border-solid p-4">
      <dt>{label} の値</dt>
      <dd>{value}</dd>
    </div>
  );
};
