import { ContentItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useSlideStore } from "@/store/useSlideStore";
import React from "react";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";

// DropZone Component Props
type DropZoneProps = {
  index: number;
  slideId: string;
  parentId: string;
};

// DropZone Component
const DropZone = ({ index, slideId, parentId }: DropZoneProps) => {
  const { addComponentInSlide } = useSlideStore();

  // DropZone Component
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ["CONTENT_ITEM"],
    // Drop
    drop: (item: {
      type: string;
      componentType: string;
      label: string;
      component: ContentItem;
    }) => {
      // If the item is a component, add the component to the slide
      if (item.type === "component") {
        addComponentInSlide(
          slideId,
          { ...item.component, id: uuidv4() },
          index,
          parentId
        );
      }
    },
    // Collect
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  // Render the DropZone
  return (
    // DropZone Container
    <div
      ref={drop as unknown as React.RefObject<HTMLDivElement>}
      className={cn(
        'h-3 w-full transition-all duration-200',
        isOver && canDrop ? 'border-green-500 bg-green-100' : 'border-gray-300',
        'hover:border-green-300'
      )}
    >
      {/* DropZone Content */}
      {isOver && canDrop && (
        <div className="w-full h-full flex text-sm items-center justify-center text-green-600">
            Drop here
        </div>
     )}
    </div>
  );
};

export default DropZone;
