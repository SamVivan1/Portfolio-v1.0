"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { profile } from "../../../data/portfolio";
import { track } from "../../../lib/analytics";
import PixelButton from "../ui/PixelButton";

/** Copies the email address; false means the clipboard refused (callers fall back to mailto). */
export async function copyEmail(): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(profile.email);
    track("email_copy");
    return true;
  } catch {
    return false;
  }
}

export default function CopyEmailButton({
  label = "Copy email",
  size = "sm",
}: {
  label?: string;
  size?: "sm" | "md";
}) {
  const [copied, setCopied] = useState(false);
  const iconSize = size === "sm" ? 14 : 15;

  const copy = async () => {
    if (!(await copyEmail())) {
      window.location.href = `mailto:${profile.email}`;
      return;
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <PixelButton
      onClick={copy}
      variant="ghost"
      size={size}
      icon={
        copied ? (
          <Check size={iconSize} aria-hidden="true" />
        ) : (
          <Copy size={iconSize} aria-hidden="true" />
        )
      }
      aria-label={copied ? "Email copied" : "Copy email address"}
    >
      {copied ? "Copied" : label}
    </PixelButton>
  );
}
