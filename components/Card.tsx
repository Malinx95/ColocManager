function Card({
  children,
  title,
  subtitle,
}: {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="flex flex-col gap-5 justify-center text-center bg-white rounded-lg m-5 p-5 shadow-md">
      {title && <h2 className="text-xl font-medium">{title}</h2>}
      {subtitle && <h3 className="text-md font-normal">{subtitle}</h3>}
      {children}
    </div>
  );
}

export default Card;
