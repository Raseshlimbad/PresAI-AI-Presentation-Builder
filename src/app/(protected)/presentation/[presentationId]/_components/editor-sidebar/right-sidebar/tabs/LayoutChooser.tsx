"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { layouts } from "@/lib/constants";
import { Layout } from "@/lib/types";
import { useSlideStore } from "@/store/useSlideStore";
import React from "react";
import { useDrag } from "react-dnd";
import LayoutPreviewItem from "./components-tab/LayoutPreviewItem";

export const DraggableLayoutItem = ({
  name,
  icon,
  type,
  component,
  layoutType,
}: Layout) => {
  const { currentTheme } = useSlideStore();

  // Use the drag and drop hook to drag and drop the layout
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "LAYOUT",
    item: {
      layoutType,
      name,
      icon,
      component,
      type: "LAYOUT"  // Add explicit type for drop handling
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // Return the layout item
  return (
    <div
      ref={drag as unknown as React.LegacyRef<HTMLDivElement>}
      className="border rounded-lg"
      style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: currentTheme.slideBackgroundColor,
      }}
    >
      {/* Layout Preview Item */}
      <LayoutPreviewItem
        name={name}
        Icon={icon}
        type={type}
        component={component}
      />
    </div>
  );
};

// Layout Chooser
const LayoutChooser = () => {
  const { currentTheme } = useSlideStore();
  return (
    // Scroll Area - Layout Chooser
    <ScrollArea
      className="h-[400px]"
      style={{
        backgroundColor: currentTheme.slideBackgroundColor,
      }}
    >
      {/* Layout Chooser Container */}
      <div className="p-4">
        {/* Layout Groups */}
        {layouts.map((group) => (
          <div key={group.name} className="mb-4">
            {/* Layout Group Name */}
            <h3 className="text-sm font-medium my-4">{group.name}</h3>
            {/* Layout Items */}
            <div className="grid grid-cols-3 gap-2">
              {group.layouts.map((layout) => (
                // Draggable Layout Item
                <DraggableLayoutItem key={layout.layoutType} {...layout} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default LayoutChooser;
