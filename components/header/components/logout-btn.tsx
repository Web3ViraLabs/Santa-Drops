import { Button } from "@/components/ui/button";
import { logout } from "../actions/logout";

const LogoutBtn = () => {
  return (
    <Button onClick={() => logout()} className="w-full" variant={"ghost"}>
      Logout
    </Button>
  );
};

export default LogoutBtn;
