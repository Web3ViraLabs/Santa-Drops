import { Type } from "@prisma/client";
import HeaderType from "../../components/header";
import { useGiveaway } from "./actions/actions";
import GiveawayMainForm from "./components/main-form";
import { getDefaultEndAt } from "./utils/utils";

const GiveawayPublishPage = async ({
  params,
}: {
  params: { giveawayId: string };
}) => {
  const gwId = params.giveawayId;
  const giveaway = await useGiveaway(gwId);

  if (!giveaway) {
    return <div>Giveaway not found</div>;
  }

  const data = {
    title: giveaway.name,
    description: giveaway.description,
    imageUrl: giveaway.image || "",
    privateGiveaway: giveaway.type === Type.RESTRICTED ? true : false,
    endsAt: giveaway.endsAt || getDefaultEndAt(),
    discordUrl: giveaway.discordUrl || "",
    twitterUrl: giveaway.twitterUrl || "",
  };

  return (
    <>
      <HeaderType title="Create giveaway" description="Edit your giveaway" />
      <GiveawayMainForm id={giveaway.id} values={data} />
    </>
  );
};

export default GiveawayPublishPage;
