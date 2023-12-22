import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NetworkBtn from "./components/network-btn";

const Login = () => {
  return (
    <main className="flex items-center justify-center w-full h-full">
      <Card className="w-96 min-w-[100px] h-96">
        <CardHeader>
          <CardTitle className="text-3xl text-center">
            Select a network
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 p-3">
          <NetworkBtn name="Ethereum" icon={"/ethereum.png"} />
        </CardContent>
      </Card>
    </main>
  );
};

export default Login;
