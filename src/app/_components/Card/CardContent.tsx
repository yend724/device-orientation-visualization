export type CardContentProps = {
  children: React.ReactNode;
};
export const CardContent: React.FC<CardContentProps> = ({ children }) => {
  return <div className="p-4">{children}</div>;
};
