"use server";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/get-current-user";

interface GiveawayProps {
  name: string;
  image: string;
  description: string;
  amount: number;
  endsAt: Date;
  discordUrl: string | null;
  twitterUrl: string | null;
  giveawayType: "TOKENS" | "NFT" | "COINS" | "WHITELIST" | "ALLOWLIST";
}

export async function createGiveaway({
  name,
  image,
  description,
  amount,
  endsAt,
  discordUrl,
  twitterUrl,
  giveawayType,
}: GiveawayProps) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }

    const giveaway = await db.giveaway.create({
      data: {
        name,
        image,
        description,
        amount,
        endsAt,
        discordUrl,
        twitterUrl,
        giveawayType,
        creatorId: currentUser.id,
      },
    });

    console.log("[createGiveaway] giveaway", JSON.stringify(giveaway, null, 2));

    if (giveaway) {
      return giveaway;
    }

    return null;
  } catch (error) {
    console.log("[createGiveaway] error", error);
    return null;
  }
}
