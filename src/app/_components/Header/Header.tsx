export const Header = () => {
  return (
    <header className="flex items-center justify-between border-b border-neutral-700 p-4">
      <h1 className="font-bold">Device Orientation Visualization</h1>
      <button className="flex items-center justify-between gap-x-2 whitespace-nowrap rounded-md bg-neutral-50 px-4 py-2 text-neutral-900 hover:border-neutral-50 focus:border-neutral-50">
        録画
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-4">
          <circle cx="100" cy="100" r="100" fill="red" />
        </svg>
      </button>
    </header>
  );
};
