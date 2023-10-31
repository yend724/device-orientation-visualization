import { useState, useEffect } from 'react';
import { opneIndexedDB, deleteIndexedDBValue, readIndexedDBAll } from '@/app/_utils/indexedDB';

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
    opneIndexedDB({
      dbName: 'DeviceOrientationVisualizationDB',
      onUpgradeneeded: (request) => {
        const db = request.result;
        db.createObjectStore('recordStore');
        db.createObjectStore('rangeStore');
      },
    }).then(() => {
      readIndexedDBAll('DeviceOrientationVisualizationDB', 'rangeStore').then((req) => {
        const result = req.result as RangeStore;
        setRecordRageList(result);
      });
    });
  }, []);

  return { recordRangeList, handleDelete };
};
