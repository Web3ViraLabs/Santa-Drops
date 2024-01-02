"use client";

import HeaderType from "./components/header";
import GiveawayForm from "./components/giveaway-form";
import ParticipationForm from "./components/participation-form";
import GiveawayTypeForm from "./components/giveaway-type-form";

const CreateGiveaway = () => {
  return (
    <>
      <HeaderType
        title="Create token giveaway"
        description="Create token giveaway"
      />
      <GiveawayForm />
      <GiveawayTypeForm />
      <ParticipationForm />
    </>
  );
};

export default CreateGiveaway;
