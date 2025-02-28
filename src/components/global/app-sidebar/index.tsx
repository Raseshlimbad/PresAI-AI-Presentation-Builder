'use client'

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
import React from "react";
import NavMain from "./nav-main";
import { data } from "@/lib/constants";
import RecentOpen from "./recent-open";
import NavFooter from "./nav-footer";
import { useTheme } from "next-themes";

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
  return (
    <Sidebar
    collapsible="icon"
    className="max-w-[212px] bg-background-90"
    {...props}>
        <SidebarHeader className="pt-6 px-3 pb-0">
        <SidebarMenuButton
        size={'lg'}
        className="data-[state=open]:text-sidebar-accent-foreground flex justify-center">
        {/* <div className="flex aspect-square size-8 items-center justify-normal text-sidebar-primary-foreground">
            <Avatar className="h-12 w-20">
              <AvatarImage
                src={ "/PresAi_dark.png" }
                alt="PresAI-logo"
              />
                <AvatarFallback className="">PresAI</AvatarFallback>
            </Avatar>
        </div> */}

        {theme === 'dark' ? (
          <Image 
        className="text-sidebar-primary-foreground"
        src={"/PresAi_light-removebg.png"}
        height={70}
        width={140}
        alt="PresAI"
        />
      ) : (
          <Image 
        className="text-sidebar-primary-foreground"
        src={"/PresAi_dark-removebg.png"}
        height={70}
        width={140}
        alt="PresAI"
        />
        )}
        {/* <span className="truncate text-primary text-3xl font-semibold pl-2">
            PresAI
        </span> */}
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent className="px-3 mt-10 gap-y-6">
        <NavMain items={data.navItems}/>
        <RecentOpen recentProjects={recentProjects}/>
      </SidebarContent>
      <SidebarFooter>
        <NavFooter prismaUser={user}/>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
