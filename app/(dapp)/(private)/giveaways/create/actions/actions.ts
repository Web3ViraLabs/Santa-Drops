"use server";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/get-current-user";
import { Type } from "@prisma/client";

interface GiveawayProps {
  name: string;
  image: string;
  description: string;
  endsAt: Date;
}

export async function saveGiveaway({
  name,
  image,
  description,
  endsAt,
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
        endsAt,
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

interface SavedGiveawayProps {
  id: string;
  type?: Type;
  discordUrl?: string | null;
  twitterUrl?: string | null;
  // giveawayType?: "TOKENS" | "NFT" | "COINS" | "WHITELIST" | "ALLOWLIST";
}

export async function updateSavedGiveaway({
  id,
  type,
  discordUrl,
  twitterUrl,
}: // giveawayType,
SavedGiveawayProps) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }

    const giveaway = await db.giveaway.update({
      where: {
        id,
      },
      data: {
        type,
        discordUrl,
        // giveawayType,
        twitterUrl,
      },
    });

    console.log("[updateGiveaway] giveaway", JSON.stringify(giveaway, null, 2));

    if (giveaway) {
      return giveaway;
    }

    return null;
  } catch (error) {
    console.log("[updateGiveaway] error", error);
    return null;
  }
}
