import { ReactNode } from "react";
import clsx from "clsx";

type Tone = "violet" | "teal" | "amber" | "green" | "pink" | "muted";

export default function PixelChip({
  children,
  tone = "violet",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span className={clsx("pixel-chip", `pixel-chip--${tone}`, className)}>
      {children}
    </span>
  );
}
