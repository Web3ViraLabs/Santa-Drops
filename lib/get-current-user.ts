import { db } from "./db";
import { getToken } from "./get-token";

export async function getCurrentUser() {
  const token = getToken();

  if (!token) {
    return null;
  }

  const profile = await db.profile.findFirst({
    where: {
      token,
    },
    include: {
      connections: true,
    },
  });

  if (!profile) {
    return null;
  }

  return profile;
}
