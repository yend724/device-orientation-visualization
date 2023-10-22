import { NAV_LIST } from '@/app/_constants/nav';
import { SideNavItem } from './SideNavItem';

export const SideNav = () => {
  return (
    <nav aria-label="サイト全体のナビゲーション" className="px-4 py-8">
      <ul className="space-y-4">
        {NAV_LIST.map((nav) => {
          const { href, label } = nav;
          return <SideNavItem key={href} label={label} href={href} />;
        })}
      </ul>
    </nav>
  );
};
