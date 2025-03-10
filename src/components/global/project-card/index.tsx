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

  const handleNavigation = () => {
    setSlides(JSON.parse(JSON.stringify(slideData)));
    router.push(`/presentation/${projectId}`);
  };

  const handleRecover = async () => {
    setLoading(true);
    if (!projectId) {
      setLoading(false);
      toast.error("Error", {
        description: "Project ID is required",
      });
      return;
    }
    try {
      const res = await recoverProject(projectId);
      if (res.status !== 200) {
        toast.error("Oppse!", {
          description: res.error || "Something went wrong",
        });
      }
      setOpen(false);

      // Need to refresh states and user is recovering project
      router.refresh();
      toast.success("Success", {
        description: "Project recovered successfully",
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Oppse!", {
        description: "Something went wrong, Please contact support",
      });
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    if (!projectId) {
      setLoading(false);
      toast.error("Error", {
        description: "Project ID is required",
      });
    }

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

  const theme = themes.find((theme) => theme.name === themeName) || themes[0];
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

      <div className="w-full">
        <div className="space-y-1">
          <h3 className="font-semibold text-base text-primary line-clamp-1">
            {title}
          </h3>
          <div className="flex w-full justify-between items-center gap-2">
            <p
              className="text-sm text-muted-foreground"
              suppressHydrationWarning
            >
              {timeAgo(createdAt)}
            </p>

            {/* Alert Dilogue Box */}
            <div onClick={(e) => e.stopPropagation()}>
            {isDelete ? (
              <AlertDialogBox
                description="This will recover your project and your data."
                className="bg-green-500 text-white dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700"
                open={open}
                loading={loading}
                handleOpen={() => setOpen(!open)}
                onClick={handleRecover}
              >
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
              <AlertDialogBox
                description="This will delete your project and send to trash."
                className="bg-red-500 text-white dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700"
                open={open}
                loading={loading}
                handleOpen={() => setOpen(!open)}
                onClick={handleDelete}
              >
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

