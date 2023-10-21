import { NAV_LIST } from '@/app/_constants/nav';
import { SideNavItem } from './SideNavItem';

export const SideNav = () => {
  return (
    <nav aria-label="サイト全体のナビゲーション" className="p-4">
      <ul>
        {NAV_LIST.map((nav) => {
          return <SideNavItem key={nav.href} label={nav.label} href={nav.href} />;
        })}
      </ul>
    </nav>
  );
};
