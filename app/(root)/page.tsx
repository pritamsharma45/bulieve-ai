import { Card } from "@/components/ui/card";
import Image from "next/image";
import Banner from "@/public/banner.png";
import HelloImage from "@/public/hero-image.png";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CreatePostCard } from "@/app/components/CreatePostCard";
import prisma from "@/app/lib/db";
import { PostCard } from "@/app/components/PostCard";
import { Suspense } from "react";
import { SuspenseCard } from "@/app/components/SuspenseCard";
import Pagination from "@/app/components/Pagination";
import { unstable_noStore as noStore } from "next/cache";

async function getData(searchParam: string) {
  noStore();
  const [count, data] = await prisma.$transaction([
    prisma.post.count(),
    prisma.post.findMany({
      take: 10,
      skip: searchParam ? (Number(searchParam) - 1) * 10 : 0,
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
  ]);

  return { data, count };
}

export default async function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {

  return (
    <div className="max-w-[1000px] mx-auto flex gap-x-10 mt-4 mb-10">
      <div className="w-[65%] flex flex-col gap-y-5">
        <CreatePostCard />
        <Suspense fallback={<SuspenseCard />} key={searchParams.page}>
          <ShowItems searchParams={searchParams} />
        </Suspense>
      </div>
      <div className="w-[35%]">
        <Card>
          <Image src={Banner} alt="Banner" />
          <div className="p-2">
        
            <div className="flex flex-col gap-y-3">
              <Button asChild variant="secondary">
                <Link href="/stock-arena/create-post">Create Post</Link>
              </Button>
              <Button asChild>
                <Link href="/stock-arena/create-community">Create Community</Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

async function ShowItems({ searchParams }: { searchParams: { page: string } }) {
  const { count, data } = await getData(searchParams.page);
  return (
    <>
      {data?.map((post) => (
        <PostCard
          id={post.id}
          imageString={post.imageString}
          jsonContent={post.textContent}
          title={post.title}
          key={post.id}
          commentAmount={post.Comment.length}
          userName={post.User?.userName as string}
          likeCount={post.Like.reduce((acc, like) => {
            if (like.likeType === "LIKE") return acc + 1;
            return acc;
          }, 0)}
        />
      ))}

      <Pagination totalPages={Math.ceil(count / 10)} />
    </>
  );
}
