'use client';
import { usePathname } from 'next/navigation';
import { Link } from '@/app/_components/Link';

type SideNavItemProps = {
  href: string;
  label: string;
};
export const SideNavItem: React.FC<SideNavItemProps> = ({ href, label }) => {
  const pathname = usePathname();
  const ariaCurrent = href === pathname ? 'page' : undefined;

  return (
    <li>
      <Link href={href} aria-current={ariaCurrent}>
        {label}
      </Link>
    </li>
  );
};
