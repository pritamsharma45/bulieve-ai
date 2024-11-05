import { CreatePostCard } from "../components/CreatePostCard";
import { JoinCommunityButton } from "../components/JoinCommunityButton";
import Pagination from "@/app/components/Pagination";
import { PostCard } from "@/app/components/PostCard";
import { SubDescriptionForm } from "@/app/components/SubDescriptionForm";
import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Cake, FileQuestion } from "lucide-react";
import { joinCommunity } from "@/app/actions";
import Image from "next/image";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";

async function getData(slug: string, searchParam: string) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  noStore();
  console.log("searchParam",searchParam);
  const [count, data, membership,community] = await prisma.$transaction([
    prisma.post.count({
      where: {
        communitySlug: slug,
      },
    }),

    prisma.post.findMany({
      where: {
        communitySlug: slug,
      },
      take: 10,
      skip: searchParam ? (parseInt(searchParam, 10) - 1) * 10 : 0,
      select: {
        title: true,
        createdAt: true,
        textContent: true,
        id: true,
        imageString: true,
        Comment: {
          select: {
            id: true,
          },
        },
        User: {
          select: {
            userName: true,
          },
        },
        subName: true,
        communitySlug: true,
        Like: {
          select: {
            userId: true,
            likeType: true,
            postId: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),

    // Membership check for the current user
    prisma.membership.findFirst({
      where: {
        community: {
          slug: slug,
        },
        userId: user?.id || undefined, // Only if userId is provided
      },
      select: {
        id: true,
      },
    }),
    // Find community with communitySlug
    prisma.community.findFirst({
      where: {
        slug: slug,
      },
      select: {
        id: true,
        name: true,
        description: true,
        slug: true,
      },
    }),
  ]);

  return { count, data, isMember: !!membership,community };
}

export default async function StockArenaRoute({
  params,
  searchParams
}: {
  params: { id: string };
  searchParams: { page?: string };
}) {
  console.log(params);

  const page = searchParams.page || "1";

  const { count, data,isMember,community } = await getData(params.id, page);

  return (
    <div className="container mx-auto p-4">
  {/* Themed Banner */}
  <div className="w-3/4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-8 text-center mb-6 shadow-lg">
  <h1 className="text-4xl font-bold text-white">Stock Arena</h1>
    <p className="text-2xl text-purple-100">{community?.name}</p>
    <p className="text-xs text-purple-100">{community?.description}</p>
  </div>

  {/* Create Post Card */}
  <div className="flex items-center justify-between w-3/4 mb-4">
    <div className="w-3/4 mr-4">
      <CreatePostCard communitySlug={params.id} />
    </div>
    {
      isMember ? (
        <div className="w-1/4">
          <div className="p-2 bg-green-300 rounded-md">Joined ✔️</div>
        </div>
      ):(
        <div className="w-1/4">
            <form action={joinCommunity}>
                    <input type="hidden" name="communitySlug" value={params.id} />
                    <Button
                      type="submit"
                      className={`flex items-center gap-x-1 transition duration-300 ease-in-out transform`}
                    >
                      Join Community
                    </Button>
            </form>
            </div>
      )
    }
  </div>
  {/* Post Feed */}
  <div className="w-3/4">
    {data.map((post) => (
      <div className=" mb-4">
         <PostCard
        id={post.id}
        imageString={post.imageString}
        jsonContent={post.textContent}
        title={post.title}
        key={post.id}
        commentAmount={post.Comment.length}
        userName={post.User?.userName as string}
        likeCount={post.Like.reduce((acc, like) => like.likeType === "LIKE" ? acc + 1 : acc, 0)}
        
      />
      </div>
     
    ))}
  </div>

  {/* Pagination */}
  <div className="mt-8 flex justify-center">
    <Pagination totalPages={Math.ceil(count / 10)} />
  </div>
</div>

  );
}


