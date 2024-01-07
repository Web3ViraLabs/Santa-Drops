const FormCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full flex-col space-y-4 items-center bg-background p-8 rounded-lg  ">
      {children}
    </div>
  );
};

export default FormCard;
