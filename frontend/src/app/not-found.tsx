import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-void px-6 text-center text-cream">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber">
        SIGNAL LOST
      </p>
      <h1 className="font-pixel text-6xl leading-none text-teal">404</h1>
      <p className="max-w-md text-sm leading-relaxed text-muted">
        This room is not on the map. The desk is still where you left it.
      </p>
      <Link href="/" className="pixel-button pixel-button--primary">
        Back to the desk
      </Link>
    </div>
  );
}
