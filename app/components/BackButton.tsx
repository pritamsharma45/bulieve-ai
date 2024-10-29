"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <span
      onClick={() => router.back()} // Navigate to the previous route
      className="text-xs bg-gray-500 px-2 py-1 rounded-sm cursor-pointer"
    >
      Back
    </span>
  );
}
