const HeaderType = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-center space-y-6">
      <h1 className="text-4xl pl-4 pt-4">{title}</h1>
      <p className="text-zinc-400">{description}</p>
    </div>
  );
};

export default HeaderType;
