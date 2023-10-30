'use client';
import { useState, useCallback, useMemo } from 'react';
import { MainVisualGraph } from './MainViusalGraph';
import { SeekBar } from './SeekBar';

type LineGraphProps = {
  data: {
    timestamp: number;
    gamma: number;
    alpha: number;
    beta: number;
  }[];
  width: number;
  height: number;
  currentData: {
    timestamp: number;
    gamma: number;
    alpha: number;
    beta: number;
  };
};
export const LineGraph: React.FC<LineGraphProps> = ({
  data,
  width = 640,
  height = 320,
  currentData,
}) => {
  const [rangeTimestamp, setRangeTimestamp] = useState<[number, number] | null>(null);
  const handleBurash = useCallback((selection: [number, number]) => {
    setRangeTimestamp(selection);
  }, []);

  const filterd = useMemo(() => {
    return data.filter((d) => {
      if (rangeTimestamp === null) return true;
      const ts = d.timestamp;
      const inRange = ts >= rangeTimestamp[0] && ts <= rangeTimestamp[1];
      return inRange;
    });
  }, [data, rangeTimestamp]);

  const rangeData = filterd.length > 1 ? filterd : data;
  const currentTimestamp = currentData.timestamp;

  return (
    <div className="grid gap-y-4">
      <div>
        <MainVisualGraph
          data={rangeData}
          width={width}
          height={Math.max(0, height - 50 - 16)}
          currentTimestamp={currentTimestamp}
        />
      </div>
      <div className="inline-block border border-neutral-700">
        <SeekBar
          data={data}
          onBrush={handleBurash}
          width={width}
          height={50}
          currentTimestamp={currentTimestamp}
        />
      </div>
    </div>
  );
};
