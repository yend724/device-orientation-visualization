'use client';
import { useEffect, useState, useCallback } from 'react';
import { Button } from '@/app/_components/Button';
import { Link } from '@/app/_components/Link';
import { readIndexedDBValue } from '@/app/_utils/indexedDB';
import { readBlob } from '@/app/_utils/blob';
import { DeviceOrientationRange } from '@/app/_components/DeviceOrientationRange';
import { Clock } from '@/app/_components/Clock';
import { useRequestAnimationFrame } from '@/app/_hooks/useRequestAnimationFrame';

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
  const [selectedRecordData, setSelectedRecordData] = useState<RecordData[]>([]);
  useEffect(() => {
    readIndexedDBValue<Blob>('DeviceOrientationVisualizationDB', 'recordStore', recordKey).then(
      async (req) => {
        const result = await readBlob<RecordData[]>(req.result);
        setSelectedRecordData(result.reverse());
      },
    );
  }, [recordKey]);

  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const startIsRunning = useCallback(() => {
    setIsRunning(true);
  }, []);
  const stopIsRunning = useCallback(() => {
    setIsRunning(false);
  }, []);
  const resetIsRunning = useCallback(() => {
    setIsRunning(false);
    setProgress(0);
  }, []);
  useRequestAnimationFrame(() => {
    setProgress((pre) => {
      if (pre >= selectedRecordData.length - 1) {
        setIsRunning(false);
        return pre;
      }
      return pre + 1;
    });
  }, isRunning);

  if (selectedRecordData.length === 0) {
    return <p>読み込み中...</p>;
  }

  const currentData = selectedRecordData[progress];
  return (
    <div className="grid gap-y-12">
      <Link href="/archive">録画一覧に戻る</Link>
      <div className="grid grid-cols-[auto_1fr] gap-x-8">
        <div>
          <Clock currentTime={new Date(currentData.timestamp)} />
        </div>
        <div>
          <DeviceOrientationRange data={selectedRecordData} currentData={currentData} />
        </div>
      </div>
      <div className="flex gap-x-4">
        <Button onClick={startIsRunning} disabled={isRunning}>
          開始
        </Button>
        <Button onClick={stopIsRunning} disabled={!isRunning}>
          停止
        </Button>
        <Button onClick={resetIsRunning}>リセット</Button>
      </div>
    </div>
  );
};
