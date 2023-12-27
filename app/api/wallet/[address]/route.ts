import { db } from "@/lib/db";
import { logTimeAndData } from "@/lib/log-time";
import { NextResponse } from "next/server";

interface WalletProps {
  address: string;
}

export async function GET(req: Request, { params }: { params: WalletProps }) {
  try {
    const { address } = params;

    if (!address) {
      return NextResponse.json("Wallet ID is required", { status: 400 });
    }

    const wallet = await db.wallet.findFirst({
      where: {
        address: address,
      },
    });

    if (!wallet) {
      return NextResponse.json("Wallet not found", { status: 404 });
    }

    logTimeAndData({
      label: "/api/wallet/[walletId] GET",
      startTime: new Date(),
      data: wallet,
    });
    return NextResponse.json(wallet);
  } catch (error) {
    console.log("[WALLET_FETCH] ", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
