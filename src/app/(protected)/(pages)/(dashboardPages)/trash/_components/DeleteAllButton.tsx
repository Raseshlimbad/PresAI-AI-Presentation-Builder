"use client";

import { Project } from "@prisma/client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import AlertDialogBox from "@/components/global/alert-dialog";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteAllProjects } from "@/actions/project";
type Props = {
  projects: Project[];
};

const DeleteAllButton = ({ projects }: Props) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Handle Delete All Projects
  const handleDeleteAllProjects = async () => {
    setLoading(true);

    // If the projects are not found, show an error toast
    if (!projects || projects.length === 0) {
      setLoading(false);
      toast.error("Error", { description: "No projects to delete" });
      setOpen(false);
      return;
    }

    // Try to delete all projects
    try {
      const res = await deleteAllProjects(projects.map((project) => project.id));
      
      // If the projects are not deleted, show an error toast
      if(res.status !== 200) {
        toast.error("Error", { description: "Error deleting projects" });
        return;
      }

      // Show a success toast
      toast.success("Success", { description: "All projects deleted" });
      router.refresh();
    } catch (error) {
      // Show an error toast
      console.log("Error deleting all projects: ", error);
      toast.error("Error", { description: "Error deleting all projects" });
    }

    // Set the loading to false
    setLoading(false);
    // Set the open to false
    setOpen(false);
    // Refresh the page

  };

  return (
    // Alert Dialog Box
    <AlertDialogBox
      description="This action cannot be undone. This will permanently delete all your projects and remove your data from our servers."
      className="bg-red-500 text-white dark:bg-red-600 dark:hover:bg-red-700 hover:bg-red-600"
      onClick={handleDeleteAllProjects}
      loading={loading}
      handleOpen={() => setOpen(!open)}
      open={open}
      >
      {/* Button */}
      <Button
        size={"lg"}
        className="bg-background-80 dark:bg-[#262626]  rounded-lg dark:hover:bg-white dark:hover:text-black text-primary font-semibold hover:text-white"
      >
        {/* Trash Icon */}
        <Trash />
        {/* Delete All */}
        Delete All
      </Button>
    </AlertDialogBox>
  );
};

export default DeleteAllButton;
