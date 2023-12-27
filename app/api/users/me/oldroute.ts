import { db } from "@/lib/db";
import { logTimeAndData } from "@/lib/log-time";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const startTime = new Date();
    const token = req.headers.get("Authorization");

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findFirst({
      where: {
        token,
      },
    });

    if (user) {
      logTimeAndData({
        label: "/api/users/me GET",
        startTime,
        data: user,
      });
      return NextResponse.json({
        id: user.id,
        name: user.name,
        image: user.image,
        createdAt: user.createdAt,
      });
    }

    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  } catch (error) {
    console.log("[USER_FETCH] ", error);
  }
}
