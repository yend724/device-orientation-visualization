import { ComponentProps } from 'react';
import NextLink from 'next/link';
import { twMerge } from 'tailwind-merge';

export type LinkProps = ComponentProps<typeof NextLink> & {
  children: React.ReactNode;
};
export const Link: React.FC<LinkProps> = ({ children, className, ...props }) => {
  return (
    <NextLink {...props} className={twMerge('block hover:underline', className)}>
      {children}
    </NextLink>
  );
};
