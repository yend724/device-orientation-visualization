import { render, screen } from '@testing-library/react';
import { Link } from './Link';

describe('Linkコンポーネント', () => {
  test('href属性を取得する', async () => {
    const href = '/test';
    render(<Link href={href}>テストリンク</Link>);

    const link = screen.getByText('テストリンク');
    expect(link).toHaveAttribute('href', href);
  });
});
