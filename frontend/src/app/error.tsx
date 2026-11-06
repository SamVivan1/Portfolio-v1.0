"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center text-white bg-[#050505]">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="text-gray-400 max-w-md">
        An unexpected error occurred. You can try again or reload the page.
      </p>
      <button
        onClick={reset}
        className="px-5 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 transition-colors font-semibold"
      >
        Try again
      </button>
    </div>
  );
}