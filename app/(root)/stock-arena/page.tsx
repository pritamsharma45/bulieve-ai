import { Card } from "@/components/ui/card";
import Image from "next/image";
import Banner from "@/public/banner.png";
import HelloImage from "@/public/hero-image.png";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CreatePostCard } from "./components/CreatePostCard";
import prisma from "@/app/lib/db";
import { PostCard } from "@/app/components/PostCard";
import { Suspense } from "react";
import { SuspenseCard } from "@/app/components/SuspenseCard";
import Pagination from "@/app/components/Pagination";
import { unstable_noStore as noStore } from "next/cache";
import { Input } from "@/components/ui/input";

// model Community {
//   id          String   @id @default(uuid())
//   name        String   @unique
//   slug        String   @unique
//   description String?
//   createdAt   DateTime @default(now())
//   updatedAt   DateTime @updatedAt
//   User        User?    @relation(fields: [userId], references: [id])
//   userId      String?
//   posts       Post[]
// }

// model Post {
//   id          String  @id @default(uuid())
//   title       String
//   textContent Json?
//   imageString String?

//   Vote    Vote[]
//   Comment Comment[]

//   createdAt     DateTime   @default(now())
//   updatedAt     DateTime   @updatedAt
//   Subreddit     Subreddit? @relation(fields: [subName], references: [name])
//   subName       String?
//   User          User?      @relation(fields: [userId], references: [id])
//   userId        String?
//   Communities   Community? @relation(fields: [communitySlug], references: [slug])
//   communitySlug String?
// }

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
        communitySlug: true,
        Vote: {
          select: {
            userId: true,
            voteType: true,
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

async function getCommunites(){
  // get fake list  communites
  const data = await prisma.community.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      slug: true,
    },
  });
  return data;
}


export default function Home({
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
      <div className="w-[35%] flex flex-col">
        <Card>
          <Image src={Banner} alt="Banner" />
          <div className="p-2">
            <div className="flex items-center">
              <Image
                src={HelloImage}
                alt="Hello Image"
                className="w-10 h-16 -mt-6"
              />
              <h1 className="font-medium pl-3">Home</h1>
            </div>
            <p className="text-sm text-muted-foreground pt-2">
              Your Home Stock Arena frontpage. Come here to check in with your
              favorite communites!
            </p>
            <Separator className="my-5" />

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
        <Card className="mt-2">
        <Suspense fallback={<SuspenseCard />}>
          <ShowCommunities />
        </Suspense>
        </Card>
      </div>

    </div>
  );
}

async function ShowItems({ searchParams }: { searchParams: { page: string } }) {
  const { count, data } = await getData(searchParams.page);
  return (
    <>
      {data.map((post) => (
        <PostCard
          id={post.id}
          imageString={post.imageString}
          jsonContent={post.textContent}
          title={post.title}
          key={post.id}
          commentAmount={post.Comment.length}
          userName={post.User?.userName as string}
          voteCount={post.Vote.reduce((acc, vote) => {
            if (vote.voteType === "UP") return acc + 1;
            if (vote.voteType === "DOWN") return acc - 1;
            return acc;
          }, 0)}
        />
      ))}

      <Pagination totalPages={Math.ceil(count / 10)} />
    </>
  );
}

async function ShowCommunities (){
  const communities = await getCommunites();
  return (
    <div className="p-4">
      <h1 style={{ fontWeight: 'bold' }}>Communities</h1>
      {/* add search bar and add button in a single row */}
      <div className="flex justify-between my-4">
        <Input type="text" placeholder="Search Communities" />
        <Button className="bg-primary text-white px-2 py-1 ml-1 rounded">Search</Button>
      </div>
      <ul>
        {communities.map((community) => (
          <li key={community.id}>
            <Link href={`stock-arena/${community.slug}`}>
              {community.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}