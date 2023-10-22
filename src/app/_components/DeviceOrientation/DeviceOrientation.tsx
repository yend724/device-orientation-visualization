'use client';
import { useState, useCallback } from 'react';
import { LineGraph } from '@/app/_components/LineGraph';
import { useDeviceOrientation } from '@/app/_hooks/useDeviceOrientation';
import { DeviceOrientationValues } from './DeviceOrientationValues';

export const DeviceOrientation = () => {
  const { alpha, gamma, beta } = useDeviceOrientation();
  const [size, setSize] = useState({ width: 0, height: 0 });

  const callbackRef = useCallback((node: HTMLDivElement) => {
    if (node === null) {
      return;
    }

    setSize({ width: node.clientWidth, height: node.clientHeight });

    const absortController = new AbortController();
    const handleResize = () => {
      setSize({ width: node.clientWidth, height: node.clientHeight });
    };
    window.addEventListener('resize', handleResize, { signal: absortController.signal });
    return () => {
      absortController.abort();
    };
  }, []);

  return (
    <div className="grid grid-cols-[1fr_auto] gap-x-8">
      <div ref={callbackRef} className="relative aspect-video w-full min-w-[40rem]">
        <div className="absolute h-full w-full">
          <LineGraph width={size.width} height={size.height} />
        </div>
      </div>
      <div>
        <DeviceOrientationValues alpha={alpha} gamma={gamma} beta={beta} />
      </div>
    </div>
  );
};
