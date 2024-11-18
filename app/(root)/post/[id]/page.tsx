/* eslint-disable @next/next/no-img-element */
import { handleVote } from "@/app/actions";
import { CommentForm } from "@/app/components/CommentForm";
import { CopyLink } from "@/app/components/CopyLink";
import { RenderToJson } from "@/app/components/RendertoJson";
import { DownVote, UpVote } from "@/app/components/SubmitButtons";
import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Cake,ThumbsUp, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import BackButton from "@/app/components/BackButton";
import { handleLike } from "@/app/actions";


async function getData(id: string) {
  noStore();
  const data = await prisma.post.findUnique({
    where: {
      id: id,
    },
    select: {
      createdAt: true,
      title: true,
      imageString: true,
      textContent: true,
      subName: true,
      id: true,
      Vote: {
        select: {
          voteType: true,
        },
      },
      Comment: {
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          text: true,
          User: {
            select: {
              imageUrl: true,
              userName: true,
            },
          },
        },
      },
      Subreddit: {
        select: {
          name: true,
          createdAt: true,
          description: true,
        },
      },
      User: {
        select: {
          userName: true,
        },
      },
      Like: {
        select: {
          userId: true,
          likeType: true,
          postId: true,
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const data = await getData(params.id);
  const postID = params.id;
  const likeCount = data.Like.reduce((acc, like) => {
    if (like.likeType === "LIKE") return acc + 1;
    return acc;
  }, 0)

  return (
<div>

<Link href="/">
    <BackButton />
</Link>
    <div className="max-w-[1200px] mx-auto flex gap-x-10 mt-4 mb-10">

      <div className="w-[70%] flex flex-col gap-y-5">
        <Card className="p-2 flex">
          {/* <div className="flex flex-col  items-center  gap-y-2  p-2">
            <form action={handleVote}>
              <input type="hidden" name="voteDirection" value="UP" />
              <input type="hidden" name="postId" value={data.id} />
              <UpVote />
            </form>
            {data.Vote.reduce((acc, vote) => {
              if (vote.voteType === "UP") return acc + 1;
              if (vote.voteType === "DOWN") return acc - 1;

              return acc;
            }, 0)}
            <form action={handleVote}>
              <input type="hidden" name="voteDirection" value="DOWN" />
              <input type="hidden" name="postId" value={data.id} />
              <DownVote />
            </form>
          </div> */}

          <div className="p-2 w-full">
            <p className="text-xs text-muted-foreground">
              Posted by u/{data.User?.userName}
            </p>

            <h1 className="font-medium mt-1 text-lg">{data.title}</h1>

            {data.imageString && (
              <Image
                src={data.imageString}
                alt="User Image"
                width={500}
                height={400}
                className="w-full h-auto object-contain mt-2"
              />
            )}

            {data.textContent && <RenderToJson data={data.textContent} />}

            <div className="flex gap-x-5 items-center mt-3">
              <div className="flex items-center gap-x-1">
              <form action={handleLike}>
            <input type="hidden" name="likeDirection" value="LIKE" />
            <input type="hidden" name="postId" value={postID} />
            <Button variant="ghost" type="submit" className="flex items-center gap-x-1">
              <ThumbsUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground font-medium text-xs">
                {likeCount}
              </span>
            </Button>
          </form>
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
                <p className="text-muted-foreground font-medium text-xs">
                  {data.Comment.length} Comments
                </p>
              </div>

              <CopyLink id={params.id} />
            </div>

            <CommentForm postId={params.id} />

            <Separator className="my-5" />

            <div className="flex flex-col gap-y-7">
              {data.Comment.map((item) => (
                <div key={item.id} className="flex flex-col">
                  <div className="flex items-center gap-x-3">
                    <img
                      src={
                        item.User?.imageUrl
                          ? item.User.imageUrl
                          : "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                      }
                      className="w-7 h-7 rounded-full"
                      alt="Avatar of user"
                    />

                    <h3 className="text-sm font-medium">
                      {item.User?.userName}
                    </h3>
                  </div>

                  <p className="ml-10 text-secondary-foreground text-sm tracking-wide">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
</div>
  );
}
