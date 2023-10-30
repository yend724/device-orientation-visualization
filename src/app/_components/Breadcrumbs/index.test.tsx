import { render, screen } from '@testing-library/react';
import { BreadCrumbs } from './Breadcrumbs';

describe('BreadCrumbsコンポーネント', () => {
  test('すべてのlabelが存在する', () => {
    const paths = [
      { label: 'ホーム', href: '/' },
      { label: 'アバウト', href: '/about' },
      { label: 'コンタクト', href: '/contact' },
    ];
    render(<BreadCrumbs paths={paths} />);

    paths.forEach((path) => {
      expect(screen.getByText(path.label)).toBeInTheDocument();
    });
  });

  test('最後はテキスト', () => {
    const paths = [
      { label: 'ホーム', href: '/' },
      { label: 'アバウト', href: '/about' },
    ];
    render(<BreadCrumbs paths={paths} />);

    const lastPath = paths[paths.length - 1];
    const lastPathElement = screen.getByText(lastPath.label);
    expect(lastPathElement.closest('a')).toBeNull();
  });

  test('最後のパスを除くすべてのパスが正しいhref属性を持つリンクになる', () => {
    const paths = [
      { label: 'ホーム', href: '/' },
      { label: '録画', href: '/archive' },
    ];
    render(<BreadCrumbs paths={paths} />);

    paths.slice(0, -1).forEach((path) => {
      const pathElement = screen.getByText(path.label);
      expect(pathElement.closest('a')).toHaveAttribute('href', path.href);
    });
  });
});
