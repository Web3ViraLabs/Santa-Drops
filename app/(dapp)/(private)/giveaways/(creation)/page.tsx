import { db } from "@/lib/db";
import CreateCard from "./components/create-card";
import HeaderType from "./components/header";
import MainContent from "./components/main-content";
import { getCurrentUser } from "@/lib/get-current-user";
import DraftCard from "./components/draft-card";
import icon from "@/config/image-provider";

const CreateGiveaway = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return null;
  }
  const unpublishedGiveaways = await db.giveaway.findMany({
    where: {
      published: false,
      creatorId: currentUser.id,
    },
    select: {
      id: true,
      name: true,
      description: true,
      image: true,
    },
  });

  if (!unpublishedGiveaways) {
    return [];
  }

  return (
    <>
      <HeaderType
        title="Your giveaways"
        description="Create, view or edit your giveaways"
      />
      <CreateCard />
      <MainContent>
        {unpublishedGiveaways.map((giveaway) => (
          <DraftCard
            key={giveaway.id}
            id={giveaway.id}
            title={giveaway.name}
            image={
              giveaway.image ||
              icon("demo")[Math.floor(Math.random() * icon("demo").length)]
                .image
            }
            description={giveaway.description || ""}
          />
        ))}
        {unpublishedGiveaways.length === 0 && (
          <p className="ml-8 text-center text-zinc-400">
            You have no unpublished giveaways
          </p>
        )}
      </MainContent>
    </>
  );
};

export default CreateGiveaway;
