import NextLink, { LinkProps as NextLinkProps } from 'next/link';

export type LinkProps = NextLinkProps & {
  children: React.ReactNode;
};
export const Link: React.FC<LinkProps> = ({ children, ...props }) => {
  return <NextLink {...props}>{children}</NextLink>;
};
