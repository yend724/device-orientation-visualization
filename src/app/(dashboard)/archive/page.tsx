'use client';
import { useEffect, useState } from 'react';
import { RecordingList } from '@/app/_components/RecordingList';
import { PageWrapper } from './page.wrapper';
import { readIndexedDBAll, readIndexedDBValue } from '@/app/_utils/indexedDB';
import { readBlob } from '@/app/_utils/blob';
import { deleteIndexedDBValue } from '@/app/_utils/indexedDB';

type RangeStore = {
  start: number;
  end: number;
}[];

const Archive = () => {
  const [recordRange, setRecordRage] = useState<RangeStore>([]);
  const [recordDataList, setRecordDataList] = useState<
    {
      alpha: number;
      beta: number;
      gamma: number;
      timestamp: number;
    }[]
  >([]);

  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      timer = setInterval(() => {
        if (progress < recordDataList.length - 1) {
          setProgress(progress + 1);
        } else {
          setProgress(0);
          setIsRunning(false);
        }
      }, 16);
    }
    return () => clearTimeout(timer);
  }, [isRunning, progress, recordDataList]);

  useEffect(() => {
    readIndexedDBAll('DeviceOrientationVisualizationDB', 'rangeStore').then((req) => {
      const result = req.result as RangeStore;
      setRecordRage(result);
    });
  }, []);

  const handleSelect = async (key: number) => {
    const request = await readIndexedDBValue<Blob>(
      'DeviceOrientationVisualizationDB',
      'recordStore',
      key.toString(),
    );
    const result = await readBlob<typeof recordDataList>(request.result);
    setRecordDataList(result.reverse());
  };
  const handleDelete = async (key: number) => {
    Promise.all([
      deleteIndexedDBValue('DeviceOrientationVisualizationDB', 'recordStore', key.toString()),
      deleteIndexedDBValue('DeviceOrientationVisualizationDB', 'rangeStore', key.toString()),
    ]).then(() => {
      readIndexedDBAll('DeviceOrientationVisualizationDB', 'rangeStore').then((req) => {
        const result = req.result as RangeStore;
        setRecordRage(result);
      });
    });
  };

  return (
    <PageWrapper>
      <div>
        <RecordingList recodingList={recordRange} onSelect={handleSelect} onDelete={handleDelete} />
      </div>
    </PageWrapper>
  );
};
export default Archive;
