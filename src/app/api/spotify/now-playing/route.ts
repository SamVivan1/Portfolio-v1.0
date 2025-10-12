import { NextRequest, NextResponse } from "next/server";
import { spotifyService } from "../../../../services/spotifyService";

export async function GET() {
  try {
    const currentlyPlaying = await spotifyService.getCurrentlyPlaying();

    if (currentlyPlaying && currentlyPlaying.item) {
      return NextResponse.json({
        success: true,
        data: currentlyPlaying,
      });
    }

    // If nothing is currently playing, get a top track as fallback
    const topTracks = await spotifyService.getTopTracks(1);

    if (topTracks.length > 0) {
      return NextResponse.json({
        success: true,
        data: {
          is_playing: false,
          item: topTracks[0],
          progress_ms: 0,
        },
      });
    }

    // If no top tracks available, try recently played
    const recentlyPlayed = await spotifyService.getRecentlyPlayed(1);

    if (recentlyPlayed.length > 0) {
      return NextResponse.json({
        success: true,
        data: {
          is_playing: false,
          item: recentlyPlayed[0],
          progress_ms: 0,
        },
      });
    }

    return NextResponse.json({
      success: false,
      message: "No music data available",
    });
  } catch (error) {
    console.error("Error in now-playing API:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch music data",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
