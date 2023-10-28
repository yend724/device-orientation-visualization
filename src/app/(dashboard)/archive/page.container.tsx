import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'アーカイブ',
};

export const PageContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};
