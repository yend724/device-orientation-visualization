import { useEffect, useState } from 'react';
import { readIndexedDBValue } from '@/app/_utils/indexedDB';
import { readBlob } from '@/app/_utils/blob';

export const useSelectedData = (recordKey: string) => {
  type RecordData = {
    alpha: number;
    beta: number;
    gamma: number;
    timestamp: number;
  };
  const [recordData, setSelectedData] = useState<RecordData[]>();
  useEffect(() => {
    readIndexedDBValue<Blob>('DeviceOrientationVisualizationDB', 'recordStore', recordKey)
      .then(async (req) => {
        const result = await readBlob<RecordData[]>(req.result);
        setSelectedData(result.reverse());
      })
      .catch(() => {
        setSelectedData([]);
      });
  }, [recordKey]);

  return { recordData };
};
