'use client';
import { usePathname } from 'next/navigation';
import { Link } from '@/app/_components/Link';

type SideNavItemProps = {
  href: string;
  label: string;
};
export const SideNavItem: React.FC<SideNavItemProps> = ({ href, label }) => {
  const pathname = usePathname();
  const isActive = href === pathname;
  const ariaCurrent = isActive ? 'page' : undefined;
  const nonActiveClass = !isActive ? 'text-neutral-100/50' : undefined;

  return (
    <li>
      <Link className={nonActiveClass} href={href} aria-current={ariaCurrent} underline="none">
        {label}
      </Link>
    </li>
  );
};
