import { ContentItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import React from "react";
import { useDrag } from "react-dnd";

type ComponentItemProps = {
  type: string;
  componentType: string;
  name: string;
  icon: string;
  component: ContentItem;
};

// ComponentCard Component Props
const ComponentCard = ({ item }: { item: ComponentItemProps }) => {

  // Drag and Drop
  const [{isDragging}, drag] = useDrag({
    type: 'CONTENT_ITEM',
    item:item,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    })

  // Render the ComponentCard
  return (
    // ComponentCard Container
    <div
    ref = {drag as unknown as React.LegacyRef<HTMLDivElement>}
     className={cn("border rounded-lg", isDragging ? "opacity-50" : "opacity-100")}
    >
      {/* ComponentCard Button */}
      <button
        className={cn(
          "flex flex-col items-center cursor-grab active:cursor-grabbing gap-2 p-2 rounded-lg hover:bg-primary-10 transition-all duration-200",
          "text-center w-full",
          "hover:scale-105 transform"
        )}
      >
        <div className="w-full aspect-[16/9] rounded-md border bg-gray-100 dark:bg-gray-700 p-2 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center flex-col gap-2">
            {/* ComponentCard Icon */}
            <span className="text-2xl text-primary text-gray-500 dark:text-gray-100">{item.icon}</span>
          </div>
        </div>
        {/* ComponentCard Name */}
        <span className="text-xs text-gray-500 dark:text-gray-100 font-medium">{item.name}</span>
      </button>
    </div>
  );
};

export default ComponentCard;
