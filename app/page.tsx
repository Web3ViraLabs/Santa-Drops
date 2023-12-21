import ConnectButton from "@/components/main/authenticate";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <main className="flex items-center justify-center w-full h-full">
      <ConnectButton />
    </main>
  );
};

export default Home;
