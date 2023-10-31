import { renderHook } from '@testing-library/react';
import { useScaleLinear } from './hooks';

describe('[hooks]useScaleLinear', () => {
  test('x()/ y()が期待している値を返す', () => {
    const mockData: {
      timestamp: number;
      gamma: number;
      alpha: number;
      beta: number;
    }[] = [
      { timestamp: 1, gamma: 1, alpha: 1, beta: 1 },
      { timestamp: 2, gamma: 2, alpha: 2, beta: 2 },
    ];
    const { result } = renderHook(() =>
      useScaleLinear({ data: mockData, width: 100, height: 100 }),
    );
    expect(result.current.x(1)).toBe(0);
    expect(result.current.x(2)).toBe(100);
    expect(result.current.y(-180)).toBe(100);
    expect(result.current.y(360)).toBe(0);
  });
});
