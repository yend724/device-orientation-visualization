'use client';
import { useState, useCallback, useEffect, useRef } from 'react';
import { useDeviceOrientation } from '@/app/_hooks/useDeviceOrientation';
import { DeviceOrientationLineGraph } from './DeviceOrientationLineGraph';
import { DeviceOrientationValues } from './DeviceOrientationValues';

const length = 60 * 30 + 1;
export const DeviceOrientation = () => {
  const { alpha, gamma, beta } = useDeviceOrientation();

  const orientationRef = useRef({ alpha, gamma, beta });
  orientationRef.current = { alpha, gamma, beta };
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [orientationData, setOrientationData] = useState([
    {
      timestamp: Date.now(),
      alpha: 0,
      gamma: 0,
      beta: 0,
    },
  ]);

  const callbackRef = useCallback((node: HTMLDivElement) => {
    if (node === null) {
      return;
    }
    const absortController = new AbortController();

    const handleResize = () => {
      setSize({ width: node.clientWidth, height: node.clientHeight });
    };
    handleResize();
    window.addEventListener('resize', handleResize, { signal: absortController.signal });

    return () => {
      absortController.abort();
    };
  }, []);

  useEffect(() => {
    let requestAnimationFrameId: number;
    const loop = () => {
      const now = Date.now();
      setOrientationData((prev) => {
        const newData = [
          {
            timestamp: now,
            alpha: orientationRef.current.alpha,
            gamma: orientationRef.current.gamma,
            beta: orientationRef.current.beta,
          },
          ...prev,
        ];
        return newData.slice(0, length);
      });
      requestAnimationFrameId = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      cancelAnimationFrame(requestAnimationFrameId);
    };
  }, []);

  return (
    <div className="grid grid-cols-[1fr_auto] gap-x-8">
      <div ref={callbackRef} className="relative aspect-video w-full min-w-[40rem]">
        <div className="absolute h-full w-full">
          <DeviceOrientationLineGraph
            width={size.width}
            height={size.height}
            orientationData={orientationData}
          />
        </div>
      </div>
      <div>
        <DeviceOrientationValues alpha={alpha} gamma={gamma} beta={beta} />
      </div>
    </div>
  );
};
