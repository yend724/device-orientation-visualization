'use client';
import { useRequestAnimationFrame } from '@/app/_hooks/useRequestAnimationFrame';
import { useDeviceOrientation } from '@/app/_hooks/useDeviceOrientation';
import { DeviceOrientationRealtimeGraph } from '@/app/_components/DeviceOrientationRealtimeGraph';
import { DeviceOrientationValueList } from '@/app/_components/DeviceOrientationValueList';
import { Record } from '@/app/_components/Record';
import { Button } from '@/app/_components/Button';
import { useDOMSize, useRealtimeOrientationData, useRecordOrientationData } from './hooks';
import { filterArrayByTimestamp } from './utils';

export const DeviceOrientationRealtime = () => {
  const { alpha, gamma, beta, isPermission, requestPermission } = useDeviceOrientation();
  const { width, height, ref } = useDOMSize();

  const { realtimeData, handleUpdateRealtimeData } = useRealtimeOrientationData();
  const { isRecording, handleStartRecording, handleStopRecording, handlePrependRecordData } =
    useRecordOrientationData();

  useRequestAnimationFrame(() => {
    const now = Date.now();
    const currentData = {
      timestamp: now,
      alpha,
      gamma,
      beta,
    };

    const nextDataList = filterArrayByTimestamp([currentData, ...realtimeData], now, 30);
    handleUpdateRealtimeData(nextDataList);
    if (isRecording) {
      handlePrependRecordData(currentData);
    }
  });

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto]">
      <div ref={ref} className="relative aspect-video w-full">
        <div className="absolute h-full w-full">
          <DeviceOrientationRealtimeGraph width={width} height={height} data={realtimeData} />
        </div>
      </div>
      <div className="grid grid-rows-[auto_1fr] gap-y-12">
        <div>
          <DeviceOrientationValueList alpha={alpha} gamma={gamma} beta={beta} />
        </div>
        <div>
          <div className="flex flex-wrap gap-x-4">
            <Button onClick={requestPermission} disabled={isPermission}>
              {isPermission ? '許可済み' : '許可する'}
            </Button>
            <Record
              onStart={handleStartRecording}
              onStop={handleStopRecording}
              isRecording={isRecording}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
