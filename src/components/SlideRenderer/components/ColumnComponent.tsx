"use client";

import SlideRenderer from "@/components/SlideRenderer";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ContentItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

interface ColumnComponentProps {
  content: ContentItem[];
  className?: string;
}

const ColumnComponent = ({ content, className }: ColumnComponentProps) => {
  const [columns, setColumns] = useState<ContentItem[]>([]);

  useEffect(() => {
    setColumns(content.length > 0 ? content : []);
  }, [content]);

  return (
    <div className="relative w-full h-full">
      <ResizablePanelGroup direction="horizontal" className={cn("h-full w-full flex", className)}>
        {columns.map((item, index) => (
          <React.Fragment key={item.id}>
            <ResizablePanel minSize={20} defaultSize={100 / columns.length}>
              <div className={cn("h-full w-full", className)}>
                <SlideRenderer content={item} />
              </div>
            </ResizablePanel>
            {index < columns.length - 1 && <ResizableHandle />}
          </React.Fragment>
        ))}
      </ResizablePanelGroup>
    </div>
  );
};

export default ColumnComponent;
