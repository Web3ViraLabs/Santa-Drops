"use server";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/get-current-user";
import { Type } from "@prisma/client";

export async function useGiveaway(id: string) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }
    const giveaway = await db.giveaway.findUnique({
      where: {
        id,
        creatorId: currentUser.id,
      },
      include: {
        tokenDetails: true,
      },
    });

    if (!giveaway) {
      return null;
    }

    return giveaway;
  } catch (error) {
    console.log("[USE_GIVEAWAY_SERVER] ", error);
  }
}

interface ValuesProps {
  title: string;
  imageUrl: string;
  description: string;
  endsAt: string;
  privateGiveaway: boolean;
  discordUrl: string;
  twitterUrl: string;
}

export async function updateGiveaway(id: string, data: ValuesProps) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }

    console.log("Server", JSON.stringify(data, null, 2));

    const giveaway = await db.giveaway.update({
      where: {
        id,
      },
      data: {
        name: data.title,
        image: data.imageUrl,
        description: data.description,
        endsAt: new Date(data.endsAt),
        type: data.privateGiveaway === true ? Type.RESTRICTED : Type.PUBLIC,
        discordUrl: data.discordUrl,
        twitterUrl: data.twitterUrl,
      },
    });

    if (!giveaway) {
      return null;
    }

    return giveaway;
  } catch (error) {
    console.log("[UPDATE_GIVEAWAY_SERVER] ", error);
  }
}
