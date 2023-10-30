import { useState, useEffect } from 'react';
import { deleteIndexedDBValue, readIndexedDBAll } from '@/app/_utils/indexedDB';

type RangeStore = {
  start: number;
  end: number;
}[];
export const useRecordRangeList = () => {
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

  return { recordRangeList, handleDelete };
};
