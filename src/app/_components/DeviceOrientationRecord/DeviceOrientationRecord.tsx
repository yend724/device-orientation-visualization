'use client';
import { useCallback, useMemo } from 'react';
import { DeviceOrientationValueList } from '@/app/_components/DeviceOrientationValueList';
import { DeviceOrientationProgressController } from '@/app/_components/DeviceOrientationProgressController';
import { DeviceOrientationRecrodGraph } from '@/app/_components/DeviceOrientationRecrodGraph';
import { DeviceOrientationRecordSeekbar } from '@/app/_components/DeviceOrientationRecordSeekbar';
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
  trigger: React.ReactNode;
  onUpdateElapsedTime: (elapsedTime: number) => void;
};
export const DeviceOrientationRecord: React.FC<DeviceOrientationRecordProps> = ({
  data,
  currentData,
  trigger,
  onUpdateElapsedTime,
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

  const handleUpdateCurrentProgress = useCallback(
    (progress: number) => {
      const first = data[0].timestamp;
      const last = data[data.length - 1].timestamp;
      const elapsedTime = (last - first) * progress;
      onUpdateElapsedTime(elapsedTime);
    },
    [data, onUpdateElapsedTime],
  );

  const currentTimestamp = currentData.timestamp;

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto]">
      <div>
        <div className="aspect-video w-full" ref={mvRef}>
          <DeviceOrientationRecrodGraph
            data={rangeData}
            currentTimestamp={currentTimestamp}
            width={mvW}
            height={mvH}
          />
        </div>
        <div
          ref={sbRef}
          className="mt-8 w-full outline outline-neutral-700"
          style={{ height: '100px' }}
        >
          <DeviceOrientationRecordSeekbar
            data={data}
            currentTimestamp={currentTimestamp}
            width={sbW}
            height={100}
            onBrush={handleUpdateTimestampRange}
          />
        </div>
        <div className="h-6">
          <DeviceOrientationProgressController
            data={data}
            width={sbW}
            currentTimestamp={currentTimestamp}
            onUpdateCurrentProgress={handleUpdateCurrentProgress}
          />
        </div>
      </div>
      <div>
        <DeviceOrientationValueList {...currentData} />
        <div className="mt-12 flex gap-x-4">{trigger}</div>
      </div>
    </div>
  );
};
