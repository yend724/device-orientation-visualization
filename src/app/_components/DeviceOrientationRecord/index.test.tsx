import { renderHook, act } from '@testing-library/react';
import { useTimestampRange } from './hooks';

describe('[hooks]useTimestampRange', () => {
  test('初期はnull', () => {
    const { result } = renderHook(() => useTimestampRange());
    expect(result.current.timestampRange).toBeNull();
  });

  test('正しくhandleUpdateTimestampRangeでアップデートできるか', () => {
    const { result } = renderHook(() => useTimestampRange());
    const newRange: [number, number] = [1, 2];
    act(() => {
      result.current.handleUpdateTimestampRange(newRange);
    });
    expect(result.current.timestampRange).toEqual(newRange);
  });
});
