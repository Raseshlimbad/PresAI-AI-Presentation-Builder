"use server";

import { client } from "@/lib/prisma";
import { onAuthenticateUser } from "./user";
import { OutlineCard, Slide } from "@/lib/types";
import { JsonValue } from "@prisma/client/runtime/library";
import { v4 as uuidv4 } from "uuid";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET_KEY,
});

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
      where: {
        id: projectId,
        userId: checkUser.user.id,
      },
      data: {
        isDeleted: false,
      },
    });

    // If Failed to Recover Project
    if (!updatedProject) {
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
      where: {
        id: projectId,
        userId: checkUser.user.id,
      },
      data: {
        isDeleted: true,
      },
    });

    // If Failed to Delete Project
    if (!updatedProject) {
      return { status: 500, error: "Failed to delete project" };
    }

    // Return Project
    return { status: 200, data: updatedProject };
  } catch (error) {
    console.log("Error: ", error);
    return { status: 500, message: "Internal Server Error" };
  }
};

// Create Project #########################################################################################################################################
export const createProject = async (title: string, outlines: OutlineCard[]) => {
  try {
    // Check if Title and Outlines are Required
    if (!title || !outlines || outlines.length === 0) {
      return { status: 400, error: "Title and outlines are required" };
    }

    // Map Outlines
    const alloutlines = outlines.map((outline) => outline.title);

    // Check User
    const checkuser = await onAuthenticateUser();
    if (checkuser.status !== 200 || !checkuser.user) {
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
    if (!project) {
      return { status: 500, error: "Failed to create project" };
    }

    // Return Project
    return { status: 200, data: project };
  } catch (error) {
    console.log("Error: ", error);
    return { status: 500, message: "Internal Server Error" };
  }
};

// Create Template Project 1 ####################################################################################################
export const createTemplateProject = async (
  title: string,
  slides: Slide[],
  outlines: OutlineCard[] = [],
  thumbnail?: string
) => {
  try {
    // Check if Title and Slides are Required
    if (!title || !slides || slides.length === 0) {
      return { status: 400, error: "Title and slides are required" };
    }

    // Map Outline Titles
    const outlineTitles = outlines.map((outline) => outline.title);

    // Check User Authentication
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User Not Authenticated" };
    }

    // Prepare Slides to be saved as JSON
    // const serializedSlides = slides.map((slide) => ({
    //   id: slide.id,
    //   slideName: slide.slideName,
    //   type: slide.type,
    //   slideOrder: slide.slideOrder,
    //   content: JSON.stringify(slide.content), // Serialize the content (or ensure it's JSON-safe)
    //   className: slide.className || '',
    // }));

    const serializedSlides = JSON.stringify(slides);

    // Create Template Project
    const templateProject = await client.project.create({
      data: {
        title,
        outlines: outlineTitles,
        slides: serializedSlides, // Store slides as JSON
        userId: checkUser.user.id,
        thumbnail, // Optional thumbnail
        createdAt: new Date(),
        updatedAt: new Date(),
        isDeleted: false,
        isSellable: false,
        themeName: "dark", // Default theme (could be customized as needed)
      },
    });

    // If Failed to Create Template Project
    if (!templateProject) {
      return { status: 500, error: "Failed to create template project" };
    }

    // Return Created Template Project
    return { status: 200, data: templateProject };
  } catch (error) {
    console.log("Error: ", error);
    return { status: 500, message: "Internal Server Error" };
  }
};

// Create Template Project 2 #########################################################################################################################################
// export const createTemplateProject = async (templateData: any) => {
//   try {
//     // Check if Template Data is Provided
//     if (!templateData || !templateData.name || !templateData.outlines || templateData.outlines.length === 0) {
//       return { status: 400, error: "Template data, name, and outlines are required" };
//     }

//     const { name, description, category, thumbnail, outlines, slides } = templateData;

