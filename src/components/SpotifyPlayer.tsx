"use client";

import { useEffect, useState } from "react";
import { FaVolumeMute, FaVolumeUp, FaMusic, FaSpotify } from "react-icons/fa";
import Image from "next/image";
import usePersistentState from "../hooks/usePersistentState";

interface SpotifyTrack {
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
}

interface SpotifyData {
  is_playing: boolean;
  item: SpotifyTrack | null;
  progress_ms: number;
}

export default function SpotifyPlayer() {
  const [isMuted, setIsMuted] = usePersistentState("spotify-muted", false);
  const [spotifyData, setSpotifyData] = useState<SpotifyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSpotifyData = async () => {
    try {
      const response = await fetch("/api/spotify/now-playing");
      const result = await response.json();

      if (result.success) {
        setSpotifyData(result.data);
        setError(null);
      } else {
        setError(result.message || "Failed to fetch music data");
      }
    } catch (err) {
      setError("Network error");
      console.error("Error fetching Spotify data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSpotifyData();

    // Poll every 30 seconds for updates
    const interval = setInterval(fetchSpotifyData, 30000);

    return () => clearInterval(interval);
  }, []);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const getAlbumArt = () => {
    if (!spotifyData?.item?.album?.images?.length) return null;

    // Get the smallest image that's at least 64x64
    const images = spotifyData.item.album.images
      .filter((img) => img.height >= 64)
      .sort((a, b) => a.height - b.height);

    return images[0]?.url || spotifyData.item.album.images[0]?.url;
  };

  const getArtistNames = () => {
    if (!spotifyData?.item?.artists?.length) return "Unknown Artist";
    return spotifyData.item.artists.map((artist) => artist.name).join(", ");
  };

  const getTrackTitle = () => {
    return spotifyData?.item?.name || "No track";
  };

  const isCurrentlyPlaying = () => {
    return spotifyData?.is_playing || false;
  };

  if (isLoading) {
    return (
      <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-4 rounded-2xl shadow-lg transition-all duration-300 min-w-[280px]">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full animate-pulse flex items-center justify-center">
            <FaMusic className="text-purple-300" />
          </div>
          <div className="flex-1">
            <div className="h-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded animate-pulse mb-2"></div>
            <div className="h-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded animate-pulse w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 backdrop-blur-md border border-red-500/20 text-white p-4 rounded-2xl shadow-lg transition-all duration-300 min-w-[280px]">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-red-500/30 to-red-600/30 rounded-full flex items-center justify-center">
            <FaMusic className="text-red-300" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium">Music unavailable</div>
            <div className="text-xs text-red-300">Check Spotify setup</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-purple-400/30 text-white p-4 rounded-2xl shadow-lg transition-all duration-300 min-w-[280px] group hover:shadow-purple-500/20">
      <div className="flex items-center space-x-3">
        {/* Album Art */}
        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          {getAlbumArt() ? (
            <Image
              src={getAlbumArt()!}
              alt="Album cover"
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-500/80 to-pink-500/80 flex items-center justify-center">
              <FaMusic className="text-white text-lg" />
            </div>
          )}

          {/* Playing indicator */}
          {isCurrentlyPlaying() && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          )}
        </div>

        {/* Track Info */}
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium truncate group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
            {getTrackTitle()}
          </div>
          <div className="text-xs text-gray-300 group-hover:text-gray-200 truncate transition-colors">
            by {getArtistNames()}
          </div>
          {!isCurrentlyPlaying() && (
            <div className="text-xs text-gray-400 group-hover:text-purple-300 italic transition-colors">
              Top track
            </div>
          )}
        </div>

        {/* Spotify Link */}
        {spotifyData?.item?.external_urls?.spotify && (
          <a
            href={spotifyData.item.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-0 group-hover:opacity-100 transition-all duration-200 hover:text-green-400 hover:scale-110"
            title="Open in Spotify"
          >
            <FaSpotify className="text-lg" />
          </a>
        )}

        {/* Mute Button */}
        <button
          onClick={toggleMute}
          className="opacity-0 group-hover:opacity-100 transition-all duration-200 hover:text-purple-300 hover:scale-110"
          title={isMuted ? "Show music info" : "Hide music info"}
        >
          {isMuted ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
        </button>
      </div>

      {/* Progress bar for currently playing */}
      {isCurrentlyPlaying() && spotifyData?.item && (
        <div className="mt-3 w-full bg-white/10 rounded-full h-1 overflow-hidden">
          <div
            className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 h-1 rounded-full transition-all duration-1000 shadow-lg"
            style={{
              width: `${
                (spotifyData.progress_ms / spotifyData.item.duration_ms) * 100
              }%`,
            }}
          ></div>
        </div>
      )}
    </div>
  );
}
