'use client';
import { useState, useCallback } from 'react';
import { useRequestAnimationFrame } from '@/app/_hooks/useRequestAnimationFrame';
import { Button } from '@/app/_components/Button';
import { MainVisualGraph } from './MainViusalGraph';
import { SeekBar } from './SeekBar';

type LineGraphProps = {
  orientationData: {
    timestamp: number;
    gamma: number;
    alpha: number;
    beta: number;
  }[];
  width: number;
  height: number;
};
export const LineGraph: React.FC<LineGraphProps> = ({
  orientationData,
  width = 640,
  height = 320,
}) => {
  const [rangeTimestamp, setRangeTimestamp] = useState<[number, number] | null>(null);
  const handleBurash = useCallback((selection: [number, number]) => {
    setRangeTimestamp(selection);
  }, []);

  const filterd = orientationData.filter((d) => {
    if (rangeTimestamp === null) return true;
    const ts = d.timestamp;
    const inRange = ts >= rangeTimestamp[0] && ts <= rangeTimestamp[1];
    return inRange;
  });

  const data = filterd.length > 1 ? filterd : orientationData;

  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const startIsRunning = useCallback(() => {
    setIsRunning(true);
  }, []);
  const stopIsRunning = useCallback(() => {
    setIsRunning(false);
  }, []);
  useRequestAnimationFrame(() => {
    setProgress((pre) => {
      if (pre >= orientationData.length - 1) {
        return 0;
      }
      return pre + 1;
    });
  }, isRunning);

  return (
    <div>
      <div className="grid gap-y-4">
        <div>
          <MainVisualGraph
            orientationData={data}
            width={width}
            height={height}
            progress={progress}
          />
        </div>
        <div>
          <span className="inline-block border border-neutral-700">
            <SeekBar
              orientationData={orientationData}
              onBrush={handleBurash}
              width={width}
              height={100}
              progress={progress}
            />
          </span>
        </div>
        <div className="flex gap-x-4">
          <Button onClick={startIsRunning}>再生</Button>
          <Button onClick={stopIsRunning}>停止</Button>
        </div>
      </div>
    </div>
  );
};
