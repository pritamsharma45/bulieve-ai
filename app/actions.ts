"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "./lib/db";
import { Prisma, TypeOfVote, LikeType } from "@prisma/client";
import { JSONContent } from "@tiptap/react";
import { revalidatePath } from "next/cache";
import slugify from "react-slugify";

export async function updateUsername(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const username = formData.get("username") as string;

  try {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        userName: username,
      },
    });

    return {
      message: "Succesfully Updated name",
      status: "green",
    };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return {
          message: "This username is alredy used",
          status: "error",
        };
      }
    }

    throw e;
  }
}

export async function createCommunity(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  try {
    const name = formData.get("name") as string;

    const data = await prisma.subreddit.create({
      data: {
        name: name,
        userId: user.id,
      },
    });

    return redirect(`/r/${data.name}`);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return {
          message: "This Name is alredy used",
          status: "error",
        };
      }
    }
    throw e;
  }
}
export async function joinCommunity(formData: FormData) {
  console.log("joinCommunity");
  const communitySlug = formData.get("communitySlug") as string;
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  try {
    // Step 1: Get the community ID based on the provided slug
    const community = await prisma.community.findUnique({
      where: { slug: communitySlug },
      select: { id: true },
    });

    if (!community) {
      return {
        message: "Community not found.",
        status: "error",
      };
    }

    // Step 2: Check if the user is already a member of the community
    const existingMembership = await prisma.membership.findUnique({
      where: {
        userId_communityId: {
          userId: user.id,
          communityId: community.id,
        },
      },
    });

    if (existingMembership) {
      console.log("existingMembership", existingMembership);
      return {
        message: "You are already a member of this community.",
        status: "info",
      };
    }

    // Step 3: Create a new membership using userId and communityId directly
    await prisma.membership.create({
      data: {
        userId: user.id,
        communityId: community.id,
      },
    });

    console.log("membership created");
    return revalidatePath("/", "page");
    return {
      message: "Successfully joined the community!",
      status: "success",
    };
  } catch (error) {
    console.error(error);
    return {
      message: "An error occurred while joining the community.",
      status: "error",
    };
  }
}

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

// createCommunity2 using above model
export async function createCommunity2(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    const data = await prisma.community.create({
      data: {
        name: name,
        slug: slugify(name),
        description: description,
        userId: user.id,
      },
    });

    return redirect(`/stock-arena/${data.slug}`);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return {
          message: "This Name is alredy used",
          status: "error",
        };
      }
    }
    throw e;
  }
}

export async function updateSubDescription(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  try {
    const subName = formData.get("subName") as string;
    const description = formData.get("description") as string;

    await prisma.subreddit.update({
      where: {
        name: subName,
      },
      data: {
        description: description,
      },
    });

    return {
      status: "green",
      message: "Succesfully updated the description!",
    };
  } catch (e) {
    return {
      status: "error",
      message: "Sorry something went wrong!",
    };
  }
}

export async function createPost(
  { jsonContent }: { jsonContent: JSONContent | null },
  formData: FormData
) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const title = formData.get("title") as string;
  const imageUrl = formData.get("imageUrl") as string | null;
  const subName = formData.get("subName") as string;

  try {
    const data = await prisma.post.create({
      data: {
        title: title,
        imageString: imageUrl ?? undefined,
        subName: subName,
        userId: user.id,
        textContent: jsonContent ?? undefined,
      },
    });

    return redirect(`/post/${data.id}`);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return {
          message: "Invalid subName",
          status: "error",
        };
      }
    }
    throw e;
  }
}
export async function createPost2(
  { jsonContent }: { jsonContent: JSONContent | null },
  formData: FormData
) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }
  console.log("createPost2");
  const title = formData.get("title") as string;
  const imageUrl = formData.get("imageUrl") as string | null;
  const communitySlug = formData.get("communitySlug") as string;
  console.log("createPost2", title, imageUrl, communitySlug);
  try {
    const data = await prisma.post.create({
      data: {
        title: title,
        imageString: imageUrl ?? undefined,
        communitySlug: communitySlug || null,
        userId: user.id,
        textContent: jsonContent ?? undefined,
      },
    });
    // make sure to redirect to the stock-arena/communitySlug if communitySlug is not null\
    if (communitySlug) {
      return redirect(`/stock-arena/${data.communitySlug}`);
    }

    return redirect(`/stock-arena`);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return {
          message: "Invalid subName",
          status: "error",
        };
      }
    }
    throw e;
  }
}

export async function handleVote(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const postId = formData.get("postId") as string;
  const voteDirection = formData.get("voteDirection") as TypeOfVote;

  const vote = await prisma.vote.findFirst({
    where: {
      postId: postId,
      userId: user.id,
    },
  });

  if (vote) {
    if (vote.voteType === voteDirection) {
      await prisma.vote.delete({
        where: {
          id: vote.id,
        },
      });

      return revalidatePath("/", "page");
    } else {
      await prisma.vote.update({
        where: {
          id: vote.id,
        },
        data: {
          voteType: voteDirection,
        },
      });
      return revalidatePath("/", "page");
    }
  }

  await prisma.vote.create({
    data: {
      voteType: voteDirection,
      userId: user.id,
      postId: postId,
    },
  });

  return revalidatePath("/", "page");
}
export async function handleLike(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const postId = formData.get("postId") as string;
  const likeDirection = formData.get("likeDirection") as LikeType;

  const existingLike = await prisma.like.findFirst({
    where: {
      postId: postId,
      userId: user.id,
    },
  });

  if (existingLike) {
    if (existingLike.likeType === likeDirection) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });

      return revalidatePath("/", "page");
    } else {
      await prisma.like.update({
        where: {
          id: existingLike.id,
        },
        data: {
          likeType: likeDirection,
        },
      });
      return revalidatePath("/", "page");
    }
  }

  await prisma.like.create({
    data: {
      likeType: likeDirection,
      userId: user.id,
      postId: postId,
    },
  });

  return revalidatePath("/", "page");
}

export async function createComment(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const comment = formData.get("comment") as string;
  const postId = formData.get("postId") as string;

  const data = await prisma.comment.create({
    data: {
      text: comment,
      userId: user.id,
      postId: postId,
    },
  });

  revalidatePath(`/post/${postId}`);
}
