import { META } from '@/app/_constants/meta';

export const Header = () => {
  return (
    <header className="flex items-center justify-between border-b border-neutral-700 p-4">
      <h1 className="font-bold">{META.title}</h1>
    </header>
  );
};
