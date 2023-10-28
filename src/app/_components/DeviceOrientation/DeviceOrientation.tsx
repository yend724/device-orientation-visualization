'use client';
import { useState, useCallback, useEffect, useRef } from 'react';
import { useDeviceOrientation } from '@/app/_hooks/useDeviceOrientation';
import { DeviceOrientationLineGraph } from './DeviceOrientationLineGraph';
import { DeviceOrientationValues } from './DeviceOrientationValues';
import { convertArrayToBlob } from '@/app/_utils/blob';
import { saveOrientationData } from '@/app/_utils/indexedDB';
import { Record } from '@/app/_components/Record';

const length = 60 * 30 + 1;
type OrientationData = {
  timestamp: number;
  alpha: number;
  gamma: number;
  beta: number;
}[];
export const DeviceOrientation = () => {
  const { alpha, gamma, beta } = useDeviceOrientation();

  const orientationRef = useRef({ alpha, gamma, beta });
  orientationRef.current = { alpha, gamma, beta };
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [orientationData, setOrientationData] = useState<OrientationData>([]);

  const orientationDataRef = useRef<typeof orientationData>([]);
  const [isRecording, setIsRecording] = useState(false);
  const startRecording = () => {
    setIsRecording(true);
  };
  const stopRecording = () => {
    console.log('stop');
    setIsRecording(false);
    const largeDataArray = orientationDataRef.current;
    const startTimeStamp = largeDataArray[largeDataArray.length - 1].timestamp;
    const endTimeStamp = largeDataArray[0].timestamp;
    const blob = convertArrayToBlob(largeDataArray);
    saveOrientationData(startTimeStamp, endTimeStamp, blob);
    orientationDataRef.current = [];
  };

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
      const { alpha, gamma, beta } = orientationRef.current;
      const nextData = {
        timestamp: now,
        alpha,
        gamma,
        beta,
      };
      if (isRecording) {
        orientationDataRef.current = [nextData, ...orientationDataRef.current];
      }
      setOrientationData((prev) => {
        const newData = [nextData, ...prev];
        return newData.slice(0, length);
      });
      requestAnimationFrameId = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      cancelAnimationFrame(requestAnimationFrameId);
    };
  }, [isRecording]);

  return (
    <div className="grid grid-cols-[1fr_auto] gap-8">
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
        <div className="mt-8">
          <Record onStart={startRecording} onStop={stopRecording} isRecording={isRecording} />
        </div>
      </div>
    </div>
  );
};
