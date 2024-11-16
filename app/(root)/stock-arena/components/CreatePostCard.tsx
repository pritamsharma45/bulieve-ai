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
    <Card className="px-2 py-2 flex items-center gap-x-2">
      <Link href={createURL} className="w-full">
        <Input placeholder="Create your post" className="text-xs" />
      </Link>

      <div className="flex items-center gap-x-2">
        <Button variant="outline" size="icon" asChild>
          <Link href={createURL}>
            <ImageDown className="w-4 h-4" />
          </Link>
        </Button>

        <Button variant="outline" size="icon">
          <Link href={createURL}>
            <Link2 className="w-4 h-4" />
          </Link>
        </Button>
        <Button asChild className="text-xs" >
                <Link href="/stock-arena/create-community">Create Community</Link>
        </Button>
      </div>
    </Card>
  );
}
