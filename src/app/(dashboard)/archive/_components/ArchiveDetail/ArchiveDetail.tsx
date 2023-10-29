'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/app/_components/Button';
import { Link } from '@/app/_components/Link';
import { readIndexedDBValue } from '@/app/_utils/indexedDB';
import { readBlob } from '@/app/_utils/blob';
import { DeviceOrientationRange } from '@/app/_components/DeviceOrientationRange';
import { Clock } from '@/app/_components/Clock';
import { useElapsedTime } from '@/app/_hooks/useElapsedTime';

type RecordData = {
  alpha: number;
  beta: number;
  gamma: number;
  timestamp: number;
};

export type ArchiveDetailProps = {
  recordKey: string;
};
export const ArchiveDetail: React.FC<ArchiveDetailProps> = ({ recordKey }) => {
  const [selectedData, setSelectedData] = useState<RecordData[]>([]);
  useEffect(() => {
    readIndexedDBValue<Blob>('DeviceOrientationVisualizationDB', 'recordStore', recordKey).then(
      async (req) => {
        const result = await readBlob<RecordData[]>(req.result);
        setSelectedData(result.reverse());
      },
    );
  }, [recordKey]);

  const { start, stop, reset, isRunning, elapsedTime } = useElapsedTime();

  if (selectedData.length === 0) {
    return <p>読み込み中...</p>;
  }

  const firstRecordData = selectedData[0];
  const targetRecordData =
    selectedData.find((data) => data.timestamp >= firstRecordData.timestamp + elapsedTime) ??
    selectedData[selectedData.length - 1];

  const currentData = targetRecordData!;
  return (
    <div className="grid gap-y-12">
      <Link href="/archive">録画一覧に戻る</Link>
      <div className="grid grid-cols-[auto_1fr] gap-x-8">
        <div>
          <Clock currentTime={new Date(currentData.timestamp)} />
        </div>
        <div>
          <DeviceOrientationRange data={selectedData} currentData={currentData} />
        </div>
      </div>
      <div className="flex gap-x-4">
        <Button onClick={start} disabled={isRunning}>
          開始
        </Button>
        <Button onClick={stop} disabled={!isRunning}>
          停止
        </Button>
        <Button onClick={reset}>リセット</Button>
      </div>
    </div>
  );
};
