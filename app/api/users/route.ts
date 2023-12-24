import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { signature, address, name } = await req.json();

    if (!signature || !address || !name) {
      return new Response("Invalid request", { status: 400 });
    }
    const user = await db.user.create({
      data: {
        name,
        signature,
        wallets: {
          create: {
            address,
            chains: {
              create: {
                name: "ETH",
              },
            },
          },
        },
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[USER_CREATION] ", error);
    return NextResponse.json("Internal error", { status: 500 });
  }
}
