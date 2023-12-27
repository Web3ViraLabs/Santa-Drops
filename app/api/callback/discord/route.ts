import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/get-current-user";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

interface DiscordTokenResponse {
  token_type: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

interface DiscordUserData {
  id: string;
  username: string;
  avatar: string;
}

async function fetch_token(code: string): Promise<DiscordTokenResponse | null> {
  const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID!;
  const clientSecret = process.env.DISCORD_CLIENT_SECRET!;
  const redirectUri = process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI!;
  const grantType = process.env.DISCORD_GRANT_TYPE!;

  const tokenUrl = "https://discord.com/api/oauth2/token";

  try {
    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
        redirect_uri: redirectUri,
        grant_type: grantType,
      }),
    });

    const data = await response.json();

    if (!data || data.error) {
      return null;
    }

    return {
      token_type: data.token_type,
      access_token: data.access_token,
      expires_in: data.expires_in,
      refresh_token: data.refresh_token,
      scope: data.scope,
    };
  } catch (error) {
    console.log("[FETCH_TOKEN] ", error);
    return null;
  }
}

async function fetch_user(token: string): Promise<DiscordUserData | null> {
  try {
    const response = await fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!data || data.error) {
      return null;
    }

    return {
      id: data.id,
      username: data.username,
      avatar: data.avatar,
    };
  } catch (error) {
    console.log("[FETCH_USER] ", error);
    return null;
  }
}

export async function GET(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    const code = req.nextUrl.searchParams.get("code");
    const state = req.nextUrl.searchParams.get("state");

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (currentUser.connections.find((c) => c.provider === "discord")) {
      return NextResponse.redirect(new URL("/settings", req.url));
    }

    if (!code) {
      return NextResponse.json(
        { error: "Authorization code not provided" },
        { status: 400 }
      );
    }

    const token_data: DiscordTokenResponse | null = await fetch_token(code);

    if (!token_data) {
      return NextResponse.json(
        { error: "Failed to fetch token" },
        { status: 500 }
      );
    }

    const user: DiscordUserData | null = await fetch_user(
      token_data.access_token
    );

    if (!user) {
      return NextResponse.json(
        { error: "Failed to fetch user" },
        { status: 500 }
      );
    }

    const { expires_in, access_token, refresh_token, scope, token_type } =
      token_data;
    const { id, username, avatar } = user;
    const image_url = `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`;

    if (state !== cookies().get("state")?.value) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const account = await db.account.create({
      data: {
        accountId: id,
        username,
        image: image_url,
        provider: "discord",
        access_token,
        refresh_token,
        scope,
        token_type,
        expires_at: new Date(Date.now() + expires_in * 1000),
        profileId: currentUser.id,
      },
    });

    if (!account) {
      return NextResponse.json(
        { error: "Failed to create account" },
        { status: 500 }
      );
    }

    return NextResponse.redirect(new URL("/settings", req.url));
  } catch (error) {
    console.error("[CALLBACK] ", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
