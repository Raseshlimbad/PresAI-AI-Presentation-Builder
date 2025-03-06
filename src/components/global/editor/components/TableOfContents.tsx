import { cn } from "@/lib/utils";
import { useSlideStore } from "@/store/useSlideStore";
import React from "react";

interface TableOfContentsProps {
  items: string[];
  className?: string;
  onItemClick: (id: string) => void;
}

const TableOfContents = ({
  items,
  className,
  onItemClick,
}: TableOfContentsProps) => {
  const { currentTheme } = useSlideStore();
  return (
    <nav
      className={cn("space-y-2", className)}
      style={{ color: currentTheme.fontColor }}
    >
      {items.map((item, index) => (
        <div key={index} className={cn('cursor-pointer hover:underline')}>
          {item}
        </div>
      ))}
    </nav>
  );
};

export default TableOfContents;
