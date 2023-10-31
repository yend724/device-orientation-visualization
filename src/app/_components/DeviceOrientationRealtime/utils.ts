import { opneIndexedDB, wirteIndexedDBValue } from '@/app/_utils/indexedDB';

type OrientationData = {
  alpha: number;
  gamma: number;
  beta: number;
  timestamp: number;
};
export const filterArrayByTimestamp = (
  data: OrientationData[],
  currentTimestamp: number,
  seconds: number,
) => {
  return data.filter((d) => {
    const diff = currentTimestamp - d.timestamp;
    return diff <= seconds * 1000;
  });
};

export const saveOrientationData = async (start: number, end: number, data: Blob) => {
  await opneIndexedDB({
    dbName: 'DeviceOrientationVisualizationDB',
    onUpgradeneeded: (request) => {
      const db = request.result;
      db.createObjectStore('recordStore', { autoIncrement: true });
      db.createObjectStore('rangeStore', { autoIncrement: true });
    },
  });
  wirteIndexedDBValue({
    dbName: 'DeviceOrientationVisualizationDB',
    data: { key: start.toString(), value: data },
    storeName: 'recordStore',
  });
  wirteIndexedDBValue({
    dbName: 'DeviceOrientationVisualizationDB',
    data: { key: start.toString(), value: { start, end } },
    storeName: 'rangeStore',
  });
};
