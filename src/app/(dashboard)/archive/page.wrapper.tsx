import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'アーカイブ',
};

export const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div>{children}</div>;
};
