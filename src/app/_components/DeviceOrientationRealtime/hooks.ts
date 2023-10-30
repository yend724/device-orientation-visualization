import { useState, useCallback } from 'react';
import { convertArrayToBlob } from '@/app/_utils/blob';
import { saveOrientationData } from '@/app/_utils/indexedDB';

export const useDOMSize = () => {
  const [size, setSize] = useState([0, 0]);
  const ref = useCallback((node: HTMLDivElement | null) => {
    if (node === null) {
      return;
    }

    const absortController = new AbortController();
    const handleResize = () => {
      setSize([node.clientWidth, node.clientHeight]);
    };
    handleResize();
    window.addEventListener('resize', handleResize, { signal: absortController.signal });

    return () => {
      absortController.abort();
    };
  }, []);

  return {
    width: size[0],
    height: size[1],
    ref,
  };
};

type OrientationData = {
  alpha: number;
  gamma: number;
  beta: number;
  timestamp: number;
};
export const useRealtimeOrientationData = () => {
  const [realtimeData, setRealtimeData] = useState<OrientationData[]>([]);
  const handleUpdateRealtimeData = useCallback((data: OrientationData[]) => {
    setRealtimeData(data);
  }, []);

  return {
    realtimeData,
    handleUpdateRealtimeData,
  };
};

export const useRecordOrientationData = () => {
  const [recordData, setRecordData] = useState<OrientationData[]>([]);
  const handlePrependRecordData = useCallback((data: OrientationData) => {
    setRecordData((prev) => [data, ...prev]);
  }, []);
  const handleResetRecordData = useCallback(() => {
    setRecordData([]);
  }, []);

  const [isRecording, setIsRecording] = useState(false);
  const handleStartRecording = useCallback(() => {
    setIsRecording(true);
  }, []);
  const handleStopRecording = useCallback(() => {
    setIsRecording(false);
    const startTimeStamp = recordData[recordData.length - 1].timestamp;
    const endTimeStamp = recordData[0].timestamp;
    const blob = convertArrayToBlob(recordData);
    saveOrientationData(startTimeStamp, endTimeStamp, blob);
    handleResetRecordData();
  }, [recordData, handleResetRecordData]);

  return {
    isRecording,
    handleStartRecording,
    handleStopRecording,
    recordData,
    handlePrependRecordData,
  };
};
