import { PATNERS_CONFIG } from '@/config/patners-config';
import MaxWidthWrapper from '../MaxWidthWrapper';
import Image from 'next/image';

const OurPatners = () => {
  return (
    <>
      <section className="border-gray-200 bg-gray-50 dark:bg-background">
        <MaxWidthWrapper className="py-20">
          <div className="text-center relative mx-auto max-w-sm pb-6">
            <h1 className="text-l font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
              Our Patners,
            </h1>
          </div>
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-1 sm:gap-x-4 md:grid-cols-3 md:gap-x-5 lg:grid-cols-5 lg:gap-x-6 lg:gap-y-0">
            {PATNERS_CONFIG.map((patners) => (
              <div
                key={patners.name}
                className="md:flex-shrink-0 flex justify-center"
              >
                <Image
                  src={patners.ImageURL}
                  alt={patners.name}
                  width={100}
                  height={100}
                />
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
};

export default OurPatners;
