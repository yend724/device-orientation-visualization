import { render, screen } from '@testing-library/react';
import { Clock } from '.';

describe('Clockコンポーネント', () => {
  test('「2000-01-01」のフォーマットで日付を返す', () => {
    render(<Clock currentTime={new Date('2000-01-01 12:34:56.789')} />);
    expect(screen.getByText('2000-01-01')).toBeInTheDocument();
  });

  test('「12:34:56.789」のフォーマットで時刻を返す', () => {
    render(<Clock currentTime={new Date('2000-01-01 12:34:56.789')} />);
    expect(screen.getByText('12:34:56.789')).toBeInTheDocument();
  });
});
