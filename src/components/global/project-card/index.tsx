"use client";

import { JsonValue } from "@prisma/client/runtime/library";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { itemVariants, themes } from "@/lib/constants";
import { useSlideStore } from "@/store/useSlideStore";
import { useRouter } from "next/navigation";
import ThumbnailPreview from "./thumbnail-preview";
import { timeAgo } from "@/lib/utils";
import AlertDialogBox from "../alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  deleteProject,
  recoverProject,
  updateProjectTitle,
} from "@/actions/project";
import { Loader2, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

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

  const [isRenaming, setIsRenaming] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const [isClient, setIsClient] = useState(false);

  // Add a useEffect to handle project title updates
  useEffect(() => {
    if (newTitle !== title) {
      setNewTitle(title); // Reset the newTitle if the prop 'title' changes
    }
  }, [title]);

  useEffect(() => {
    setIsClient(true); // Ensure rendering is done after the client-side hydration
  }, []);

  if (!isClient) {
    return null; // Prevent SSR mismatch before client is ready
  }

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
  };

  // Handle Update Project Title
  const handleUpdateTitle = async () => {
    if (!newTitle || newTitle === title) {
      toast.error("Title cannot be empty or same as current title");
      return;
    }
    setLoading(true);
    try {
      const response = await updateProjectTitle(projectId, newTitle);
      if (response.status === 200) {
        toast.success("Title updated successfully");
        setIsRenaming(false);
      } else {
        toast.error("Failed to update title");
      }
    } catch (error) {
      console.log("Error updating title", error);
      toast.error("Failed to update title");
    }
    setLoading(false);
  };

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
            {newTitle}
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

                  {/* 3-Dots Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      {/* <Button variant="ghost" size="icon"> */}
                      <MoreHorizontal />
                      {/* </Button> */}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setIsRenaming(true)}>
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setOpen(true)}>
                        {isDelete ? "Recover" : "Delete"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </AlertDialogBox>
              )}

              {/* Rename Project Modal */}
              <Dialog open={isRenaming} onOpenChange={setIsRenaming}>
                <DialogTrigger />
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Rename Project</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="Enter new title"
                    />
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={handleUpdateTitle}
                      variant="default"
                      disabled={loading} // Disable the button while loading
                    >
                      {loading ? (
                        <Loader2 className="animate-spin w-5 h-5" /> // Render spinner during loading
                      ) : (
                        "Update Title" // Show text when not loading
                      )}
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => setIsRenaming(false)}
                    >
                      Cancel
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              {/* )} */}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
