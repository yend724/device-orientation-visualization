'use client';
import { useDeviceOrientation } from '@/app/_hooks/useDeviceOrientation';

export const LineGraph = () => {
  const { alpha, gamma, beta } = useDeviceOrientation();
  console.log(alpha, gamma, beta);
  // TODO: implement LineGraph
  return <div>LineGraph</div>;
};
