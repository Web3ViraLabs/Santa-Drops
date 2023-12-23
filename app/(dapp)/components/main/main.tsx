import Link from "next/link";

const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col flex-1 h-full">
      <div className="sticky flex top-0 max-w-[1080px] px-4 md:px-8 items-center h-20">
        <div className="ms-auto">
          <div className="ml-4 flow-root lg:ml-6">
            <Link
              href={"/login"}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-auto"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Main;
