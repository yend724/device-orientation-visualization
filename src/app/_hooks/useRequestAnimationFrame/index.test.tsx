import { renderHook, act } from '@testing-library/react';
import { useRequestAnimationFrame } from './useRequestAnimationFrame';

describe('useRequestAnimationFrame', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('callbackが呼び出される', async () => {
    const callback = jest.fn();
    renderHook(() => useRequestAnimationFrame(callback, true));
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(callback).toHaveBeenCalled();
  });

  test('isRunningがfalseの場合、callbackが呼び出されない', () => {
    const callback = jest.fn();
    renderHook(() => useRequestAnimationFrame(callback, false));
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(callback).not.toHaveBeenCalled();
  });
});
