import type { Metadata } from 'next';
import { SideNav } from '@/app/_components/SideNav';
import { META } from '@/app/_constants/meta';
import '@/app/_styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: META.title,
    template: `%s | ${META.title}`,
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <body className="bg-gray-900 text-gray-100">
        <div className="grid h-full w-full grid-cols-[max-content_1fr] overflow-hidden">
          <div className="border-r-2 border-solid border-gray-500">
            <SideNav />
          </div>
          <main className="grid grid-cols-[1fr_2rem] overflow-scroll py-8 pl-8 after:content-['']">
            <div className="">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
};
export default RootLayout;
