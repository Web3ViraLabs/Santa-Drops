"use server";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/get-current-user";
import { revalidatePath } from "next/cache";

export default async function initGiveaway({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }

    const newGw = await db.giveaway.create({
      data: {
        name,
        description,
        creatorId: currentUser.id,
      },
    });

    if (!newGw) {
      return null;
    }

    revalidatePath("/giveaways");
    return newGw;
  } catch (error) {
    console.log("[CREATE_NEW_GIVEAWAY_SERVER] ", error);
    return null;
  }
}
