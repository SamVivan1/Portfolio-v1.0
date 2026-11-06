import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center text-white bg-[#050505]">
      <h1 className="text-6xl font-black text-accent">404</h1>
      <p className="text-gray-400 max-w-md">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-5 py-2.5 rounded-full bg-accent-deep hover:bg-accent transition-colors font-semibold"
      >
        Go home
      </Link>
    </div>
  );
}