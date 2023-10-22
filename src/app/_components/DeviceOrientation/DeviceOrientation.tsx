'use client';
import { LineGraph } from '@/app/_components/LineGraph';
import { useDeviceOrientation } from '@/app/_hooks/useDeviceOrientation';
import { Card, CardContent } from '@/app/_components/Card';
import { DeviceOrientationValues } from './DeviceOrientationValues';

export const DeviceOrientation = () => {
  const { alpha, gamma, beta } = useDeviceOrientation();
  console.log(alpha, gamma, beta);

  return (
    <div className="grid h-full grid-cols-[1fr_auto] gap-x-8">
      <Card>
        <CardContent>
          <LineGraph />
        </CardContent>
      </Card>
      <div>
        <DeviceOrientationValues alpha={alpha} gamma={gamma} beta={beta} />
      </div>
    </div>
  );
};
