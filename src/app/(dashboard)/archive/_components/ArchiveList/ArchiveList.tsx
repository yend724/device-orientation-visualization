'use client';
import { RecordingList } from '@/app/_components/RecordingList';
import { Link } from '@/app/_components/Link';
import { useRecordRangeList } from './hooks';

export const ArchiveList = () => {
  const { recordRangeList, handleDelete } = useRecordRangeList();

  const sortedRecordRangeList = recordRangeList.sort((a, b) => {
    if (a.start < b.start) return 1;
    if (a.start > b.start) return -1;
    return 0;
  });

  return (
    <div className="grid gap-y-12">
      <div className="flex gap-x-2">
        <Link href="/">ホーム</Link>
        <span>{'>'}</span>
        <p>録画</p>
      </div>
      <RecordingList recodingList={sortedRecordRangeList} onDelete={handleDelete} />
    </div>
  );
};
