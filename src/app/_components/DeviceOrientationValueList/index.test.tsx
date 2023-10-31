import { render, screen } from '@testing-library/react';
import { DeviceOrientationValueList } from './DeviceOrientationValueList';

describe('DeviceOrientationValueListコンポーネント', () => {
  test('正しくpropsがレンダリングされる', () => {
    render(<DeviceOrientationValueList alpha={1} gamma={2} beta={3} />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
