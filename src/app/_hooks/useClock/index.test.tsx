import { renderHook } from '@testing-library/react';
import { useClock } from '.';

describe('useClock', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('現在時刻が返される', () => {
    const now = new Date('2000-01-01 12:34:56.789');
    jest.setSystemTime(now);

    const { result } = renderHook(() => useClock());
    expect(result.current.currentTime).toEqual(now);
  });
});
