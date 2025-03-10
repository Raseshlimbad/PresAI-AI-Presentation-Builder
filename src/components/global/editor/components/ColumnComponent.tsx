"use client";

import { MasterRecursiveComponent } from "@/app/(protected)/presentation/[presentationId]/_components/editor/MasterRecursiveComponent";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ContentItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { updateSlides } from "@/actions/project";

//   props for the column component
interface ColumnComponentProps {
  content: ContentItem[];
  className?: string;
  isPreview?: boolean;
  isEditable?: boolean;
  slideId: string;
  onContentChange: (
    contentId: string,
    newContent: string | string[] | string[][]
  ) => void;
}

//   column component
const ColumnComponent = ({
  content,
  className,
  slideId,
  onContentChange,
  isPreview = false,
  isEditable = false,
}: ColumnComponentProps) => {
  const [columns, setColumns] = useState<ContentItem[]>([]);
  const resizeTimerRef = useRef<NodeJS.Timeout | null>(null);

  //   create default columns
  const createDefaultColumns = (count: number) => {
    //   create an array of the given count
    return Array(count)
      .fill(null)
      .map(() => ({
        id: uuidv4(),
        type: "paragraph" as const,
        name: "Paragraph",
        content: "",
        placeholder: "Start typing...",
      }));
  };

  //   if the content is empty, create default columns to set colums default value
  useEffect(() => {
    if (content.length === 0) {
      setColumns(createDefaultColumns(2));
    } else {
      setColumns(content);
    }
  }, [content]);


  // Auto-save size changes
  const saveSizeChanges = useCallback(async () => {
    if (!isEditable) return;

    console.log("Auto-saving column sizes...");
    await updateSlides(slideId, JSON.parse(JSON.stringify(columns)));
  }, [columns, slideId, isEditable]);

  // Handle resizing and auto-save after delay
  const handleResize = () => {
    if (resizeTimerRef.current) {
      clearTimeout(resizeTimerRef.current);
    }

    resizeTimerRef.current = setTimeout(() => {
      saveSizeChanges();
    }, 2000); // Auto-save after 2 seconds of inactivity
  };

  return (
    <div className="relative w-full h-full">
      <ResizablePanelGroup
        direction="horizontal"
        className={cn(
          "h-full w-full flex",
          isEditable && "!border-0",
          className
        )}
      >
        {/* render the columns */}
        {columns.map((item, index) => (
          <React.Fragment key={item.id}>
            {/* render the resizable panel */}
            <ResizablePanel minSize={20} defaultSize={100 / columns.length} onResize={handleResize}>
              <div className={cn("hfull w-full", item, className)}>
                {/* render the master recursive component to edit the content*/}
                <MasterRecursiveComponent
                  isPreview={isPreview}
                  isEditable={isEditable}
                  content={item}
                  onContentChange={onContentChange}
                  slideId={slideId}
                />
              </div>
            </ResizablePanel>
            {/* render the resizable handle to resize the columns */}
            {index < columns.length - 1 && isEditable && (
              <ResizableHandle withHandle={!isPreview} />
            )}
          </React.Fragment>
        ))}
      </ResizablePanelGroup>
    </div>
  );
};

export default ColumnComponent;
