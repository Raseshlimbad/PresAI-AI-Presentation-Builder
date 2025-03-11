"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

// Authenticate User #########################################################################################################################################
export const onAuthenticateUser = async () => {
  try {
    // Get User
    const user = await currentUser();

    // If User Not Found
    if (!user) {
      return { status: 403 };
    }

    // Get User from Database
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

    // If User Exists
    if (userExists) {
      return { status: 200, user: userExists };
    }

    // If User Doesn't Exist, Create a New User
    const newUser = await client.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
        profileImage: user.imageUrl,
      },
    });

    // Return New User
    return { status: 200, user: newUser };
  } catch (error) {
    console.error("Error: ", error);
    return { status: 500, message: "Internal Server Error" };
  }
};
