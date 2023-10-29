import { ComponentProps } from 'react';
import NextLink from 'next/link';
import { twMerge } from 'tailwind-merge';

const underlineStyle = {
  none: 'no-underline',
  hover: 'hover:underline',
  normal: 'underline hover:no-underline',
} as const;
export type LinkProps = ComponentProps<typeof NextLink> & {
  underline?: 'none' | 'hover' | 'normal';
  children: React.ReactNode;
};
export const Link: React.FC<LinkProps> = ({
  children,
  className,
  underline = 'normal',
  ...props
}) => {
  return (
    <NextLink {...props} className={twMerge('block', underlineStyle[underline], className)}>
      {children}
    </NextLink>
  );
};
