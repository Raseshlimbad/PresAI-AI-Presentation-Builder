"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const onAuthenticateUser = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 403 };
    }

    const userExists = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      include: {
        PurchasedProjects: {
          select: {
            id: true,
          },
        },
      },
    });

    if (userExists) {
      return { status: 200, user: userExists };
    }

    // If user doesn't exist, create a new user
    const newUser = await client.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
        profileImage: user.imageUrl,
      },
    });

    return { status: 200, user: newUser };
  } catch (error) {
    console.error("Error: ", error);
    return { status: 500, message: "Internal Server Error" };
  }
};
