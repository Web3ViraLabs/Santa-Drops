import { getGiveaways } from "../../actions/actions";
import Giveaway, { GiveawayProps } from "./components/giveaway";

const CryptoGiveawayPage = async () => {
  const giveaway = await getGiveaways({
    giveawayType: "COINS",
  });

  if (!giveaway) {
    return null;
  }

  return (
    <div className="w-full h-full bg-main overflow-y-auto p-6 space-y-4">
      <div className="flex items-center">
        <h1 className="text-3xl font-bold">Crypto Giveaways</h1>
      </div>
      <Giveaway items={giveaway} />
    </div>
  );
};

export default CryptoGiveawayPage;
