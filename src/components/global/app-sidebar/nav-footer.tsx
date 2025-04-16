/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { buySubscription } from "@/actions/lemonSqueezy";
import { Button } from "@/components/ui/button";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import { User } from "@prisma/client";
import { useState } from "react";

const NavFooter = ({ prismaUser }: { prismaUser: User }) => {
  const { user, isSignedIn, isLoaded } = useUser();
  const [loading, setLoading] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(prismaUser);

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  const handleUpgrading = async () => {
    setLoading(true);
    try {
      const res = await buySubscription(prismaUser.id);
    } catch (error) {}
  };

  const handleUserUpdate = (updatedUser: User) => {
    setCurrentUser(updatedUser);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex flex-col items-start group-data-[collapsible=icon]:hidden">
        {!prismaUser.subscription && (
          <div className="flex flex-col items-start p-2 pb-3 gap-4 bg-background-80">
            <div className="flex flex-col items-start gap-1">
              <p className="text-base font-bold">
                Get <span className="text-presai">Creative AI</span>
              </p>
              <span className="text-sm dark:text-secondary">
                Unlock all features including AI and more
              </span>
              <div className="w-full bg-presai-gradient p-[1px] rounded-full">
                <Button
                  className="w-full border border-[#FFB4A2] bg-background-80 hover:bg-background-90 text-primary rounded-full font-bold"
                  variant={"default"}
                  size={"lg"}
                  onClick={handleUpgrading}
                >
                  {loading ? "Upgrading..." : "Upgrade"}
                </Button>
              </div>
            </div>
          </div>
        )}
        {/* <SignedIn>
              <SidebarMenuButton
                size={"lg"}
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <UserButton />
                <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                    <span className="truncate font-semibold">
                        {prismaUser.name || prismaUser.username || user?.username}
                    </span>
                    <span className="truncate dark:text-secondary">
                        {prismaUser.email || user?.emailAddresses[0]?.emailAddress}
                    </span>
                </div>
              </SidebarMenuButton>
            </SignedIn> */}

        <SignedIn>
          <SidebarMenuButton
            size={"lg"}
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            onClick={() => setShowProfileModal(true)}
          >
            <UserButton />
            <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
              <span className="truncate font-semibold">
                {currentUser.name || currentUser.username || user?.username}
              </span>
              <span className="truncate dark:text-secondary">
                {currentUser.email || user?.emailAddresses[0]?.emailAddress}
              </span>
            </div>
          </SidebarMenuButton>
        </SignedIn>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default NavFooter;
