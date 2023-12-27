"use server";

import { cookies } from "next/headers";
import { db } from "./db";

export async function getCurrentUser() {
  const token = cookies().get("token")?.value;

  if (!token) {
    return null;
  }

  const profile = await db.profile.findFirst({
    where: {
      token,
    },
  });

  if (!profile) {
    return null;
  }

  return profile;
}
