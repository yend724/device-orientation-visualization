'use client';
import { useState, useCallback } from 'react';
import { DeviceOrientationValues } from './DeviceOrientationValues';
import { LineGraph } from './LineGraph';

type DeviceOrientationRangeProps = {
  data: {
    timestamp: number;
    gamma: number;
    alpha: number;
    beta: number;
  }[];
  currentData: {
    timestamp: number;
    gamma: number;
    alpha: number;
    beta: number;
  };
};
export const DeviceOrientationRange: React.FC<DeviceOrientationRangeProps> = ({
  data,
  currentData,
}) => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  const callbackRef = useCallback((node: HTMLDivElement) => {
    if (node === null) {
      return;
    }
    const absortController = new AbortController();

    const handleResize = () => {
      console.log('reseze');
      setSize({ width: node.clientWidth, height: node.clientHeight });
    };
    handleResize();
    window.addEventListener('resize', handleResize, { signal: absortController.signal });
    return () => {
      absortController.abort();
    };
  }, []);

  return (
    <div className="grid grid-cols-[1fr_auto] gap-x-4">
      <div ref={callbackRef} className="relative aspect-video w-full min-w-[40rem]">
        <div className="absolute h-full w-full">
          <LineGraph
            data={data}
            width={size.width}
            height={size.height}
            currentData={currentData}
          />
        </div>
      </div>
      <div>
        <DeviceOrientationValues {...currentData} />
      </div>
    </div>
  );
};
