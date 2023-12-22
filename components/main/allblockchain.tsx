import Image from 'next/image';
import MaxWidthWrapper from '../MaxWidthWrapper';

const AllBlockchains = () => {
  return (
    <>
      <MaxWidthWrapper>
        <div className="py-10 mx-auto text-center flex flex-col items-center max-w-3xl dark:text-white dark:bg-background">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-2xl dark:text-white">
            Connecting all{' '}
            <span className="text-blue-600 dark:text-blue-300">
              BlockChains
            </span>
            .
          </h1>
          <Image
            src="/allBlockchains.png"
            alt="Connecting all Blockchain"
            width={1800}
            height={1000}
          />
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default AllBlockchains;
