export type CardProps = {
  children: React.ReactNode;
};
export const Card: React.FC<CardProps> = ({ children }) => {
  return <div className="rounded-md border-2 border-solid border-gray-300 p-4">{children}</div>;
};
