import { renderHook, act } from '@testing-library/react';
import { useElapsedTime } from './useElapsedTime';

describe('useElapsedTime', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('初期は0', () => {
    const { result } = renderHook(() => useElapsedTime());
    expect(result.current.isRunning).toBeFalsy();
    expect(result.current.elapsedTime).toBe(0);
  });

  test('startを呼び出すとisRunningがtrueになる', () => {
    const { result } = renderHook(() => useElapsedTime());
    act(() => {
      result.current.start();
    });
    expect(result.current.isRunning).toBeTruthy();
  });

  test('stopを呼び出すとisRunningがfalseになる', () => {
    const { result } = renderHook(() => useElapsedTime());
    act(() => {
      result.current.start();
      result.current.stop();
    });
    expect(result.current.isRunning).toBeFalsy();
  });

  test('resetを呼び出すと0になる', () => {
    const { result } = renderHook(() => useElapsedTime());
    act(() => {
      result.current.start();
      jest.advanceTimersByTime(1000);
      result.current.reset();
    });
    expect(result.current.elapsedTime).toBe(0);
  });

  test('updateを呼び出すとelapsedTimeが更新される', () => {
    const { result } = renderHook(() => useElapsedTime());
    act(() => {
      result.current.update(5000);
    });
    expect(result.current.elapsedTime).toBe(5000);
  });
});
