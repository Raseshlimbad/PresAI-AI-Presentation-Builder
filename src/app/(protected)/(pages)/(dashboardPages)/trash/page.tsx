import React from "react";
import DeleteAllButton from "./_components/DeleteAllButton";
import { getDeletedProjects } from "@/actions/project";
import NotFound from "@/components/global/not-found/NotFound";
import Projects from "@/components/global/projects";

const Page = async () => {
  // Get the deleted projects
    const deletedProjects = await getDeletedProjects();

    // If the deleted projects are not found, show a not found component
    if(deletedProjects.status !== 200){
      return <NotFound />
    }

    // If the deleted projects are found, show the projects
  return (
    <div className="flex flex-col gap-6 relative">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col items-start">
          {/* Title */}
          <h1 className="text-2xl font-semibold dark:text-primary backdrop-blur-lg">
            Trash
          </h1>
          {/* Description */}
          <p className="text-base font-normal dark:text-secondary">
            All your deleted presentations
          </p>
        </div>
        {/* Delete All Button */}
      <DeleteAllButton projects={deletedProjects.data ?? []}/>
      </div>
      {/* Projects */}
    {deletedProjects.data && deletedProjects.data.length > 0 ? (
        // Projects
        <Projects projects={deletedProjects.data ?? []} />
    ) : (
        // Not Found
        <NotFound />
    )}
    </div>
  );
};

export default Page;
