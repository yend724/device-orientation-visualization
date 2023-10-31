import { renderHook, act } from '@testing-library/react';
import { useDeviceOrientation } from './index';

describe('useDeviceOrientation', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('初期状態が正しい', () => {
    const { result } = renderHook(() => useDeviceOrientation());
    expect(result.current.isPermission).toBeFalsy();
    expect(result.current.alpha).toEqual(0);
    expect(result.current.beta).toEqual(0);
    expect(result.current.gamma).toEqual(0);
  });

  test('handleUpdateが値を正しく更新する', () => {
    const { result } = renderHook(() => useDeviceOrientation());
    act(() => {
      result.current.handleUpdate({
        alpha: 1,
        beta: 2,
        gamma: 3,
      } as DeviceOrientationEvent);
    });
    expect(result.current.alpha).toEqual(1);
    expect(result.current.beta).toEqual(2);
    expect(result.current.gamma).toEqual(3);
  });

  test('handleUpdateがnullを0に処理する', () => {
    const { result } = renderHook(() => useDeviceOrientation());
    act(() => {
      result.current.handleUpdate({
        alpha: null,
        beta: null,
        gamma: null,
      } as DeviceOrientationEvent);
    });
    expect(result.current.alpha).toEqual(0);
    expect(result.current.beta).toEqual(0);
    expect(result.current.gamma).toEqual(0);
  });
});