//     // Check User Authentication
//     const checkuser = await onAuthenticateUser();
//     if (checkuser.status !== 200 || !checkuser.user) {
//       return { status: 403, error: "User Not Authenticated" };
//     }

//     // Map Outlines
//     const allOutlines = outlines.map((outline : OutlineCard) => outline.title);

//     // Prepare Project Data
//     const projectData = {
//       title: name,
//       outlines: allOutlines,
//       slides: slides || [], // Can be an empty array if no slides are provided
//       thumbnail: thumbnail || null,
//       userId: checkuser.user.id,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       isDeleted: false,
//       isSellable: false,
//       themeName: 'light', // Assuming default theme
//     };

//     // Create Project from Template Data
//     const project = await client.project.create({
//       data: projectData,
//     });

//     // Check if Project Creation Failed
//     if (!project) {
//       return { status: 500, error: "Failed to create project from template" };
//     }

//     // Return Project Data
//     return { status: 200, data: project };
//   } catch (error) {
//     console.log("Error: ", error);
//     return { status: 500, message: "Internal Server Error" };
//   }
// };

// Get Project By ID #########################################################################################################################################
export const getProjectById = async (projectId: string) => {
  try {
    // Check User
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User Not Authanticated" };
    }

    // Get Project
    const project = await client.project.findFirst({
      where: { id: projectId },
    });

    // If Project Not Found
    if (!project) {
      return { status: 404, error: "Project Not Found" };
    }

    // Return Project
    return { status: 200, data: project };
  } catch (error) {
    console.log("Error: ", error);
    return { status: 500, message: "Internal Server Error" };
  }
};

// Get Project Title #########################################################################################################################################
export const getProjectTitle = async (projectId: string) => {
  try {
    // Check User
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User Not Authenticated" };
    }

    // Get Project Title by Project ID
    const project = await client.project.findFirst({
      where: { id: projectId, userId: checkUser.user.id, isDeleted: false },
      select: { title: true }, // Only select the title
    });

    // If Project Not Found
    if (!project) {
      return { status: 404, error: "Project Not Found" };
    }

    // Return Project Title
    return { status: 200, data: { title: project.title } };
  } catch (error) {
    console.log("Error: ", error);
    return { status: 500, message: "Internal Server Error" };
  }
};

// Update Project Title #########################################################################################################################################
export const updateProjectTitle = async (
  projectId: string,
  newTitle: string
) => {
  try {
    // Check if Project ID and Title are Required
    if (!projectId || !newTitle) {
      return { status: 400, error: "Project ID and Title are required" };
    }

    // Check User
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User Not Authenticated" };
    }

    // Update Project Title
    const updatedProject = await client.project.update({
      where: { id: projectId, userId: checkUser.user.id },
      data: { title: newTitle },
    });

    // If Failed to Update Project Title
    if (!updatedProject) {
      return { status: 500, error: "Failed to update project title" };
    }

    // Return Updated Project
    return { status: 200, data: updatedProject };
  } catch (error) {
    console.log("Error: ", error);
    return { status: 500, message: "Internal Server Error" };
  }
};

// Update Slides #########################################################################################################################################
export const updateSlides = async (projectId: string, slides: JsonValue) => {
  try {
    // Check User
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User Not Authanticated" };
    }

    // Check if Project ID and Slides are Required
    if (!projectId || !slides) {
      return { status: 400, error: "Project ID and Slides are required" };
    }

    // Update Slides
    const updatedProject = await client.project.updateMany({
      where: {
        id: projectId,
      },
      data: {
        slides,
      },
    });

    // If Failed to Update Slides
    if (!updatedProject) {
      return { status: 500, error: "Failed to update slides" };
    }

    // Return Project
    return { status: 200, data: updatedProject };
  } catch (error) {
    console.log("Error: ", error);
    return { status: 500, message: "Internal Server Error" };
  }
};

