'use client';
import { useMemo } from 'react';
import { DeviceOrientationValueList } from '@/app/_components/DeviceOrientationValueList';
import { DeviceOrientationRecrodGraph } from '@/app/_components/DeviceOrientationRecrodGraph';
import { DeviceOrientationRecordSeekbar } from '../DeviceOrientationRecordSeekbar';
import { useDOMSize, useTimestampRange } from './hooks';

type Data = {
  timestamp: number;
  gamma: number;
  alpha: number;
  beta: number;
};
type DeviceOrientationRecordProps = {
  data: Data[];
  currentData: Data;
};
export const DeviceOrientationRecord: React.FC<DeviceOrientationRecordProps> = ({
  data,
  currentData,
}) => {
  const { ref: mvRef, width: mvW, height: mvH } = useDOMSize();
  const { ref: sbRef, width: sbW } = useDOMSize();

  const { timestampRange, handleUpdateTimestampRange } = useTimestampRange();

  const rangeData = useMemo(() => {
    const result = data.filter((d) => {
      if (timestampRange === null) return true;
      const ts = d.timestamp;
      const inRange = ts >= timestampRange[0] && ts <= timestampRange[1];
      return inRange;
    });
    return result.length > 1 ? result : data;
  }, [data, timestampRange]);

  const currentTimestamp = currentData.timestamp;

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto]">
      <div className="space-y-8">
        <div className="aspect-video w-full" ref={mvRef}>
          <DeviceOrientationRecrodGraph
            data={rangeData}
            currentTimestamp={currentTimestamp}
            width={mvW}
            height={mvH}
          />
        </div>
        <div ref={sbRef} className="w-full outline outline-neutral-700" style={{ height: '100px' }}>
          <DeviceOrientationRecordSeekbar
            data={data}
            onBrush={handleUpdateTimestampRange}
            currentTimestamp={currentTimestamp}
            width={sbW}
            height={100}
          />
        </div>
      </div>
      <div>
        <DeviceOrientationValueList {...currentData} />
      </div>
    </div>
  );
};
