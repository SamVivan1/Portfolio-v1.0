"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { profile } from "../../../data/portfolio";
import { track } from "../../../lib/analytics";
import PixelButton from "../ui/PixelButton";

export default function CopyEmailButton({
  label = "Copy email",
}: {
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      track("email_copy");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <PixelButton
      onClick={copy}
      variant="ghost"
      size="sm"
      icon={
        copied ? (
          <Check size={14} aria-hidden="true" />
        ) : (
          <Copy size={14} aria-hidden="true" />
        )
      }
    >
      {copied ? "Copied" : label}
    </PixelButton>
  );
}
