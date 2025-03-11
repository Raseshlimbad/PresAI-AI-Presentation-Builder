'use client'

import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSlideStore } from "@/store/useSlideStore";
import { Project } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

type Props = {
  recentProjects: Project[];
};

// Recent Open Component
const RecentOpen = ({ recentProjects }: Props) => {
  const router = useRouter();
  const { setSlides } = useSlideStore();
  // Handle Click
  const handleClick = (projectId: string, slides: JsonValue) => {
    // If the projectId or slides are not found, show an error toast
    if (!projectId || !slides) {
      toast.error("Projects not found", {
        description: "Please try again",
      });
      return;
    }
    // Set the slides
    setSlides(JSON.parse(JSON.stringify(slides)));
    // Push the projectId to the router
    router.push(`/presentation/${projectId}`);
    return;
  };
  return (
    <>
      {recentProjects.length > 0 && (
        // Sidebar Group
        <SidebarGroup>
          {/* Sidebar Group Label */}
          <SidebarGroupLabel>Recently Opened</SidebarGroupLabel>
          {/* Sidebar Menu */}
          <SidebarMenu>
            {/* Map through the recent projects */}
            {recentProjects.map((item) => (
              // Sidebar Menu Item
              <SidebarMenuItem key={item.id}>
                {/* Sidebar Menu Button */}
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className="hover:bg-primary-80"
                >
                  {/* Button */}
                  <Button
                    variant="link"
                    className="text-xs items-center justify-center"
                    onClick={() => handleClick(item.id, item.slides)}
                  >
                    {/* Title */}
                    <span>{item.title}</span>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      )}
    </>
  );
};

export default RecentOpen;
