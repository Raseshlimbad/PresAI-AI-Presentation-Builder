"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useSlideStore } from "@/store/useSlideStore";
import React, { useEffect, useState, useRef } from "react";

/** Define the content structure explicitly */
type TableRow = Record<string, string | TableRow[]>; // Object with string values or nested arrays

interface TableComponentProps {
  content: string | string[][] | TableRow[]; // Handles nested objects properly
  onChange: (newContent: string[][]) => void;
  isPreview?: boolean;
  isEditable?: boolean;
  initialRowSize?: number;
  initialColSize?: number;
}

const TableComponent = ({
  content,
  onChange,
  isPreview = false,
  isEditable = true,
  initialRowSize = 3,
  initialColSize = 3,
}: TableComponentProps) => {
  const { currentTheme } = useSlideStore();
  const [colSizes, setColSizes] = useState<number[]>([]);
  const autosaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  const flattenContent = (data: TableRow[]): string[][] => {
    if (!Array.isArray(data) || data.length === 0) return [];
  
    /** Convert objects to row data, excluding "id" and only including values at "0", "1", "2", ... */
    const processRows = (obj: TableRow): string[] => {
      return Object.keys(obj)
        .filter((key) => key === "0" || key === "1" || key === "2") // Only keep keys "0", "1", "2"
        .map((key) => obj[key] as string); // Return values for those keys
    };
  
    return data.map(processRows);
  };

  
  /** 🔥 Initialize tableData recursively */
  const initializeTableData = () => {
    if (Array.isArray(content) && content.length > 0 && typeof content[0] === "object") {
      return flattenContent(content as TableRow[]);
    }

    if (typeof content === "string") {
      return content.split("\n").map((row) => row.split(","));
    }

    return Array.from({ length: initialRowSize }, () =>
      Array(initialColSize).fill("")
    );
  };

  const [tableData, setTableData] = useState<string[][]>(initializeTableData);

  /** Update cell data */
  const updateCell = (rowIndex: number, colIndex: number, value: string) => {
    if (!isEditable || isPreview) return;

    const newData = tableData.map((row, rIndex) =>
      rIndex === rowIndex
        ? row.map((cell, cIndex) => (cIndex === colIndex ? value : cell))
        : row
    );

    setTableData(newData);
    triggerAutosave(newData);
  };

  /** Handle row add & delete */
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    rowIndex: number
  ) => {
    if (!isEditable || isPreview) return;

    if (e.key === "Enter") {
      e.preventDefault();
      const newRow = Array(tableData[0].length).fill("");
      const updatedTable = [
        ...tableData.slice(0, rowIndex + 1),
        newRow,
        ...tableData.slice(rowIndex + 1),
      ];
      setTableData(updatedTable);
      triggerAutosave(updatedTable);
    }

    if (e.key === "Backspace" && tableData.length > 1) {
      const isEmptyRow = tableData[rowIndex].every((cell) => cell === "");
      if (isEmptyRow) {
        e.preventDefault();
        const updatedTable = tableData.filter((_, rIndex) => rIndex !== rowIndex);
        setTableData(updatedTable);
        triggerAutosave(updatedTable);
      }
    }
  };

  /** Handle column resizing */
  useEffect(() => {
    if (tableData.length > 0) {
      setColSizes((prevSizes) =>
        prevSizes.length === tableData[0].length
          ? prevSizes
          : new Array(tableData[0].length).fill(100 / tableData[0].length)
      );
    }
  }, [tableData]);

  /**  Autosave function */
  const triggerAutosave = (updatedData: string[][]) => {
    if (autosaveTimerRef.current) {
      clearTimeout(autosaveTimerRef.current);
    }

    autosaveTimerRef.current = setTimeout(() => {
      onChange(updatedData);
    }, 1500);
  };

  useEffect(() => {
    return () => {
      if (autosaveTimerRef.current) {
        clearTimeout(autosaveTimerRef.current);
      }
    };
  }, []);

  return (
    <div
      className="w-full h-full relative"
      style={{
        background:
          currentTheme.gradientBackground || currentTheme.backgroundColor,
        borderRadius: "8px",
        opacity: isPreview ? 0.8 : 1,
      }}
    >
      <div className="w-full overflow-x-auto text-xs border rounded-md">
        {tableData.map((row, rowIndex) => (
          <div key={rowIndex} className="flex border-b last:border-b-0" style={{ minHeight: "40px" }}>
            <ResizablePanelGroup direction="horizontal" className="flex w-full">
              {row.map((cell, colIndex) => (
                <React.Fragment key={colIndex}>
                  {colIndex > 0 && !isPreview && <ResizableHandle />}
                  <ResizablePanel
                    defaultSize={colSizes[colIndex] || 100 / row.length}
                    className={`flex items-center justify-center  ${rowIndex === 0 ? 'font-bold bg-gray-300 dark:bg-gray-800' : ''}`}
                  >
                    <input
                      value={cell}
                      onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, rowIndex)}
                      className={`w-full h-full p-2 bg-transparent text-xs text-center border-r border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      style={{ color: currentTheme.fontColor }}
                      placeholder="Type here"
                      readOnly={!isEditable || isPreview}
                      disabled={isPreview}
                    />
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
