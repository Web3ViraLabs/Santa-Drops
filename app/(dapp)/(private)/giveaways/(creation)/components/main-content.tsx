const MainContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mt-4 flex flex-col space-y-6 ml-8">
      <h1 className="text-3xl ">Manage Draft Giveaways</h1>
      <div className="mt-2 flex w-full flex-wrap items-center">{children}</div>
    </div>
  );
};

export default MainContent;
