import { cn } from "@/lib/utils";
import { useSlideStore } from "@/store/useSlideStore";
import React from "react";

interface TableOfContentsProps {
  items: string[];
  className?: string;
}

// TableOfContents component (Display Only)
const TableOfContents: React.FC<TableOfContentsProps> = ({ items, className }) => {
  const { currentTheme } = useSlideStore();

  return (
    <nav className={cn("space-y-2 dark:text-white", className)} style={{ color: currentTheme.fontColor }}>
      {items.map((item, index) => (
        <div key={index} className="cursor-pointer hover:underline">
          {item}
        </div>
      ))}
    </nav>
  );
};

export default TableOfContents;
