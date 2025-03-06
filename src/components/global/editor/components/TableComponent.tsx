"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useSlideStore } from "@/store/useSlideStore";
import React, { useEffect, useState } from "react";

// Define the props for the TableComponent
interface TableComponentProps {
  content: string[][];
  onChange: (newContent: string[][]) => void;
  isPreview?: boolean;
  isEditable?: boolean;
  initialRowSize?: number;
  initialColSize?: number;
}

// Define the TableComponent component
const TableComponent = ({
  content,
  onChange,
  isPreview,
  isEditable,
  initialRowSize,
  initialColSize,
}: TableComponentProps) => {
  const { currentTheme } = useSlideStore();
  const [colSizes, setColSizes] = useState<number[]>([]);
  const [rowSizes, setRowSizes] = useState<number[]>([]);
  // Initialize table data
  const [tableData, setTableData] = useState<string[][]>(() => {
    // If no content, create empty table
    if ((content.length === 0 || content[0], length === 0)) {
      return Array(initialRowSize).fill(Array(initialColSize).fill(""));
    }
    return content;
  });

  // Handle column resizing
  const handleResizeCol = (index: number, newSize: number) => {
    // If not editable, do nothing
    if (!isEditable) return;

    // Update column sizes
    const newSizes = [...colSizes];
    newSizes[index] = newSize;
    setColSizes(newSizes);
  };

  // Handle cell updates
  const updateCell = (rowIndex: number, colIndex: number, value: string) => {
    // If not editable, do nothing
    if (!isEditable) return;

    // Update table data
    const newData = tableData.map((row, rIndex) =>
      rIndex === rowIndex
        ? row.map((cell, cIndex) => (cIndex === colIndex ? value : cell))
        : row
    );
    setTableData(newData);
    onChange(newData);
  };

  //   set the row and column sizes
  useEffect(() => {
    //   set the row sizes
    setRowSizes(new Array(tableData.length).fill(100 / tableData.length));
    //   set the column sizes
    setColSizes(new Array(tableData[0].length).fill(100 / tableData[0].length));
  }, [tableData]);

  // If not preview, render the table
  if (!isPreview)
    <div className="w-full overflow-x-auto text-xs">
      <table className="w-full">
        <thead>
          <tr>
            {/* Header Row */}
            {tableData[0].map((cell, index) => (
              <th
                key={index}
                className="border p-2"
                style={{ width: `${colSizes[index]}%` }}
              >
                {cell || "Type here"}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Body Rows */}
          {tableData.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex} style={{ height: `${rowSizes[rowIndex + 1]}%` }}>
              {/* Cell */}
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="border p-2">
                  {cell || "Type here"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>;

  return (
    <div
      className="w-full h-full relative"
      style={{
        background:
          currentTheme.gradientBackground || currentTheme.backgroundColor,
        borderRadius: "8px",
      }}
    >
      {/* ResizablePanelGroup for vertical resizing */}
      <ResizablePanelGroup
        direction="vertical"
        className={`h-full w-full rounded-lg border ${
          initialColSize === 2
            ? "min-h-[100px]"
            : initialColSize === 3
            ? "min-h-[150px]"
            : initialColSize === 4
            ? "min-h-[200px]"
            : "min-h-[100px]"
        }`}
        onLayout={(sizes) => setRowSizes(sizes)}
      >
        {/* Render each row of the table */}
        {tableData.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {/* Add a handle between rows */}
            {rowIndex > 0 && <ResizableHandle />}
            {/* ResizablePanelGroup for horizontal resizing */}
            <ResizablePanelGroup
              direction="horizontal"
              onLayout={(sizes) => setColSizes(sizes)}
              className="w-full h-full"
            >
              {/* Render each cell of the row */}
              {row.map((cell, colIndex) => (
                <React.Fragment key={colIndex}>
                  {/* Add a handle between cells */}
                  {colIndex > 0 && <ResizableHandle />}
                  {/* ResizablePanel for the cell */}
                  <ResizablePanel
                    defaultSize={colSizes[colIndex]}
                    onResize={(size) => handleResizeCol(colIndex, size)}
                    className="w-full h-full min-h-9"
                  >
                    {/* Input field for the cell */}
                    <div className="relative w-full h-full min-h-3">
                      <input
                        value={cell}
                        onChange={(e) =>
                          updateCell(rowIndex, colIndex, e.target.value)
                        }
                        className="w-full h-full p-4 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                        style={{ color: currentTheme.fontColor }}
                        placeholder="Type here"
                        readOnly={!isEditable}
                      />
                    </div>
                  </ResizablePanel>
                </React.Fragment>
              ))}
            </ResizablePanelGroup>
          </React.Fragment>
        ))}
      </ResizablePanelGroup>
    </div>
  );
};

export default TableComponent;
