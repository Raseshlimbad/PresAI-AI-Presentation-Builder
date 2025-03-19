"use client";

import { Button } from "@/components/ui/button";
import { useSlideStore } from "@/store/useSlideStore";
import { Home, Play, Share, Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import PresentationMode from "./PresentationMode";

// Server Action Imports (use these server actions)
import { getProjectTitle, updateProjectTitle } from "@/actions/project";  // assuming this is the path to the server actions

type Props = {
  presentationId: string;
};

const Navbar = ({ presentationId }: Props) => {
  const { currentTheme } = useSlideStore();
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const [projectTitle, setProjectTitle] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);  // Loading state for fetching title
  const [isUpdating, setIsUpdating] = useState(false);  // Loading state for updating title

  // Fetch project title when component mounts
  useEffect(() => {
    const fetchProjectTitle = async () => {
      setIsLoading(true);
      const response = await getProjectTitle(presentationId);
      if (response.status === 200 && response.data) {
        setProjectTitle(response.data.title);
        setNewTitle(response.data.title);  // Set newTitle to the fetched title
      } else {
        toast.error("Error", {description: "Failed to fetch project title"});
      }
      setIsLoading(false);
    };

    fetchProjectTitle();
  }, [presentationId]);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/share/${presentationId}`
    );
    toast.success("Link copied", { description: "Link Copied to Clipboard" });
  };

  const handleEditTitle = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const handleTitleSubmit = async () => {
    if (newTitle.trim() === "") {
      toast.error("Error", {description: "Title cannot be empty"});
      return;
    }

    setIsUpdating(true);  // Set updating state to true while the title is being updated

    const response = await updateProjectTitle(presentationId, newTitle);

    if (response.status === 200) {
      setProjectTitle(newTitle);  // Update the displayed title
      toast.success("Success" ,{description: "Project title updated successfully"});
      setIsEditing(false);
    } else { 
      toast.error("Error", {description: "Failed to update project title"});
    }

    setIsUpdating(false);  // Reset updating state after the update is complete
  };

  // Handle the Enter key to submit title update
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleTitleSubmit();
    }
  };

  return (
    <nav
      className="fixed top-0 right-0 z-50 w-full h-20 flex justify-between items-center px-7 py-4 border-b"
      style={{
        backgroundColor:
          currentTheme.navbarColor || currentTheme.backgroundColor,
        color: currentTheme.accentColor,
      }}
    >
      {/* Return Home Button */}
      <Link href={"/dashboard"} passHref>
        <Button
          variant={"outline"}
          className="flex items-center gap-2"
          style={{
            backgroundColor: currentTheme.backgroundColor,
          }}
        >
          {/* Return Home Button Icon */}
          <Home />
          {/* Return Home Button Text */}
          <span className="hidden sm:inline">Return Home</span>
        </Button>
      </Link>

      {/* Display Project Title and Handle Edit on Double Click */}
      <div
        className="text-lg font-semibold hidden sm:block cursor-pointer"
        onDoubleClick={handleEditTitle}
      >
        {isLoading ? (
          <Loader2 className="animate-spin w-5 h-5" />  // Loader while fetching title
        ) : isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={handleTitleChange}
            onBlur={handleTitleSubmit}  // Update on blur (lose focus)
            onKeyDown={handleKeyPress}  // Handle Enter key press
            autoFocus
            className="border-2 p-1 rounded-md w-[600px]"
          />
        ) : projectTitle ? (
          projectTitle
        ) : (
          "No Title"  // Fallback if the title is empty
        )}

        {/* Loader when updating the title */}
        {isUpdating && (
          <div className="ml-2 inline-block">
            <Loader2 className="animate-spin w-5 h-5" />
          </div>
        )}
      </div>

      {/* Copy Link and Present Button */}
      <div className="flex items-center gap-4">
        <Button
          variant={"outline"}
          onClick={handleCopy}
          style={{
            backgroundColor: currentTheme.backgroundColor,
          }}
        >
          <Share className="w-4 h-4" />
        </Button>

        {/* Present Button */}
        <Button
          variant={"default"}
          className="flex items-center gap-2"
          onClick={() => setIsPresentationMode(true)}
        >
          <Play className="w-4 h-4 " />
          <span className="hidden sm:inline">Present</span>
        </Button>
      </div>

      {/* Presentation Mode */}
      {isPresentationMode && <PresentationMode onClose={() => setIsPresentationMode(false)} />}
    </nav>
  );
};

export default Navbar;
