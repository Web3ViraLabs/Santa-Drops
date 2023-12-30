import { Button } from "@/components/ui/button";
import { logout } from "../actions/logout";
import { LogOut, UserCircle } from "lucide-react";

const LogoutBtn = () => {
  return (
    <Button
      aria-label="Logout"
      onClick={() => logout()}
      className="w-full py-6 flex items-center gap-x-4"
      variant={"ghost"}
    >
      <LogOut />
      <span className="text-lg">Logout</span>
    </Button>
  );
};

export default LogoutBtn;
