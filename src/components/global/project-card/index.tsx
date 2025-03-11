"use client";

import { JsonValue } from "@prisma/client/runtime/library";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { itemVariants, themes } from "@/lib/constants";
import { useSlideStore } from "@/store/useSlideStore";
import { useRouter } from "next/navigation";
import ThumbnailPreview from "./thumbnail-preview";
import { timeAgo } from "@/lib/utils";
import AlertDialogBox from "../alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { deleteProject, recoverProject } from "@/actions/project";

type Props = {
  projectId: string;
  title: string;
  createdAt: string;
  isDelete?: boolean;
  slideData: JsonValue;
  themeName: string;
};

const ProjectCard = ({
  createdAt,
  projectId,
  slideData,
  title,
  isDelete,
  themeName,
}: Props) => {
  
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { setSlides } = useSlideStore();
  const router = useRouter();

  // Handle Navigation to the presentation
  const handleNavigation = () => {
    setSlides(JSON.parse(JSON.stringify(slideData)));
    router.push(`/presentation/${projectId}`);
  };

  // Handle Recover Project
  const handleRecover = async () => {
    setLoading(true);
    // Check if projectId is defined
    if (!projectId) {
      setLoading(false);
      toast.error("Error", {
        description: "Project ID is required",
      });
      return;
    }
    try {
      // Recover Project
      const res = await recoverProject(projectId);
      if (res.status !== 200) {
        toast.error("Oppse!", {
          description: res.error || "Something went wrong",
        });
        }
      // Close the dialog
      setOpen(false);

      // Need to refresh states and user is recovering project
      router.refresh();
      toast.success("Success", {
        description: "Project recovered successfully",
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      // Show error toast
      toast.error("Oppse!", {
        description: "Something went wrong, Please contact support",
      });
    }
  };

  // Handle Delete Project
  const handleDelete = async () => {
    setLoading(true);
    // Check if projectId is defined
    if (!projectId) {
      setLoading(false);
      toast.error("Error", {
        description: "Project ID is required",
      });
    }

    // Delete Project
    try {
      const res = await deleteProject(projectId);
      if (res.status !== 200) {
        toast.error("Oppse!", {
          description: res.error || "Failed to delete the project",
        });
      }
      setOpen(false);

      // Need to refresh states and user is recovering project
      router.refresh();
      toast.success("Success", {
        description: "Project deleted successfully",
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Oppse!", {
        description: "Something went wrong, Please contact support",
      });
    }
  }

  // Find the theme
  const theme = themes.find((theme) => theme.name === themeName) || themes[0];

  // Return the project card
  return (
    <motion.div
      className={`group w-full flex flex-col gap-y-3 rounded-xl p-3 transition-colors ${
        !isDelete && "hover:bg-muted/50"
      } `}
      variants={itemVariants}
      onClick={handleNavigation}
    >

      {/* Thumbnail Preview */}
      <ThumbnailPreview
          slide={JSON.parse(JSON.stringify(slideData))?.[0]}
        theme={theme}
      />

      {/* Project Card Content */}
      <div className="w-full">
        <div className="space-y-1">
          {/* Project Title */}
          <h3 className="font-semibold text-base text-primary line-clamp-1">
            {title}
          </h3>
          <div className="flex w-full justify-between items-center gap-2">
            {/* Project Created At __ time ago */}
            <p
              className="text-sm text-muted-foreground"
              suppressHydrationWarning
            >
              {timeAgo(createdAt)}
            </p>

            {/* Alert Dilogue Box */}
            <div onClick={(e) => e.stopPropagation()}>
              {/* If the project is deleted, show the recover button */}
            {isDelete ? (
              <AlertDialogBox
                description="This will recover your project and your data."
                className="bg-green-500 text-white dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700"
                open={open}
                loading={loading}
                handleOpen={() => setOpen(!open)}
                onClick={handleRecover}
              >
                {/* Recover Button */}
                <Button
                  size={"sm"}
                  variant={"ghost"}
                  disabled={loading}
                  className="bg-background-80 dark:bg-background-90"
                  // onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.stopPropagation()}
                >
                  Recover
                </Button>
              </AlertDialogBox>
            ) : (
              // If the project is not deleted, show the delete button
              <AlertDialogBox
                description="This will delete your project and send to trash."
                className="bg-red-500 text-white dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700"
                open={open}
                loading={loading}
                handleOpen={() => setOpen(!open)}
                onClick={handleDelete}
              >
                {/* Delete Button */}
                <Button
                  size={"sm"}
                  variant={"ghost"}
                  disabled={loading}
                  className="bg-background-80 dark:bg-background-90 z-10"
                >
                  Delete
                </Button>
              </AlertDialogBox>
            )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;

