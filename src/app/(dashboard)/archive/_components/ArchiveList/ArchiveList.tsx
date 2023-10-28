'use client';
import { useEffect, useState } from 'react';
import { RecordingList } from '@/app/_components/RecordingList';
import { readIndexedDBAll } from '@/app/_utils/indexedDB';
import { deleteIndexedDBValue } from '@/app/_utils/indexedDB';

type RangeStore = {
  start: number;
  end: number;
}[];
export const ArchiveList = () => {
  const [recordRangeList, setRecordRageList] = useState<RangeStore>([]);

  const handleDelete = (key: number) => {
    Promise.all([
      deleteIndexedDBValue('DeviceOrientationVisualizationDB', 'recordStore', key.toString()),
      deleteIndexedDBValue('DeviceOrientationVisualizationDB', 'rangeStore', key.toString()),
    ]).then(() => {
      readIndexedDBAll('DeviceOrientationVisualizationDB', 'rangeStore').then((req) => {
        const result = req.result as RangeStore;
        setRecordRageList(result);
      });
    });
  };

  useEffect(() => {
    readIndexedDBAll('DeviceOrientationVisualizationDB', 'rangeStore').then((req) => {
      const result = req.result as RangeStore;
      setRecordRageList(result);
    });
  }, []);

  const sortedRecordRangeList = recordRangeList.sort((a, b) => {
    if (a.start < b.start) return 1;
    if (a.start > b.start) return -1;
    return 0;
  });

  return (
    <div className="grid gap-y-9">
      <div>
        <RecordingList recodingList={sortedRecordRangeList} onDelete={handleDelete} />
      </div>
    </div>
  );
};
