"use client";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavMain = ({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) => {
  const pathname = usePathname();
  return (
    // Sidebar Group
    <SidebarGroup>
      {/* Sidebar Menu */}
      <SidebarMenu>
        {/* Map through the items */}
        {items.map((item) => (
          // Sidebar Menu Item
          <SidebarMenuItem key={item.title}>
            {/* Sidebar Menu Button */}
            <SidebarMenuButton
              asChild
              tooltip={item.title}
              className={`${pathname.includes(item.url) && "bg-muted"}`}
            >
              {/* Link to the item */}
              <Link
                href={item.url}
                className={`test-lg ${
                  pathname.includes(item.url) && "font-bold"
                }`}
              >
                {/* Icon */}
                <item.icon className="text-lg" />
                {/* Title */}
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default NavMain;
