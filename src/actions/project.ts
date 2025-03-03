import { client } from "@/lib/prisma";
import { onAuthenticateUser } from "./user";
import { OutlineCard } from "@/lib/types";

export const getAllProjects = async () => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User Not Authanticated" };
    }

    const projects = await client.project.findMany({
      where: {
        userId: checkUser.user?.id,
        isDeleted: false,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    if (projects.length === 0) {
      return { status: 404, error: "No Projects Found" };
    }

    return { status: 200, data: projects };
  } catch (error) {
    console.log("Error: ", error);
    return { status: 500, message: "Internal Server Error" };
  }
};

export const getRecentProjects = async () => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User Not Authanticated" };
    }

    const projects = await client.project.findMany({
      where: {
        userId: checkUser.user.id,
        isDeleted: false,
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: 5,
    });

    if (projects.length === 0) {
      return { status: 404, error: "No Recent Projects Available" };
    }

    return { status: 200, data: projects };
  } catch (error) {
    console.log("Error: ", error);
    return { status: 500, message: "Internal Server Error" };
  }
};

export const recoverProject = async (projectId: string) => {

  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User Not Authanticated" };
    }
  
    const updatedProject = await client.project.update({
      where:{
        id: projectId,
        userId: checkUser.user.id,
      },
      data:{
        isDeleted: false,
      }
    })

    if(!updatedProject){
      return { status: 500, error: "Failed to recover project" };
    }

    return { status: 200, data: updatedProject };
  } catch (error) {
    console.log("Error: ", error);
    return { status: 500, message: "Internal Server Error" };
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User Not Authanticated" };
    }

    const updatedProject = await client.project.update({
      where:{
        id: projectId,
        userId: checkUser.user.id,
      },
      data:{
        isDeleted: true,
      }
    })

    if(!updatedProject){
      return { status: 500, error: "Failed to delete project" };
    }

    return { status: 200, data: updatedProject };
  } catch (error) {
    console.log("Error: ", error);
    return { status: 500, message: "Internal Server Error" };
  }
}

export const createProject = async (title: string, outlines: OutlineCard[]) => {
  try {
    if(!title || !outlines || outlines.length === 0){
      return { status: 400, error: "Title and outlines are required" };
    }
    const alloutlines = outlines.map((outline) => outline.title)

    const checkuser = await onAuthenticateUser();
    if(checkuser.status !== 200 || !checkuser.user){
      return { status: 403, error: "User Not Authanticated" };
    }

    const project = await client.project.create({
      data: {
        title,
        outlines: alloutlines,
        userId: checkuser.user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    
    if(!project){
      return { status: 500, error: "Failed to create project" };
    }

    return { status: 200, data: project };
  } catch (error) {
    console.log("Error: ", error);
    return { status: 500, message: "Internal Server Error" };
  }
}