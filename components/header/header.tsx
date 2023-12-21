import ConnectButton from "../modals/components/authenticate";

const Header = () => {
  return (
    <div className="asbsolute top-0 w-full p-4 bg-background flex flex-row items-center border-b">
      <div className="flex">
        <h1 className="text-3xl dark:text-white ">Santa Drops</h1>
      </div>
      <div className="ms-auto me-4">
        <ConnectButton />
      </div>
    </div>
  );
};

export default Header;
