'use client';
import { useEffect, useState } from 'react';
import { RecordingList } from '@/app/_components/RecordingList';
import { readIndexedDBAll, readIndexedDBValue } from '@/app/_utils/indexedDB';
import { readBlob } from '@/app/_utils/blob';
import { deleteIndexedDBValue } from '@/app/_utils/indexedDB';
import { DeviceOrientationRange } from '@/app/_components/DeviceOrientationRange';
import { PageContainer } from './page.container';

type RangeStore = {
  start: number;
  end: number;
}[];
const Archive = () => {
  const [recordRangeList, setRecordRageList] = useState<RangeStore>([]);
  const [selectedRecordData, setSelectedRecordData] = useState<
    {
      alpha: number;
      beta: number;
      gamma: number;
      timestamp: number;
    }[]
  >([]);

  const handleSelect = async (key: number) => {
    const request = await readIndexedDBValue<Blob>(
      'DeviceOrientationVisualizationDB',
      'recordStore',
      key.toString(),
    );
    const result = await readBlob<typeof selectedRecordData>(request.result);
    setSelectedRecordData(result.reverse());
  };
  const handleDelete = async (key: number) => {
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
    <PageContainer>
      <div className="grid gap-y-9">
        <div>
          <RecordingList
            recodingList={sortedRecordRangeList}
            onSelect={handleSelect}
            onDelete={handleDelete}
          />
        </div>
        <div>
          <DeviceOrientationRange orientationData={selectedRecordData} />
        </div>
      </div>
    </PageContainer>
  );
};
export default Archive;
