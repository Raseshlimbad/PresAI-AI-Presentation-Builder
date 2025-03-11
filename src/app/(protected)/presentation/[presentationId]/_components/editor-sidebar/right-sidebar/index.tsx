"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSlideStore } from "@/store/useSlideStore";
import { LayoutTemplate, Palette, Type } from "lucide-react";
import React from "react";
import LayoutChooser from "./tabs/LayoutChooser";
import { ScrollArea } from "@/components/ui/scroll-area";
import { component } from "@/lib/constants";
import ComponentCard from "./tabs/components-tab/ComponentPreview";
import ThemeChooser from "./tabs/ThemeChooser";

// Editor Sidebar - Right Sidebar
const EditorSidebar = () => {
  const { currentTheme } = useSlideStore();

  return (
    // <div className="fixed top-1/2 right-0 transform translate-y-1/2 z-10">
    <div className="fixed inset-y-0 right-0 flex items-center z-10">
      <div className="rounded-xl border-r-0 border border-background-70 shadow-lg p-2 flex flex-col items-center space-y-4">
      {/* Popover - Layout Chooser ############################################################################################*/}
        <Popover>
          <PopoverTrigger asChild>
            {/* Button - Layout Chooser */}
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full"
            >
              <LayoutTemplate className="h-5 w-5" />
              <span className="sr-only">Choose Layout</span>
            </Button>
          </PopoverTrigger>
          {/* Popover Content - Layout Chooser */}
          <PopoverContent side="left" align="center" className="w-[480px] p-0">
            {/* Layout Chooser */}
            <LayoutChooser />
          </PopoverContent>
        </Popover>

        {/* Popover - Components Chooser ############################################################################################*/}
        <Popover>
          <PopoverTrigger asChild>
            {/* Button - Components Chooser */}
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full"
            >
              {/* Type icon */}
              <Type className="h-5 w-5" />
              <span className="sr-only">Choose Components</span>
            </Button>
          </PopoverTrigger>
          {/* Popover Content - Components Chooser */}
          <PopoverContent
            side="left"
            align="center"
            className="w-[480px] p-0"
            // style={{
            //   backgroundColor: currentTheme.backgroundColor,
            //   color: currentTheme.fontColor,
            // }}
          >
            {/* Scroll Area - Components Chooser */}
            <ScrollArea className="h-[400px]">
              <div
                className="p-4 flex flex-col space-y-6"
                style={{
                  backgroundColor: currentTheme.slideBackgroundColor,
                }}
              >
                {/* Map through the components */}
                {component.map((group, index) => (
                  <div key={index} className="space-y-2">
                    {/* Group Name */}
                    <h3 className="text-sm font-medium">
                      {/* removed : className: text-muted-foreground */}
                      {group.name}
                    </h3>
                    {/* Grid - Components */}
                    <div className="grid grid-cols-3 gap-4">
                      {/* Map through the components */}
                      {group.components.map((item) => (
                        <ComponentCard key={item.componentType} item={item} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </PopoverContent>
        </Popover>

        {/* Popover - Theme Chooser ############################################################################################*/}
        <Popover>
          <PopoverTrigger asChild>
            {/* Button - Theme Chooser */}
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full"
            >
              {/* Palette icon */}
              <Palette className="h-5 w-5" />
              <span className="sr-only">Change Style</span>
            </Button>
          </PopoverTrigger>

          <PopoverContent side="left" align="center" className="w-80 p-0">
            {/* Theme Chooser */}
            <ThemeChooser />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default EditorSidebar;
