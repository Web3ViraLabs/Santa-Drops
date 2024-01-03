import HeaderType from "../../components/header";
import { useGiveaway } from "./actions/actions";
import GiveawayMainForm from "./components/main-form";

const GiveawayPublishPage = ({
  params,
}: {
  params: { giveawayId: string };
}) => {
  const gwId = params.giveawayId;
  const giveaway = useGiveaway(gwId);

  if (!giveaway) {
    return <div>Giveaway not found</div>;
  }

  return (
    <>
      <HeaderType title="Create giveaway" description="Edit your giveaway" />
      <GiveawayMainForm />
    </>
  );
};

export default GiveawayPublishPage;
