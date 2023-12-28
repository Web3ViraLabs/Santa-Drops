import { db } from "./db";
import { getToken } from "./get-token";

export async function getCurrentUser() {
  const token = getToken();
  if (!token) return null;

  const profile = await db.profile.findFirst({
    where: { token },
    include: { connections: true, wallets: true },
  });

  if (!profile) return null;

  const twitterConnection = profile.connections.find(
    (c) => c.provider === "twitter"
  );

  if (twitterConnection && new Date() >= twitterConnection.expires_at!) {
    const refreshToken = twitterConnection.refresh_token;
    const clientId = process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID;
    const refreshResponse = await fetch(
      "https://api.twitter.com/2/oauth2/token",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          refresh_token: refreshToken!,
          grant_type: "refresh_token",
          client_id: clientId!,
        }),
      }
    );

    console.log(refreshToken, clientId);

    const refreshData = await refreshResponse.json();
    console.log(refreshData);

    if (refreshResponse.ok && refreshData.access_token) {
      const updatedProfile = await db.profile.update({
        where: { id: profile.id },
        data: {
          connections: {
            update: {
              where: { id: twitterConnection.id },
              data: {
                access_token: refreshData.access_token,
                refresh_token: refreshData.refresh_token,
                expires_at: new Date(
                  Date.now() + refreshData.expires_in * 1000
                ),
              },
            },
          },
        },
      });
    }
  }

  return profile;
}
