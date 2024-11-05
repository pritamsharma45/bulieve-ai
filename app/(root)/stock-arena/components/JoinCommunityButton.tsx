// JoinCommunityButton.tsx
"use client";

import React from "react";
import { useFormStatus } from "react-dom"; // Use if experimental

interface JoinCommunityButtonProps {
  communitySlug: string;
  joinedStatus: boolean;
}

export const JoinCommunityButton: React.FC<JoinCommunityButtonProps> = ({
  communitySlug,
  joinedStatus,
}) => {
  // Action function to handle the join operation
  async function handleJoinCommunity(formData: FormData) {
    const slug = formData.get("communitySlug") as string;
    
    // Your join logic goes here (like an API call)
    console.log(`Joining community with slug: ${slug}`);
  }

  return (
    <form action={handleJoinCommunity}>
      <input type="hidden" name="communitySlug" value={communitySlug} />
      <button
        type="submit"
        disabled={joinedStatus}
        className={`px-4 py-2 rounded ${
          joinedStatus ? "bg-green-500" : "bg-blue-500"
        } text-white font-semibold`}
      >
        {joinedStatus ? "Joined ✔️" : "Join Community ➕"}
      </button>
    </form>
  );
};

