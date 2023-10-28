import { render } from '@testing-library/react';
import { Header } from './Header';
import { META } from '@/app/_constants/meta';

describe('Headerコンポーネント', () => {
  test('h1要素とサイトのタイトルがある', () => {
    const { getByRole } = render(<Header />);
    const title = getByRole('heading', { level: 1 });
    expect(title).toHaveTextContent(META.title);
  });
});
