"use server";

import { client } from "@/lib/prisma";
import { currentUser,  } from "@clerk/nextjs/server";
import bcrypt from "bcryptjs";
import { pwnedPassword } from 'hibp';

// Add new function for normal authentication
// Add password validation function
const isPasswordValid = async (password: string): Promise<{ valid: boolean; message: string }> => {
  // Check minimum requirements
  if (password.length < 8) {
    return { valid: false, message: "Password must be at least 8 characters long" };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: "Password must contain at least one uppercase letter" };
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: "Password must contain at least one lowercase letter" };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: "Password must contain at least one number" };
  }
  if (!/[!@#$%^&*]/.test(password)) {
    return { valid: false, message: "Password must contain at least one special character (!@#$%^&*)" };
  }

  // Check if password has been breached
  try {
    const breachCount = await pwnedPassword(password);
    if (breachCount > 0) {
      return { valid: false, message: "This password has been found in data breaches. Please choose a different password." };
    }
  } catch (error) {
    console.error('Error checking password breach:', error);
  }

  return { valid: true, message: "Password is valid" };
};

export const normalSignup = async (
  email: string,
  password: string,
  username?: string,
  name?: string
) => {
  try {
    // Validate password
    const passwordValidation = await isPasswordValid(password);
    if (!passwordValidation.valid) {
      return { status: 400, message: passwordValidation.message };
    }

    // Check if user already exists
    const existingUser = await client.user.findFirst({
      where: {
        OR: [
          { email },
          { username: username || "" }
        ]
      }
    });

    if (existingUser) {
      return { status: 400, message: "User already exists" };
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await client.user.create({
      data: {
        email,
        username,
        name: name || email.split("@")[0],
        password: hashedPassword,
        passwordSalt: salt,
        authMethod: "password",
      },
    });

    return { status: 200, user: newUser };
  } catch (error) {
    console.error("Error: ", error);
    return { status: 500, message: "Internal Server Error" };
  }
};

// Keep existing Clerk authentication
export const onAuthenticateUser = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      return { status: 403 };
    }

    const userExists = await client.user.findFirst({
      where: {
        OR: [
          { clerkId: user.id },
          { email: user.emailAddresses[0]?.emailAddress },
          { username: user.username || ""}
        ]
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
      // Update user info if needed
      const updatedUser = await client.user.update({
        where: { id: userExists.id },
        data: {
          clerkId: user.id,
          email: user.emailAddresses[0]?.emailAddress,
          username: user.username || "",
          name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
          profileImage: user.imageUrl,
          lastLoginAt: new Date(),
          authMethod: user.externalAccounts[0]?.provider || 'email',
          updatedAt: new Date(),
        },
      });
      return { status: 200, user: updatedUser };
    }

    // Create new user
    const newUser = await client.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0]?.emailAddress,
        name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
        username: user.username || "",
        profileImage: user.imageUrl,
        lastLoginAt: new Date(),
        authMethod: user.externalAccounts[0]?.provider || 'email',
      },
    });

    return { status: 200, user: newUser };
  } catch (error) {
    console.error("Error: ", error);
    return { status: 500, message: "Internal Server Error" };
  }
};

export const updateUsername = async (userId: string, newUsername: string) => {
  try {
    // Validate username
    if (!newUsername || newUsername.length < 3) {
      return { status: 400, message: "Username must be at least 3 characters long" };
    }

    // Check if username is already taken
    const existingUser = await client.user.findFirst({
      where: {
        username: newUsername,
        NOT: {
          id: userId
        }
      }
    });

    if (existingUser) {
      return { status: 400, message: "Username already taken" };
    }

    // Get current user to check auth method
    const user = await client.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return { status: 404, message: "User not found" };
    }

    // Update in Prisma
    const updatedUser = await client.user.update({
      where: { id: userId },
      data: { 
        username: newUsername,
        name: newUsername, // Also update name to maintain consistency
        updatedAt: new Date()
      }
    });

    return { status: 200, user: updatedUser };
  } catch (error) {
    console.error("Error updating username:", error);
    return { status: 500, message: "Failed to update username" };
  }
};

export const updatePassword = async (userId: string, currentPassword: string, newPassword: string) => {
  try {
    // Get user
    const user = await client.user.findUnique({
      where: { id: userId }
    });

    if (!user || !user.password) {
      return { status: 400, message: "Invalid user or social login account" };
    }

    // Verify current password
    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) {
      return { status: 400, message: "Current password is incorrect" };
    }

    // Validate new password
    const passwordValidation = await isPasswordValid(newPassword);
    if (!passwordValidation.valid) {
      return { status: 400, message: passwordValidation.message };
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    const updatedUser = await client.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
        passwordSalt: salt,
        updatedAt: new Date()
      }
    });

    return { status: 200, message: "Password updated successfully" , user: updatedUser};
  } catch (error) {
    console.error("Error updating password:", error);
    return { status: 500, message: "Failed to update password" };
  }
};

export const updateProfileImage = async (userId: string, imageUrl: string) => {
  try {
    // Validate image URL
    if (!imageUrl) {
      return { status: 400, message: "Image URL is required" };
    }

    const updatedUser = await client.user.update({
      where: { id: userId },
      data: {
        profileImage: imageUrl,
        updatedAt: new Date()
      }
    });

    return { status: 200, user: updatedUser };
  } catch (error) {
    console.error("Error updating profile image:", error);
    return { status: 500, message: "Failed to update profile image" };
  }
};