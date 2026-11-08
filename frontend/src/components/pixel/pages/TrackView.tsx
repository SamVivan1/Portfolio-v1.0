"use client";

import { useEffect } from "react";
import { track } from "../../../lib/analytics";

interface TrackViewProps {
  event: string;
  slug?: string;
}

/** Fire one analytics event when a server-rendered page mounts. */
export default function TrackView({ event, slug }: TrackViewProps) {
  useEffect(() => {
    track(event, slug ? { slug } : undefined);
  }, [event, slug]);

  return null;
}
