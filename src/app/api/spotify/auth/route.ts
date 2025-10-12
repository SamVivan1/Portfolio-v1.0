import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: "Authorization failed",
          error: error,
        },
        { status: 400 }
      );
    }

    if (!code) {
      return NextResponse.json(
        {
          success: false,
          message: "No authorization code provided",
        },
        { status: 400 }
      );
    }

    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return NextResponse.json(
        {
          success: false,
          message: "Spotify credentials not configured",
        },
        { status: 500 }
      );
    }

    // Exchange authorization code for tokens
    const tokenResponse = await fetch(
      "https://accounts.spotify.com/api/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(
            `${clientId}:${clientSecret}`
          ).toString("base64")}`,
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code: code,
          redirect_uri: `${request.nextUrl.origin}/api/spotify/auth`,
        }),
      }
    );

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      return NextResponse.json(
        {
          success: false,
          message: "Failed to exchange code for tokens",
          error: errorData,
        },
        { status: 400 }
      );
    }

    const tokenData = await tokenResponse.json();

    return NextResponse.json({
      success: true,
      message: "Authorization successful!",
      data: {
        access_token: tokenData.access_token,
        refresh_token: tokenData.refresh_token,
        expires_in: tokenData.expires_in,
      },
      instructions: {
        step1: "Copy the refresh_token from the data above",
        step2: "Add it to your .env.local file as SPOTIFY_REFRESH_TOKEN",
        step3: "Restart your development server",
        step4: "The Spotify player should now work!",
      },
    });
  } catch (error) {
    console.error("Error in auth API:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Authentication failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
