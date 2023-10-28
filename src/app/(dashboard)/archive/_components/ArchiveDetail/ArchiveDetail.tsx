'use client';
import { useEffect, useState } from 'react';
import { Link } from '@/app/_components/Link';
import { readIndexedDBValue } from '@/app/_utils/indexedDB';
import { readBlob } from '@/app/_utils/blob';
import { DeviceOrientationRange } from '@/app/_components/DeviceOrientationRange';
import { Clock } from '@/app/_components/Clock';

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

  if (selectedRecordData.length === 0) {
    return <p>読み込み中</p>;
  }
  return (
    <div className="grid gap-y-12">
      <Link href="/archive">録画一覧に戻る</Link>
      <div className="grid grid-cols-[auto_1fr] gap-x-8">
        <div>
          <Clock currentTime={new Date()} />
        </div>
        <div>
          <DeviceOrientationRange orientationData={selectedRecordData} />
        </div>
      </div>
    </div>
  );
};