// Update Theme #########################################################################################################################################
export const updateTheme = async (projectId: string, theme: string) => {
  try {
    // Check User
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User Not Authanticated" };
    }

    // Check if Project ID and Theme are Required
    if (!projectId || !theme) {
      return { status: 400, error: "Project ID and Theme are required" };
    }

    // Update Theme
    const updatedProject = await client.project.update({
      where: {
        id: projectId,
      },
      data: {
        themeName: theme,
      },
    });

    // If Failed to Update Theme
    if (!updatedProject) {
      return { status: 500, error: "Failed to update theme" };
    }

    // Return Project
    return { status: 200, data: updatedProject };
  } catch (error) {
    console.log("Error: ", error);
    return { status: 500, message: "Internal Server Error" };
  }
};

// Delete All Projects #########################################################################################################################################
export const deleteAllProjects = async (projectIds: string[]) => {
  try {
    // Check if Project IDs are Required
    if (!Array.isArray(projectIds) || projectIds.length === 0) {
      return { status: 400, error: "Project IDs are required" };
    }

    // Check User
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
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
    if (projectsToDelete.length === 0) {
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
    if (deletedProjects.count !== projectsToDelete.length) {
      return { status: 500, error: "Failed to delete all projects" };
    }

    // Return Message on Success
    // return { status: 200, message: `${deletedProjects.count} projects successfully deleted.` };

    // Delete Folders from Cloudinary
    // Assuming the project name corresponds to a folder in Cloudinary
    // for (const project of projectsToDelete) {
    //   const projectFolderName = project.id; // Assuming `name` is the project folder name
    //   // await cloudinary.api.delete_resources_by_prefix(projectFolderName);
    //   await cloudinary.api
    //     .delete_folder(`projected/${projectFolderName}`)
    //     .then(console.log);
    // }

    for (const project of projectsToDelete) {
      const projectFolderName = project.id; // Assuming `id` is the folder name

      // First, delete all resources in the folder
      try {
        await cloudinary.api.delete_resources_by_prefix(`projected/${projectFolderName}`);
        console.log(`All resources in folder 'projected/${projectFolderName}' deleted successfully.`);
      } catch (err) {
        console.log(`Error deleting resources in folder 'projected/${projectFolderName}':`, err);
      }

      // Now, delete the folder itself
      try {
        await cloudinary.api.delete_folder(`projected/${projectFolderName}`);
        console.log(`Folder 'projected/${projectFolderName}' deleted successfully.`);
      } catch (err) {
        console.log(`Error deleting folder 'projected/${projectFolderName}':`, err);
      }
    }

    // Return Message on Success
    return {
      status: 200,
      message: `${deletedProjects.count} projects successfully deleted and Cloudinary folders removed.`,
    };
  } catch (error) {
    console.log("Error: ", error);
    return { status: 500, message: "Internal Server Error" };
  }
};

// Get Deleted Projects #########################################################################################################################################
export const getDeletedProjects = async () => {
  try {
    // Check User
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
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
    });

    // If No Deleted Projects Found
    if (projects.length === 0) {
      return { status: 404, error: "No deleted projects found", data: [] };
    }

    // Return Deleted Projects
    return { status: 200, data: projects };
  } catch (error) {
    console.log("Error: ", error);
    return { status: 500, message: "Internal Server Error" };
  }
};

// Filter Projects #########################################################################################################################################
export const filterProjects = async (searchTerm: string) => {
  try {
    // Check if Search Term is Required
    if (!searchTerm) return getAllProjects();

    // Check User
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User Not Authanticated" };
    }

    // Get Filtered Projects
    const filteredProjects = await client.project.findMany({
      where: {
        title: {
          contains: searchTerm,
          mode: "insensitive",
        },
        isDeleted: false,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    // If No Filtered Projects Found
    if (filteredProjects.length === 0) {
      return { status: 404, error: "No projects found" };
    }

    // Return Filtered Projects
    return { status: 200, data: filteredProjects };
  } catch (error) {
    console.log("Error: ", error);
    return { status: 500, message: "Internal Server Error" };
  }
};
