import { CreatePostCard } from "@/app/components/CreatePostCard";
import Pagination from "@/app/components/Pagination";
import { PostCard } from "@/app/components/PostCard";
import { SubDescriptionForm } from "@/app/components/SubDescriptionForm";
import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Cake, FileQuestion } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
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


async function getData(slug: string,searchParam: string) {

  noStore();
  const [count, data] = await prisma.$transaction([
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
        subName: true,
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

export default async function StockArenaRoute({
  params
}: {
  params: { id: string };
}) {

  console.log(params);
  // const searchParams = { page: "1" };
  // const { count, data } = await getData(params.id,searchParams.page);

  const data = await getData('my-first-community',params.id);

  return (
    <div>
        {/* Blue background banner */}
        <div className="bg-blue-500 h-32 w-full flex  flex-col items-center justify-center">
          <h1 className="text-white text-4xl">Stock Arena</h1>
          <br />
          <p>Themed banner</p>
        </div>
    {/* ID */}
    <div>
      <h2>ID: {params.id}</h2>
    
    </div>
    <div>
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
    </div>
  );
}


// async function ShowItems({ searchParams }: { searchParams: { page: string } }) {
//   const { count, data } = await getData(searchParams.page);
//   return (
//     <>
//       {data.map((post) => (
//         <PostCard
//           id={post.id}
//           imageString={post.imageString}
//           jsonContent={post.textContent}
//           subName={post.subName as string}
//           title={post.title}
//           key={post.id}
//           commentAmount={post.Comment.length}
//           userName={post.User?.userName as string}
//           voteCount={post.Vote.reduce((acc, vote) => {
//             if (vote.voteType === "UP") return acc + 1;
//             if (vote.voteType === "DOWN") return acc - 1;

//             return acc;
//           }, 0)}
//         />
//       ))}

//       <Pagination totalPages={Math.ceil(count / 10)} />
//     </>
//   );
// }