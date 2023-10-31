import { renderHook } from '@testing-library/react';
import { useScaleLinear, OrientationData } from './hooks';

describe('useScaleLinear', () => {
  test('想定している値を返す', () => {
    const data: OrientationData[] = [
      { timestamp: 1, gamma: 0, alpha: 0, beta: 0 },
      { timestamp: 2, gamma: 0, alpha: 0, beta: 0 },
      { timestamp: 3, gamma: 0, alpha: 0, beta: 0 },
    ];
    const width = 100;

    const { result } = renderHook(() => useScaleLinear({ data, width }));

    expect(result.current.x(1)).toBe(0);
    expect(result.current.x(2)).toBe(50);
    expect(result.current.x(3)).toBe(100);
  });
});
