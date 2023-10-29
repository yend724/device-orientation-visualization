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
  currentTimestamp: number;
};
export const LineGraph: React.FC<LineGraphProps> = ({
  data,
  width = 640,
  height = 320,
  currentTimestamp,
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

  return (
    <div>
      <div className="grid gap-y-4">
        <div>
          <MainVisualGraph
            data={rangeData}
            width={width}
            height={height}
            currentTimestamp={currentTimestamp}
          />
        </div>
        <div>
          <span className="inline-block border border-neutral-700">
            <SeekBar
              data={data}
              onBrush={handleBurash}
              width={width}
              height={100}
              currentTimestamp={currentTimestamp}
            />
          </span>
        </div>
      </div>
    </div>
  );
};
