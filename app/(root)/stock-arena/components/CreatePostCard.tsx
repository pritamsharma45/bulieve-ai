import { Card } from "@/components/ui/card";
import Image from "next/image";
import pfp from "@/public/pfp.png";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ImageDown, Link2 } from "lucide-react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function CreatePostCard({ communitySlug }: { communitySlug?: string }) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  console.log("User in Creat Post:", user);
  let  createURL = user ? `/stock-arena/u/${user.id}/create` : "/api/auth/login";
  if(communitySlug) {
    createURL =`/stock-arena/${communitySlug}/create`
  }


  return (
    <Card className="px-2 py-2 flex justify-between gap-x-2">
      <Button asChild className="text-xs w-1/2" >
          <Link href={createURL}>
            Create Post
          </Link>
        </Button>
        <Button asChild className="text-xs w-1/2" >
                <Link href="/stock-arena/create-community">Create Community</Link>
        </Button>
    </Card>
  );
}
