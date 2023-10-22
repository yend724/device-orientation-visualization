export type CardProps = {
  children: React.ReactNode;
};
export const Card: React.FC<CardProps> = ({ children }) => {
  return <div className="h-full border-separate rounded-md border-2 border-solid">{children}</div>;
};
