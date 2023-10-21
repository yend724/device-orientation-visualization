import { Link } from '@/app/_components/ui/Link';

export type SideNavProps = {
  list: {
    href: string;
    text: string;
  }[];
};
export const SideNav: React.FC<SideNavProps> = ({ list }) => {
  return (
    <nav aria-label="サイト全体のナビゲーション" className="p-4">
      <ul>
        {list.map((nav) => {
          return (
            <li key={nav.text}>
              <Link href={nav.href}>{nav.text}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
