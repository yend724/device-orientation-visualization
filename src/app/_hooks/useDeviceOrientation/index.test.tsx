import { renderHook } from '@testing-library/react';
import { useDeviceOrientation } from '.';

describe('useDeviceOrientation', () => {
  test('deviceorientationイベントが発生しない場合、alpha、beta、gammaプロパティは0である', () => {
    const { result } = renderHook(() => useDeviceOrientation());
    expect(result.current.alpha).toBe(0);
    expect(result.current.beta).toBe(0);
    expect(result.current.gamma).toBe(0);
  });

  // TODO: deviceorientationイベントによって、alpha、beta、gammaプロパティが更新されることをテストする
});
