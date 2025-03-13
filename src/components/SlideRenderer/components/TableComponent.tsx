"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useSlideStore } from "@/store/useSlideStore";
import React, { useEffect, useState } from "react";

interface TableComponentProps {
  content: string[][];
}

const TableComponent = ({ content }: TableComponentProps) => {
  const { currentTheme } = useSlideStore();
  const [colSizes, setColSizes] = useState<number[]>([]);

  /** Ensure column sizes match table data */
  useEffect(() => {
    if (content.length > 0) {
      setColSizes(new Array(content[0].length).fill(100 / content[0].length));
    }
  }, [content]);

  return (
    <div
      className="w-full h-full relative"
      style={{
        background:
          currentTheme.gradientBackground || currentTheme.backgroundColor,
        borderRadius: "8px",
      }}
    >
      <div className="w-full overflow-x-auto text-xs border rounded-md">
        {content.map((row, rowIndex) => (
          <div key={rowIndex} className="flex border-b last:border-b-0" style={{ minHeight: "40px" }}>
            <ResizablePanelGroup direction="horizontal" className="flex w-full">
              {row.map((cell, colIndex) => (
                <React.Fragment key={colIndex}>
                  {colIndex > 0 && <ResizableHandle />}
                  <ResizablePanel
                    defaultSize={colSizes[colIndex] || 100 / row.length}
                    className="flex items-center justify-center"
                  >
                    <div
                      className="w-full h-full p-2 text-xs text-center border-r border-gray-300"
                      style={{ color: currentTheme.fontColor }}
                    >
                      {cell || "-"}
                    </div>
                  </ResizablePanel>
                </React.Fragment>
              ))}
            </ResizablePanelGroup>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableComponent;
