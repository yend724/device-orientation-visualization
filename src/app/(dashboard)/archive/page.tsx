'use client';
import { useSearchParams } from 'next/navigation';
import { ArchiveList } from './_components/ArchiveList';
import { ArchiveDetail } from './_components/ArchiveDetail';

const Archive = () => {
  const searchParams = useSearchParams();
  const recordKey = searchParams.get('recordKey');

  if (recordKey === null) {
    return <ArchiveList />;
  }
  return <ArchiveDetail recordKey={recordKey} />;
};
export default Archive;
