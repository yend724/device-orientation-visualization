import { renderHook } from '@testing-library/react';
import { useScaleLinear } from './hooks';

describe('[hooks]useScaleLinear', () => {
  test('指定した幅と高さから期待している値を返す', () => {
    const { result } = renderHook(() => useScaleLinear({ width: 100, height: 200 }));
    expect(result.current.x(0)).toEqual(100);
    expect(result.current.y(0)).toEqual((200 / 3) * 2);
  });
});
