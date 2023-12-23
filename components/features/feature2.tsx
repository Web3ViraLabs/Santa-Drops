import Image from 'next/image';

const Feature2 = () => {
  return (
    <>
      <div className="py-36 container xl:max-w-6xl px-2 m-auto gap-4 text-center">
        <div className="mb-4 text-5xl">Access token-gated rewards</div>
        <div className="text-base-content/50 mb-10">
          Use your matrica identity to unlock access to rewards and experiences
          created by your communities
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg text-left items-center">
          <Image
            alt="Community Image"
            loading="lazy"
            width={946}
            height={903}
            decoding="async"
            data-nImage={1}
            className="justify-self-center md:order-last"
            src="/sol.png"
            style={{ color: 'transparent' }}
          />
          <div>
            <div className="flex rounded-3xl p-6 gap-7 items-center">
              <Image
                alt="Events Icon"
                loading="lazy"
                width={69}
                height={68}
                decoding="async"
                data-nImage={1}
                src="/sol.png"
                style={{ color: 'transparent' }}
              />
              <div>
                <div className="text-xl">Exclusive Events</div>
                <div className="text-sm text-base-content/50">
                  Entry to events both virtual and IRL
                </div>
              </div>
            </div>
            <div className="flex rounded-3xl p-6 gap-7 items-center">
              <Image
                alt="Community Icon"
                loading="lazy"
                width={69}
                height={75}
                decoding="async"
                data-nImage={1}
                src="/sol.png"
                style={{ color: 'transparent' }}
              />
              <div>
                <div className="text-xl">Community Access</div>
                <div className="text-sm text-base-content/50">
                  Access to gated Web3 communities
                </div>
              </div>
            </div>
            <div className="flex rounded-3xl p-6 gap-7 items-center">
              <Image
                alt="Airdrops Icon"
                loading="lazy"
                width={69}
                height={68}
                decoding="async"
                data-nImage={1}
                src="/sol.png"
                style={{ color: 'transparent' }}
              />
              <div>
                <div className="text-xl">Airdrops</div>
                <div className="text-sm text-base-content/50">
                  Exclusive collectibles &amp; airdrops
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feature2;
