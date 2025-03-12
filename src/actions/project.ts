'use server'

import { client } from "@/lib/prisma";
import { onAuthenticateUser } from "./user";
import { OutlineCard } from "@/lib/types";
import { JsonValue } from "@prisma/client/runtime/library";

// Get All Projects #########################################################################################################################################
export const getAllProjects = async () => {
  try {
    // Check User
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User Not Authanticated" };
    }

    // Get Projects
    const projects = await client.project.findMany({
      where: {
        userId: checkUser.user?.id,
        isDeleted: false,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    // If No Projects Found
    if (projects.length === 0) {
      return { status: 404, error: "No Projects Found" };
    }

    // Return Projects
    return { status: 200, data: projects };
  } catch (error) {
    console.log("Error: ", error);
    return { status: 500, message: "Internal Server Error" };
  }
};

// Get Recent Projects #########################################################################################################################################
export const getRecentProjects = async () => {
  try {
    // Check User
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User Not Authanticated" };
    }

    // Get Projects
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

    // If No Recent Projects Found
    if (projects.length === 0) {
      return { status: 404, error: "No Recent Projects Available" };
    }

    // Return Recent Projects
    return { status: 200, data: projects };
  } catch (error) {
    console.log("Error: ", error);
    return { status: 500, message: "Internal Server Error" };
  }
};

// Recover Project #########################################################################################################################################
export const recoverProject = async (projectId: string) => {

  try {
    // Check User
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User Not Authanticated" };
    }

    // Recover Project
    const updatedProject = await client.project.update({
      where:{
        id: projectId,
        userId: checkUser.user.id,
      },
      data:{
        isDeleted: false,
      }
    })

    // If Failed to Recover Project
    if(!updatedProject){
      return { status: 500, error: "Failed to recover project" };
    }

    // Return Project
    return { status: 200, data: updatedProject };
  } catch (error) {
    console.log("Error: ", error);
    return { status: 500, message: "Internal Server Error" };
  }
};

// Delete Project #########################################################################################################################################
export const deleteProject = async (projectId: string) => {
  try {
    // Check User
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User Not Authanticated" };
    }

    // Delete Project
    const updatedProject = await client.project.update({
      where:{
        id: projectId,
        userId: checkUser.user.id,
      },
      data:{
        isDeleted: true,
      }
    })

    // If Failed to Delete Project
    if(!updatedProject){
      return { status: 500, error: "Failed to delete project" };
    }

    // Return Project
    return { status: 200, data: updatedProject };
  } catch (error) {
    console.log("Error: ", error);
    return { status: 500, message: "Internal Server Error" };
  }
}

