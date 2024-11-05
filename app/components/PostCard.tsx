import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThumbsUp, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CopyLink } from "./CopyLink";
import { handleLike } from "../actions";

interface iAppProps {
  title: string;
  jsonContent: any;
  id: string;
  userName: string;
  imageString: string | null;
  likeCount: number;
  commentAmount: number;
}

export function PostCard({
  id,
  imageString,
  jsonContent,
  title,
  userName,
  likeCount,
  commentAmount,
}: iAppProps) {
  return (
    <Card className="flex relative overflow-hidden">
      <div className="flex-1">
        <div className="flex items-center gap-x-2 p-2">
          <p className="text-xs text-muted-foreground">
            Posted by: <span className="hover:text-primary">u/{userName}</span>
          </p>
        </div>

        <div className="px-2">
          <Link href={`/post/${id}`}>
            <h1 className="font-medium mt-1 text-lg">{title}</h1>
          </Link>
        </div>

        <div className="max-h-[300px] overflow-hidden">
          {imageString && (
            <Image
              src={imageString}
              alt="Post Image"
              width={600}
              height={300}
              className="w-full h-full"
            />
          )}
        </div> 

        <div className="m-3 flex items-center gap-x-5">
          {/* Like button and badge */}
          <form action={handleLike}>
            <input type="hidden" name="likeDirection" value="LIKE" />
            <input type="hidden" name="postId" value={id} />
            <Button variant="ghost" type="submit" className="flex items-center gap-x-1">
              <ThumbsUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground font-medium text-xs">
                {likeCount}
              </span>
            </Button>
          </form>

          {/* Comments and share icon */}
          <div className="flex items-center gap-x-5">
            <div className="flex items-center gap-x-1">
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
              <p className="text-muted-foreground font-medium text-xs">
                {commentAmount} Comments
              </p>
            </div>
            <CopyLink id={id} />
          </div>
        </div>
      </div>
    </Card>
  );
}
