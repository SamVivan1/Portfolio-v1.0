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

    // Determine redirect URI to use for the token exchange.
    // Prefer an explicit SPOTIFY_REDIRECT_URI environment variable (useful
    // when the app is deployed behind a proxy or served from a different
    // origin). Fall back to the route's origin + path used previously.
    const configuredRedirect = process.env.SPOTIFY_REDIRECT_URI;
    const computedRedirect = `${request.nextUrl.origin}/api/spotify/auth`;
    const redirectUriToUse = configuredRedirect || computedRedirect;

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
          redirect_uri: redirectUriToUse,
        }),
      }
    );

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      // Include redirect info to make debugging invalid_redirect_uri easier
      return NextResponse.json(
        {
          success: false,
          message: "Failed to exchange code for tokens",
          used_redirect_uri: redirectUriToUse,
          configured_redirect_uri: configuredRedirect || null,
          computed_redirect_uri: computedRedirect,
          error: errorData,
        },
        { status: 400 }
      );
    }

    const tokenData = await tokenResponse.json();

    return NextResponse.json({
      success: true,
      message: "Authorization successful!",
      used_redirect_uri: redirectUriToUse,
      data: {
        access_token: tokenData.access_token,
        refresh_token: tokenData.refresh_token,
        expires_in: tokenData.expires_in,
      },
      instructions: {
        step1: "Copy the refresh_token from the data above",
        step2: "Add it to your .env.local file as SPOTIFY_REFRESH_TOKEN",
        step3:
          "If you hit 'Invalid redirect URI' set SPOTIFY_REDIRECT_URI in .env.local to the exact redirect URI registered in your Spotify app",
        step4: "Restart your development server",
        step5: "The Spotify player should now work!",
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
