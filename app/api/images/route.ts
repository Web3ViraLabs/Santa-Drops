import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const imageUrl = req.nextUrl.searchParams.get("url");

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Image URL not provided" },
        { status: 400 }
      );
    }

    const response = await fetch(imageUrl);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch image" },
        { status: 500 }
      );
    }

    const contentType = response.headers.get("content-type");

    if (!contentType) {
      return NextResponse.json(
        { error: "Failed to fetch image" },
        { status: 500 }
      );
    }

    const buffer = await response.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
      },
      status: 200,
      statusText: "OK",
    });
  } catch (error) {
    console.log("[IMAGE_FETCH] -> /api/images", error);
    return NextResponse.json(
      { error: "Failed to fetch image" },
      { status: 500 }
    );
  }
}
