import { Button } from "@/components/ui/button";

const SignMessage = ({
  address,
  onSignMessageClick,
  loading,
}: {
  address: string;
  onSignMessageClick: () => void;
  loading: boolean;
}) => {
  return (
    <div className="flex flex-col space-y-4 items-center w-full">
      <div>
        <h1 className="text-lg font-semibold">
          Sign in to prove wallet ownership
        </h1>
      </div>
      <div>
        <div className="flex mx-auto items-center justify-center w-full bg-[#7d5eda]/40 px-4 py-0.5 rounded-lg">
          <span>{address.replace(/^(.{4}).*(.{4})$/, "$1...$2")}</span>
        </div>
      </div>

      <Button
        className="px-10 dark:text-white"
        disabled={loading}
        onClick={onSignMessageClick}
      >
        Sign Message {loading && <span>(signing...)</span>}
      </Button>
    </div>
  );
};

export default SignMessage;
