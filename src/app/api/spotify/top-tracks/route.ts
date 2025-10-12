import { NextRequest, NextResponse } from "next/server";
import { spotifyService } from "../../../../services/spotifyService";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "5");

    const topTracks = await spotifyService.getTopTracks(limit);

    return NextResponse.json({
      success: true,
      data: topTracks,
    });
  } catch (error) {
    console.error("Error in top-tracks API:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch top tracks",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
