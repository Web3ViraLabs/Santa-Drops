import Image from "next/image";

const Feature3 = () => {
  return (
    <>
      <div className="py-36 container xl:max-w-6xl px-2 m-auto text-center">
        <div className="mb-2 text-5xl">Stay connected</div>
        <div className="text-[#7B919D] mb-10 text-lg">
          Use your Matrica Identity to unlock powerful social features
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 justify-center overflow-hidden items-center">
          <div className="w-full rounded-3xl flex justify-center col-span-7">
            <Image
              alt="Social Feed Image"
              loading="lazy"
              width={1056}
              height={836}
              decoding="async"
              className="w-full"
              src="/sol.png"
              style={{ color: "transparent" }}
            />
          </div>
          <div className="flex flex-col gap-5 text-left items-left col-span-5">
            <div className="w-full p-8 gap-4">
              <div className="text-xl mb-1.5 flex gap-2 items-center">
                <svg
                  width="1.5em"
                  height="1.5em"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  color="#4A99BF"
                >
                  <path
                    d="M7 12.5l3 3 7-7"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Real-time feed
              </div>
              <div className="text-base-content/50">
                All the alpha in one place. Discord announcements, Tweets,
                on-chain data, and more.
              </div>
            </div>
            <div className="w-full p-8 gap-4">
              <div className="text-xl mb-1.5 flex gap-2 items-center">
                <svg
                  width="1.5em"
                  height="1.5em"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  color="#4A99BF"
                >
                  <path
                    d="M7 12.5l3 3 7-7"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Chat with friends
              </div>
              <div className="text-base-content/50">
                Chat with other users and send on-chain messages to wallets
              </div>
            </div>
            <div className="w-full p-8 gap-4">
              <div className="text-xl mb-1.5 flex gap-2 items-center">
                <svg
                  width="1.5em"
                  height="1.5em"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  color="#4A99BF"
                >
                  <path
                    d="M7 12.5l3 3 7-7"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Gated features
              </div>
              <div className="text-base-content/50">
                Participate in gated community chatrooms directly on Matrica
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feature3;
