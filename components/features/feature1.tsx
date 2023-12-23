import React from 'react';
import Image from 'next/image';
import MaxWidthWrapper from '../MaxWidthWrapper';

const Feature1 = () => {
  return (
    <>
      <MaxWidthWrapper>
        <section>
          <div className="py-36 container xl:max-w-6xl px-2 m-auto text-left">
            <Image
              alt="Web3 identity"
              width={295}
              height={591}
              className="self-center m-auto md:float-left md:mr-16"
              src="/sol.png"
              style={{ color: 'transparent' }}
            />
            <div className="my-8 lg:my-16 md:ml-8 lg:p-16 rounded-3xl flex-grow">
              <div className="mb-4 text-5xl">Unify your Web3 identity.</div>
              <div className="text-[#7B919D] mb-10">
                Matrica makes it easy to see all your assets and opportunities.
              </div>
              <div className="grid sm:grid-cols-2 gap-4 text-lg">
                <div className="flex rounded-3xl p-6 gap-6 items-center bg-matricablue/5">
                  <div className="grow text-xl">
                    Create your own universal profile
                  </div>
                  <Image
                    alt="Profile Icon"
                    width={69}
                    height={75}
                    src="/sol.png"
                    style={{ color: 'transparent' }}
                  />
                </div>
                <div className="flex rounded-3xl p-6 gap-6 items-center bg-matricablue/5">
                  <div className="grow text-xl">
                    All your wallets in one place
                  </div>
                  <Image
                    alt="Wallets Icon"
                    width={71}
                    height={69}
                    src="/sol.png"
                    style={{ color: 'transparent' }}
                  />
                </div>
                <div className="flex rounded-3xl p-6 gap-6 items-center bg-matricablue/5">
                  <div className="grow text-xl">Multi-blockchain support</div>
                  <Image
                    alt="Multi-blockchain Icon"
                    width={69}
                    height={69}
                    src="/sol.png"
                    style={{ color: 'transparent' }}
                  />
                </div>
                <div className="flex rounded-3xl p-6 gap-6 items-center bg-matricablue/5">
                  <div className="grow text-xl">Portfolio tracker</div>
                  <Image
                    alt="Portfolio Icon"
                    width={69}
                    height={69}
                    src="/sol.png"
                    style={{ color: 'transparent' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </MaxWidthWrapper>
    </>
  );
};

export default Feature1;
