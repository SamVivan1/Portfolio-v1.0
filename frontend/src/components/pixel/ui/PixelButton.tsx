import { ReactNode } from "react";
import clsx from "clsx";

type Variant = "primary" | "ghost" | "quiet";
type Size = "sm" | "md";

interface PixelButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  className?: string;
  type?: "button" | "submit";
  target?: string;
  rel?: string;
  download?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  "aria-label"?: string;
  title?: string;
}

export default function PixelButton({
  children,
  href,
  onClick,
  variant = "ghost",
  size = "md",
  className,
  type = "button",
  target,
  rel,
  download,
  disabled,
  icon,
  ...aria
}: PixelButtonProps) {
  const classes = clsx(
    "pixel-button",
    `pixel-button--${variant}`,
    `pixel-button--${size}`,
    className
  );

  const content = (
    <>
      {icon ? <span className="pixel-button__icon">{icon}</span> : null}
      <span>{children}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target={target}
        rel={rel}
        download={download}
        onClick={onClick}
        aria-label={aria["aria-label"]}
        title={aria.title}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={aria["aria-label"]}
      title={aria.title}
    >
      {content}
    </button>
  );
}
