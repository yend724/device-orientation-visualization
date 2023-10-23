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
      <DeviceOrientationValue label="alpha" value={alpha} color="red" />
      <DeviceOrientationValue label="gamma" value={gamma} color="green" />
      <DeviceOrientationValue label="beta" value={beta} color="blue" />
    </dl>
  );
};

const DeviceOrientationValue: React.FC<{
  label: string;
  value: number;
  color: React.CSSProperties['color'];
}> = ({ label, value, color }) => {
  return (
    <div className="grid min-w-[8rem] border-separate grid-rows-2 gap-y-2 rounded-md border-2 border-solid p-4">
      <dt>{label} の値</dt>
      <dd
        style={{
          color,
        }}
      >
        {value}
      </dd>
    </div>
  );
};
