import { renderHook, act } from '@testing-library/react';
import { filterArrayByTimestamp, saveOrientationData } from './utils';
import { useRealtimeOrientationData, useRecordOrientationData } from './hooks';
import { opneIndexedDB, wirteIndexedDBValue } from '@/app/_utils/indexedDB';

jest.mock('@/app/_utils/indexedDB');

describe('[utils]filterArrayByTimestamp', () => {
  test('指定した秒数内のデータのみをフィルタリングする', () => {
    const data = [
      { alpha: 0, beta: 0, gamma: 0, timestamp: 1000 },
      { alpha: 0, beta: 0, gamma: 0, timestamp: 2000 },
      { alpha: 0, beta: 0, gamma: 0, timestamp: 3000 },
    ];
    const result = filterArrayByTimestamp(data, 3500, 1);
    expect(result).toEqual([{ alpha: 0, beta: 0, gamma: 0, timestamp: 3000 }]);
  });
});

describe('[utils]saveOrientationData', () => {
  test('データが正しく保存される', async () => {
    const blob = new Blob();
    await saveOrientationData(1000, 2000, blob);
    expect(opneIndexedDB).toHaveBeenCalledWith({
      dbName: 'DeviceOrientationVisualizationDB',
      onUpgradeneeded: expect.any(Function),
    });
    expect(wirteIndexedDBValue).toHaveBeenCalledWith({
      dbName: 'DeviceOrientationVisualizationDB',
      data: { key: '1000', value: blob },
      storeName: 'recordStore',
    });
    expect(wirteIndexedDBValue).toHaveBeenCalledWith({
      dbName: 'DeviceOrientationVisualizationDB',
      data: { key: '1000', value: { start: 1000, end: 2000 } },
      storeName: 'rangeStore',
    });
  });
});

describe('[hooks]useRealtimeOrientationData', () => {
  test('空の配列で初期化される', () => {
    const { result } = renderHook(() => useRealtimeOrientationData());
    expect(result.current.realtimeData).toEqual([]);
  });

  test('データが更新される', () => {
    const { result } = renderHook(() => useRealtimeOrientationData());
    const newData: {
      alpha: number;
      beta: number;
      gamma: number;
      timestamp: number;
    }[] = [{ alpha: 1, beta: 2, gamma: 3, timestamp: 123 }];
    act(() => {
      result.current.handleUpdateRealtimeData(newData);
    });
    expect(result.current.realtimeData).toEqual(newData);
  });
});

describe('[hooks]useRecordOrientationData', () => {
  test('初期状態は録音されていない', () => {
    const { result } = renderHook(() => useRecordOrientationData());
    expect(result.current.recordData).toEqual([]);
    expect(result.current.isRecording).toBe(false);
  });

  test('録音の開始と停止', () => {
    const { result } = renderHook(() => useRecordOrientationData());

    act(() => {
      result.current.handlePrependRecordData({
        alpha: 1,
        beta: 2,
        gamma: 3,
        timestamp: 123,
      });
      result.current.handleStartRecording();
    });
    expect(result.current.isRecording).toBe(true);
    act(() => {
      result.current.handleStopRecording();
    });
    expect(result.current.isRecording).toBe(false);
  });
});
