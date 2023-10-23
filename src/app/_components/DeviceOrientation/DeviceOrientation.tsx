'use client';
import { useState, useCallback, useEffect, useRef } from 'react';
import { useDeviceOrientation } from '@/app/_hooks/useDeviceOrientation';
import { DeviceOrientationLineGraph } from './DeviceOrientationLineGraph';
import { DeviceOrientationValues } from './DeviceOrientationValues';

const initialData = () => {
  return Array.from({ length: 31 }, () => ({ timestamp: -1, value: 0 }));
};

export const DeviceOrientation = () => {
  const { alpha, gamma, beta } = useDeviceOrientation();

  const orientationRef = useRef({ alpha, gamma, beta });
  orientationRef.current = { alpha, gamma, beta };

  const [size, setSize] = useState({ width: 0, height: 0 });

  const [gammaData, setGummaData] = useState<ReturnType<typeof initialData>>(initialData());
  const [alphaData, setAlphaData] = useState<ReturnType<typeof initialData>>(initialData());
  const [betaData, setBetaData] = useState<ReturnType<typeof initialData>>(initialData());

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

  const lastUpdateRef = useRef(0);
  const timeAccumulatorRef = useRef(0);

  const updateData = useCallback((timestamp: number) => {
    const delta = timestamp - lastUpdateRef.current;
    lastUpdateRef.current = timestamp;
    timeAccumulatorRef.current += delta;

    while (timeAccumulatorRef.current >= 1000) {
      const now = Date.now();
      setAlphaData((prev) => {
        const newData = [{ timestamp: now, value: orientationRef.current.alpha }, ...prev];
        return newData.slice(0, 31);
      });
      setBetaData((prev) => {
        const newData = [{ timestamp: now, value: orientationRef.current.beta }, ...prev];
        return newData.slice(0, 31);
      });
      setGummaData((prev) => {
        const newData = [{ timestamp: now, value: orientationRef.current.gamma }, ...prev];
        return newData.slice(0, 31);
      });
      timeAccumulatorRef.current -= 1000;
    }
    requestAnimationFrame(updateData);
  }, []);

  useEffect(() => {
    requestAnimationFrame(updateData);
  }, [updateData]);

  return (
    <div className="grid grid-cols-[1fr_auto] gap-x-8">
      <div ref={callbackRef} className="relative aspect-video w-full min-w-[40rem]">
        <div className="absolute h-full w-full">
          <DeviceOrientationLineGraph
            width={size.width}
            height={size.height}
            gummaData={gammaData}
            alphaData={alphaData}
            betaData={betaData}
          />
        </div>
      </div>
      <div>
        <DeviceOrientationValues alpha={alpha} gamma={gamma} beta={beta} />
      </div>
    </div>
  );
};
