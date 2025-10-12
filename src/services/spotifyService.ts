// Spotify API service layer
export interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{
    id: string;
    name: string;
  }>;
  album: {
    id: string;
    name: string;
    images: Array<{
      url: string;
      height: number;
      width: number;
    }>;
  };
  external_urls: {
    spotify: string;
  };
  duration_ms: number;
  is_playing?: boolean;
  progress_ms?: number;
}

export interface SpotifyCurrentlyPlaying {
  is_playing: boolean;
  item: SpotifyTrack | null;
  progress_ms: number;
}

export interface SpotifyTopTracks {
  items: SpotifyTrack[];
}

class SpotifyService {
  private clientId: string;
  private clientSecret: string;
  private refreshToken: string;

  constructor() {
    this.clientId = process.env.SPOTIFY_CLIENT_ID || "";
    this.clientSecret = process.env.SPOTIFY_CLIENT_SECRET || "";
    this.refreshToken = process.env.SPOTIFY_REFRESH_TOKEN || "";
  }

  private async getAccessToken(): Promise<string> {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${this.clientId}:${this.clientSecret}`
        ).toString("base64")}`,
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: this.refreshToken,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to get access token: ${response.statusText}`);
    }

    const data = await response.json();
    return data.access_token;
  }

  async getCurrentlyPlaying(): Promise<SpotifyCurrentlyPlaying | null> {
    try {
      const accessToken = await this.getAccessToken();

      const response = await fetch(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 204) {
        // No content - nothing is currently playing
        return null;
      }

      if (!response.ok) {
        throw new Error(
          `Failed to get currently playing: ${response.statusText}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching currently playing track:", error);
      return null;
    }
  }

  async getTopTracks(limit: number = 1): Promise<SpotifyTrack[]> {
    try {
      const accessToken = await this.getAccessToken();

      const response = await fetch(
        `https://api.spotify.com/v1/me/top/tracks?limit=${limit}&time_range=short_term`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to get top tracks: ${response.statusText}`);
      }

      const data: SpotifyTopTracks = await response.json();
      return data.items;
    } catch (error) {
      console.error("Error fetching top tracks:", error);
      return [];
    }
  }

  async getRecentlyPlayed(limit: number = 1): Promise<SpotifyTrack[]> {
    try {
      const accessToken = await this.getAccessToken();

      const response = await fetch(
        `https://api.spotify.com/v1/me/player/recently-played?limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to get recently played: ${response.statusText}`
        );
      }

      const data = await response.json();
      return data.items.map((item: any) => item.track);
    } catch (error) {
      console.error("Error fetching recently played tracks:", error);
      return [];
    }
  }
}

export const spotifyService = new SpotifyService();
