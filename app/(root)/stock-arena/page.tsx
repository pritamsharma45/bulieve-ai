import { Card } from "@/components/ui/card";
import Image from "next/image";
import Banner from "@/public/banner.png";
import HelloImage from "@/public/bulieve-logo.jpeg";
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
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { joinCommunity } from "@/app/actions";
// model Membership {
//   id          String   @id @default(uuid())
//   userId      String
//   communityId String
//   createdAt   DateTime @default(now())

//   user      User      @relation(fields: [userId], references: [id])
//   community Community @relation(fields: [communityId], references: [id])

//   @@unique([userId, communityId]) // Ensure unique user-community pairs
// }

async function getData(searchParam: string) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  noStore();
  const [count, data,community] = await prisma.$transaction([
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
    // Get all the communities the user is a member of to display in the sidebar
    prisma.membership.findMany({
      where: {
        userId: user.id,
      },
      select: {
        community:{
          select: {
            id: true,
            name: true,
            slug: true,
          }
        }
      },
    }),
  ]);
  return { data, count,community };
}

async function getCommunites(){
  const data = await prisma.community.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      slug: true,
      Membership: {
        select: {
          userId: true,
        },
      },
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
        <div className="flex flex-col">
        <CreatePostCard />
        </div>
       
        <Suspense fallback={<SuspenseCard />} key={searchParams.page}>
          <ShowItems searchParams={searchParams} />
        </Suspense>
      </div>
      <div className="w-[35%] flex flex-col">
        {/* <Card>
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
        </Card> */}
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

async function ShowCommunities (){
  const communities = await getCommunites();
  const { getUser } = getKindeServerSession();
const user = await getUser();
  return (
    <div className="p-4">
      <h1 style={{ fontWeight: 'bold' }}>Communities</h1>
      {/* add search bar and add button in a single row */}
      <div className="flex justify-between my-4">
        <Input type="text" placeholder="Search Communities" />
        <Button className="bg-primary text-white px-2 py-1 ml-1 rounded">Search</Button>
      </div>

<ul className="flex flex-wrap gap-4">

  {communities.map((community) => {
    const isMember = community.Membership.some(
      (member) => member.userId === user?.id
    );

    return (
      <li
        key={community.id}
        className="px-4 py-1 bg-teal-100 text-blue-800 rounded-full flex justify-between gap-4 w-72"
      >
        <Link href={`stock-arena/${community.slug}`} className="hover:underline">
          {community.name}
        </Link>

        {/* Conditional rendering for join/joined status */}
        {isMember ? (
          <div className="px-2 py-1 bg-green-300 rounded-full text-xs font-medium">
            Joined ✔️
          </div>
        ) : (
          <form action={joinCommunity}>
            <input type="hidden" name="communitySlug" value={community.slug} />
            <button
              type="submit"
              className="px-3 py-1 bg-blue-500 text-white rounded-full text-xs font-medium hover:bg-blue-600 transition ease-in-out duration-300"
            >
              + Join
            </button>
          </form>
        )}
      </li>
    );
  })}
</ul>
{/* 
      <pre>
        {JSON.stringify(communities, null, 2)}
      </pre> */}
    </div>
  );
}