// Create Project #########################################################################################################################################
export const createProject = async (title: string, outlines: OutlineCard[]) => {
  try {
    // Check if Title and Outlines are Required
    if(!title || !outlines || outlines.length === 0){
      return { status: 400, error: "Title and outlines are required" };
    }

    // Map Outlines
    const alloutlines = outlines.map((outline) => outline.title)

    // Check User
    const checkuser = await onAuthenticateUser();
    if(checkuser.status !== 200 || !checkuser.user){
      return { status: 403, error: "User Not Authanticated" };
    }

    // Create Project
    const project = await client.project.create({
      data: {
        title,
        outlines: alloutlines,
        userId: checkuser.user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    // If Failed to Create Project
    if(!project){
      return { status: 500, error: "Failed to create project" };
    }

    // Return Project
    return { status: 200, data: project };
  } catch (error) {
    console.log("Error: ", error);
    return { status: 500, message: "Internal Server Error" };
  }
}

// Get Project By ID #########################################################################################################################################
export const getProjectById = async (projectId: string) => {
  try {
    // Check User
    const checkUser = await onAuthenticateUser();
    if(checkUser.status !== 200 || !checkUser.user){
      return { status: 403, error: "User Not Authanticated" };
    }

    // Get Project
    const project = await client.project.findFirst({
      where: { id: projectId}
    })

    // If Project Not Found
    if(!project){
      return { status: 404, error: "Project Not Found" };
    }

    // Return Project
    return { status: 200, data: project };
  } catch (error) {
    console.log("Error: ", error);
    return { status: 500, message: "Internal Server Error" };
  }
}

// Update Slides #########################################################################################################################################
export const updateSlides = async (projectId: string, slides: JsonValue) => {
  try {
    // Check User
    const checkUser = await onAuthenticateUser();
    if(checkUser.status !== 200 || !checkUser.user){
      return { status: 403, error: "User Not Authanticated" };
    }

    // Check if Project ID and Slides are Required
    if(!projectId || !slides){
      return { status: 400, error: "Project ID and Slides are required" };
        }

    // Update Slides
    const updatedProject = await client.project.updateMany({
      where: {
        id: projectId,
      },
      data:{
        slides,
      }
    })

    // If Failed to Update Slides
    if(!updatedProject){
      return { status: 500, error: "Failed to update slides" };
    }

    // Return Project
    return { status: 200, data: updatedProject };
  } catch (error) {
    console.log("Error: ", error);
    return { status: 500, message: "Internal Server Error" };
  }
}

// Update Theme #########################################################################################################################################
export const updateTheme = async (projectId: string, theme: string) => {
  try {
    // Check User
    const checkUser = await onAuthenticateUser();
    if(checkUser.status !== 200 || !checkUser.user){
      return { status: 403, error: "User Not Authanticated" };
      }

    // Check if Project ID and Theme are Required
    if(!projectId || !theme){
      return { status: 400, error: "Project ID and Theme are required" };
    }

    // Update Theme
    const updatedProject = await client.project.update({
      where: {
        id: projectId,
      },
      data: {
        themeName: theme,
      }
    })

    // If Failed to Update Theme
    if(!updatedProject){
      return { status: 500, error: "Failed to update theme" };
    }

    // Return Project
    return { status: 200, data: updatedProject };
  } catch (error) {
    console.log("Error: ", error);
    return { status: 500, message: "Internal Server Error" };
  }
}

// Delete All Projects #########################################################################################################################################
export const deleteAllProjects = async (projectIds: string[]) => {
  try {
    // Check if Project IDs are Required
    if(!Array.isArray(projectIds) || projectIds.length === 0){
      return { status: 400, error: "Project IDs are required" };
    }

    // Check User
    const checkUser = await onAuthenticateUser();
    if(checkUser.status !== 200 || !checkUser.user){
      return { status: 403, error: "User Not Authanticated" };
    }

    // Get User ID
    const userId = checkUser.user.id;

    // Get Projects to Delete
    const projectsToDelete = await client.project.findMany({
      where: {
        id: { in: projectIds },
        userId: userId,
      },
    });

    // If No Projects to Delete
    if(projectsToDelete.length === 0){
      return { status: 404, error: "No projects found to delete" };
    }

    // Delete Projects
    const deletedProjects = await client.project.deleteMany({
      where: {
        id: { in: projectsToDelete.map((project) => project.id) },
        userId: userId,
      },
    });

    // If Failed to Delete Projects
    if(deletedProjects.count !== projectsToDelete.length){
      return { status: 500, error: "Failed to delete all projects" };
    }

    // Return Message on Success
    return { status: 200, message: `${deletedProjects.count} projects successfully deleted.` };
    
  } catch (error) {
    console.log("Error: ", error);
    return { status: 500, message: "Internal Server Error" };
  }
}

// Get Deleted Projects #########################################################################################################################################
export const getDeletedProjects = async () => {
  try {
    // Check User
    const checkUser = await onAuthenticateUser();
    if(checkUser.status !== 200 || !checkUser.user){
      return { status: 403, error: "User Not Authanticated" };
    }

    // Get Deleted Projects
    const projects = await client.project.findMany({
      where: {
        userId: checkUser.user.id,
        isDeleted: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    })

    // If No Deleted Projects Found
    if(projects.length === 0){
      return { status: 404, error: "No deleted projects found" , data: []};
    }

    // Return Deleted Projects
    return { status: 200, data: projects };
    
  } catch (error) {
    console.log("Error: ", error);
    return { status: 500, message: "Internal Server Error" };
  }
}

// Filter Projects #########################################################################################################################################
export const filterProjects = async (searchTerm: string) => {
  try {
    // Check if Search Term is Required
    if (!searchTerm) return getAllProjects();

    // Check User
      const checkUser = await onAuthenticateUser();
      if(checkUser.status !== 200 || !checkUser.user){
        return { status: 403, error: "User Not Authanticated" };
      }
  
    // Get Filtered Projects
    const filteredProjects = await client.project.findMany({
      where: {
        title: {
          contains: searchTerm,
          mode: 'insensitive',
        },
        isDeleted: false,
      },
      orderBy: {
        updatedAt: "desc",
      }
    });

    // If No Filtered Projects Found
    if(filteredProjects.length === 0){
      return { status: 404, error: "No projects found"};
    }

    // Return Filtered Projects
    return { status: 200, data: filteredProjects };
  } catch (error) {
    console.log("Error: ", error);
    return { status: 500, message: "Internal Server Error" };
  }
};