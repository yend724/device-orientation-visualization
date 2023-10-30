'use client';
import { Button } from '@/app/_components/Button';
import { Link } from '@/app/_components/Link';
import { DeviceOrientationRecord } from '@/app/_components/DeviceOrientationRecord';
import { Clock } from '@/app/_components/Clock';
import { useElapsedTime } from '@/app/_hooks/useElapsedTime';
import { useSelectedData } from './hooks';

export type ArchiveDetailProps = {
  recordKey: string;
};
export const ArchiveDetail: React.FC<ArchiveDetailProps> = ({ recordKey }) => {
  const { recordData } = useSelectedData(recordKey);

  const { start, stop, update, isRunning, elapsedTime } = useElapsedTime();

  if (recordData === undefined) {
    return <p>読み込み中...</p>;
  }
  if (recordData.length === 0) {
    return (
      <div>
        データは存在しません。<Link href="/archive">録画一覧に戻る</Link>
      </div>
    );
  }

  const firstRecordData = recordData[0];
  const targetRecordData =
    recordData.find((data) => data.timestamp >= firstRecordData.timestamp + elapsedTime) ??
    recordData[recordData.length - 1];
  const currentData = targetRecordData!;

  const action = isRunning ? stop : start;

  return (
    <div className="grid gap-y-12">
      <div className="flex flex-wrap justify-between">
        <div className="flex gap-x-2">
          <Link href="/">ホーム</Link>
          <span>{'>'}</span>
          <Link href="/archive">録画</Link>
          <span>{'>'}</span>
          <p>録画詳細</p>
        </div>
        <div className="flex gap-x-4">
          <Button onClick={action}>{isRunning ? '停止' : '開始'}</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[auto_1fr]">
        <div>
          <Clock currentTime={new Date(currentData.timestamp)} />
        </div>
        <div>
          <DeviceOrientationRecord
            data={recordData}
            currentData={currentData}
            onUpdateElapsedTime={update}
          />
        </div>
      </div>
    </div>
  );
};
