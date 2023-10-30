import { Fragment } from 'react';
import { Link } from '@/app/_components/Link';

export type BreadCrumbsProps = {
  paths: {
    label: string;
    href: string;
  }[];
};
export const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ paths }) => {
  return (
    <div className="flex gap-x-2">
      {paths.map((path, i) => {
        if (i === paths.length - 1) return <p key={path.href}>{path.label}</p>;
        return (
          <Fragment key={path.href}>
            <Link href={path.href}>{path.label}</Link>
            <span>{'>'}</span>
          </Fragment>
        );
      })}
    </div>
  );
};
