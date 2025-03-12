"use client";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Project, User } from "@prisma/client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import NavMain from "./nav-main";
import { data } from "@/lib/constants";
import RecentOpen from "./recent-open";
import NavFooter from "./nav-footer";
import { useTheme } from "next-themes";
import Link from "next/link";

const AppSidebar = ({
  recentProjects,
  user,
  ...props
}: {
  recentProjects: Project[];
} & {
  user: User;
} & React.ComponentProps<typeof Sidebar>) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Prevent hydration mismatch by not rendering image until theme is available
    // return <div style={{ height: "70px", width: "140px" }} />;
    return (
      <div className="h-[70px] w-[140px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-300"></div>
      </div>
    );
  }
  return (
    // Sidebar Component
    <Sidebar
      collapsible="icon"
      className="max-w-[212px] bg-background-90"
      {...props}
    >
      {/* Sidebar Header */}
      <SidebarHeader className="pt-6 px-3 pb-0">
        {/* Sidebar Menu Button */}
        <SidebarMenuButton
          size={"lg"}
          className="data-[state=open]:text-sidebar-accent-foreground flex justify-center"
        >
          {/* <div className="flex aspect-square size-8 items-center justify-normal text-sidebar-primary-foreground">
            <Avatar className="h-12 w-20">
              <AvatarImage
                src={ "/PresAi_dark.png" }
                alt="PresAI-logo"
              />
                <AvatarFallback className="">PresAI</AvatarFallback>
            </Avatar>
        </div> */}
        {/* Link to the dashboard */}
          <Link href="/dashboard">
          {theme === "light" ? (
            <Image
              className="text-sidebar-primary-foreground"
              src={"/PresAi_dark-removebg.png"}
              height={70}
              width={140}
              alt="PresAI"
              suppressHydrationWarning
            />
          ) : (
            <Image
              className="text-sidebar-primary-foreground"
              src={"/PresAi_light-removebg.png"}
              height={70}
              width={140}
              alt="PresAI"
              suppressHydrationWarning
            />
          )}
          </Link>
          {/* <span className="truncate text-primary text-3xl font-semibold pl-2">
            PresAI
        </span> */}
        </SidebarMenuButton>
      </SidebarHeader>
      {/* Sidebar Content */}
      <SidebarContent className="mt-10 gap-y-6">
        {/* Nav Main */}
        <NavMain items={data.navItems} />
        {/* Recent Open */}
        <RecentOpen recentProjects={recentProjects} />
      </SidebarContent>
      {/* Sidebar Footer */}
      <SidebarFooter>
        {/* Nav Footer */}
        <NavFooter prismaUser={user} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
