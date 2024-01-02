'use client';

import HeaderType from './components/header';
import GiveawayForm from './components/giveaway-form';
import ParticipationForm from './components/participation-form';
import PrivateGiveaway from './components/privategiveaway-form';
import GiveawayType from './components/giveaway-type';

const CreateGiveaway = () => {
  return (
    <>
      <HeaderType
        title="Create token giveaway"
        description="Create token giveaway"
      />
      <GiveawayForm />
      <GiveawayType />
      <PrivateGiveaway />
      <ParticipationForm />
    </>
  );
};

export default CreateGiveaway;
