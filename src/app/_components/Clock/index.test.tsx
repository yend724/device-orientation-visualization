import { render, screen } from '@testing-library/react';
import { Clock } from '.';

describe('意図通りの時刻を表示しているか', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('「2000-01-01」のフォーマットで日付を返す', () => {
    jest.setSystemTime(new Date('2000-01-01 12:34:56.789'));
    render(<Clock />);
    expect(screen.getByText('2000-01-01')).toBeInTheDocument();
  });

  test('「12:34:56.789」のフォーマットで時刻を返す', () => {
    jest.setSystemTime(new Date('2000-01-01 12:34:56.789'));
    render(<Clock />);
    expect(screen.getByText('12:34:56.789')).toBeInTheDocument();
  });
});
