import { getCurrentUser } from "@/lib/get-current-user";
import { redirect } from "next/navigation";

const PrivateLayout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect("/");
  }
  return <>{children}</>;
};

export default PrivateLayout;
