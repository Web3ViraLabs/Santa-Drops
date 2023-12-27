import { db } from "@/lib/db";
import { logTimeAndData } from "@/lib/log-time";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const startTime = new Date();
    const name = req.nextUrl.searchParams.get("name");
    const user = await db.profile.findFirst({
      where: {
        name: name || undefined,
      },
    });

    if (user) {
      logTimeAndData({
        label: "/api/account/login GET",
        startTime,
        data: user,
      });

      return NextResponse.json(
        {
          code: 1001,
          name: user.name,
          message: "User already exists",
        },
        { status: 409 }
      );
    }

    return NextResponse.json({});
  } catch (error) {
    console.log("[USER_FETCH] ", error);
  }
}

export async function POST(req: Request) {
  try {
    const { address } = await req.json();

    if (!address) {
      return NextResponse.json("Address is required", { status: 400 });
    }

    const existingUser = await db.wallet.findFirst({
      where: {
        address,
      },
      select: {
        profile: {
          select: {
            id: true,
            name: true,
            token: true,
            image: true,
          },
        },
      },
    });

    if (existingUser) {
      return NextResponse.json(existingUser);
    }

    return NextResponse.json({});
  } catch (error) {
    console.log("[USER_LOGIN] ", error);
    return NextResponse.json("Internal error", { status: 500 });
  }
}
