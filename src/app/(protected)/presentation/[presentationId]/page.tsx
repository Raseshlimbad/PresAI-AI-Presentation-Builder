"use client";

import { getProjectById } from "@/actions/project";
import { themes } from "@/lib/constants";
import { useSlideStore } from "@/store/useSlideStore";
import { Loader2 } from "lucide-react";
import { useTheme } from "next-themes";
import { redirect, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Navbar from "./_components/editor-sidebar/Navbar/Navbar";
import LayoutPreview from "./_components/editor-sidebar/left-sidebar/LayoutPreview";
import Editor from "./_components/editor/Editor";
import EditorSidebar from "./_components/editor-sidebar/right-sidebar";

const Page = () => {
  // WIP: Create the presentation view

  const params = useParams();
  const { setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const { setSlides, currentTheme, setCurrentTheme, setProject } =
    useSlideStore();

  // Fetch the project
  useEffect(() => {
    (async () => {
      try {
        // Get the project
        const res = await getProjectById(params.presentationId as string);
        // If the project is not found, redirect to the dashboard
        if (res.status !== 200 || !res.data) {
          toast.error("Error", {
            description: "Uable to fetch project",
          });
          redirect("/dashboard");
        }

        // Find the theme
        const findTheme = themes.find(
          (theme) => theme.name === res.data?.themeName
        );

        // Set the Data
        setCurrentTheme(findTheme || themes[0]);
        setTheme(findTheme?.type === "dark" ? "dark" : "light");
        setProject(res.data);
        setSlides(JSON.parse(JSON.stringify(res.data?.slides)));
      } catch (error) {
        console.log(error);
        // If the error is an instance of Error, show the error message
        toast.error("Error", {
          description: "Unexpected error occured",
        });
      } finally {
        // Set the loading to false
        setIsLoading(false);
      }
    })();
  }, []);

  // If the project is loading, show a loading indicator
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  // If the project is not loading, show the presentation
  return (
    // Wrap the presentation in a DndProvider
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen flex flex-col">
        {/* Navbar */}
        <Navbar presentationId={params.presentationId as string} />

        {/* Main Content */}
        <div
          className="flex-1 flex overflow-hidden pt-16"
          style={{
            backgroundColor: currentTheme.backgroundColor,
            color: currentTheme.accentColor,
            fontFamily: currentTheme.fontFamily,
          }}
        >
          {/* Layout Preview - Left Sidebar*/}
          <LayoutPreview /> 

          {/* Editor */}
          <div className="flex-1 ml-64 pr-16">
            <Editor 
            isEditable={true}
            />
          </div>

          {/* Editor Sidebar - Right Sidebar*/}
          <EditorSidebar />
        </div>
      </div>
    </DndProvider>
  );
};

export default Page;
