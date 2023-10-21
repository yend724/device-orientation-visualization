import { render } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import { NAV_LIST } from '@/app/_constants/nav';
import { SideNav } from './SideNav';
import { SideNavItem } from './SideNavItem';

jest.mock('next/navigation');

describe('SideNav', () => {
  test('NAV_LISTにもとづいてリンクのリストがレンダリングされる', () => {
    const { getByRole, getAllByRole } = render(<SideNav />);
    const nav = getByRole('navigation');
    expect(nav).toBeInTheDocument();
    const list = getByRole('list');
    expect(list).toBeInTheDocument();
    const items = getAllByRole('listitem');
    expect(items.length).toBe(NAV_LIST.length);
    NAV_LIST.forEach((nav, index) => {
      const item = items[index];
      expect(item).toHaveTextContent(nav.label);
      const link = item.querySelector('a');
      expect(link).toHaveAttribute('href', nav.href);
    });
  });

  test('hrefとpathnameが一致する場合、aria-current属性が設定される', () => {
    const { href, label } = NAV_LIST[0];
    (usePathname as jest.Mock).mockReturnValue(href);
    const { getByRole } = render(<SideNavItem href={href} label={label} />);
    const link = getByRole('link', { name: label });
    expect(usePathname).toHaveBeenCalled();
    expect(link).toHaveAttribute('aria-current', 'page');
  });

  test('hrefとpathnameが一致しない場合、aria-current属性が設定されない', () => {
    const { href, label } = NAV_LIST[0];
    const pathname = NAV_LIST[1].href;
    (usePathname as jest.Mock).mockReturnValue(pathname);
    const { getByRole } = render(<SideNavItem href={href} label={label} />);
    const link = getByRole('link', { name: label });
    expect(link).not.toHaveAttribute('aria-current');
  });
});
