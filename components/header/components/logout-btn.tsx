import { useLoginContext } from "@/components/login/components/login-context";
import { Button } from "@/components/ui/button";

const LogoutBtn = () => {
  const { logout } = useLoginContext();

  const onClick = () => {
    logout();
  };

  return (
    <Button onClick={onClick} className="w-full" variant={"ghost"}>
      Logout
    </Button>
  );
};

export default LogoutBtn;
