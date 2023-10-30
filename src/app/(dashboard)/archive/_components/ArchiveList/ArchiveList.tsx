'use client';
import { RecordingList } from '@/app/_components/RecordingList';
import { BreadCrumbs } from '@/app/_components/Breadcrumbs';
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
      <BreadCrumbs
        paths={[
          { label: 'ホーム', href: '/' },
          { label: '録画', href: '/archive' },
        ]}
      />
      <RecordingList recodingList={sortedRecordRangeList} onDelete={handleDelete} />
    </div>
  );
};
