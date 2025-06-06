import { AppConfig, UserSession } from "@stacks/connect";

const appConfig = new AppConfig(["store_write", "publish_data"]);

export const userSession = new UserSession({ appConfig });

const StacksProvider = ({ children }: { children: React.ReactNode }) => {
  return children;
};

export default StacksProvider;
