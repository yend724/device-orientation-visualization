import type { Metadata } from 'next';
import { Header } from '@/app/_components/Header';
import { SideNav } from '@/app/_components/SideNav';
import { FpsView } from '@/app/_components/FpsView';
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
      <body className="bg-neutral-950 text-neutral-100">
        <div className="grid h-full w-full grid-cols-[max-content_1fr] grid-rows-[auto_1fr] overflow-hidden">
          <div className="col-span-2">
            <Header />
          </div>
          <aside>
            <SideNav />
          </aside>
          <main className="grid grid-cols-[1fr_1rem] overflow-scroll py-8 pl-4 after:content-['']">
            <div>{children}</div>
          </main>
        </div>
        <FpsView />
      </body>
    </html>
  );
};
export default RootLayout;
