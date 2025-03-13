// "use client";

// import {
//   ResizableHandle,
//   ResizablePanel,
//   ResizablePanelGroup,
// } from "@/components/ui/resizable";
// import { useSlideStore } from "@/store/useSlideStore";
// import React, { useEffect, useState, useRef } from "react";

// // Define the props for the TableComponent
// interface TableComponentProps {
//   content: string[][];
//   onChange: (newContent: string[][]) => void;
//   isPreview?: boolean;
//   isEditable?: boolean;
//   initialRowSize?: number;
//   initialColSize?: number;
// }

// // Define the TableComponent component
// const TableComponent = ({
//   content,
//   onChange,
//   isPreview = false,
//   isEditable = true,
//   initialRowSize = 3,
//   initialColSize = 3,
// }: TableComponentProps) => {
//   const { currentTheme } = useSlideStore();
//   const [colSizes, setColSizes] = useState<number[]>([]);
//   const [tableData, setTableData] = useState<string[][]>(() => {
//     if (content.length === 0 || content[0].length === 0) {
//       return Array.from({ length: initialRowSize }, () =>
//         Array(initialColSize).fill("")
//       );
//     }
//     return content;
//   });

//   const autosaveTimerRef = useRef<NodeJS.Timeout | null>(null);

//   // Handle cell updates
//   const updateCell = (rowIndex: number, colIndex: number, value: string) => {
//     if (!isEditable || isPreview) return;

//     const newData = tableData.map((row, rIndex) =>
//       rIndex === rowIndex ? row.map((cell, cIndex) => (cIndex === colIndex ? value : cell)) : row
//     );

//     setTableData(newData);
//     onChange(newData);
//     triggerAutosave(newData);
//   };

//   // Handle key presses (Enter for new row, Backspace for row deletion)
//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, rowIndex: number) => {
//     if (!isEditable || isPreview) return;

//     // ✅ Add a new row when Enter is pressed (anywhere)
//     if (e.key === "Enter") {
//       e.preventDefault();
//       const newRow = Array(tableData[0].length).fill("");
//       const updatedTable = [
//         ...tableData.slice(0, rowIndex + 1),
//         newRow,
//         ...tableData.slice(rowIndex + 1),
//       ];
//       setTableData(updatedTable);
//       onChange(updatedTable);
//       triggerAutosave(updatedTable);
//     }

//     // ✅ Remove any row when Backspace is pressed on an empty row
//     if (e.key === "Backspace" && tableData.length > 1) {
//       const isEmptyRow = tableData[rowIndex].every((cell) => cell === "");

//       if (isEmptyRow) {
//         e.preventDefault();
//         const updatedTable = tableData.filter((_, rIndex) => rIndex !== rowIndex);
//         setTableData(updatedTable);
//         onChange(updatedTable);
//         triggerAutosave(updatedTable);
//       }
//     }
//   };

//   // Initialize column sizes based on initialColSize
//   useEffect(() => {
//     if (colSizes.length === 0 && tableData.length > 0) {
//       setColSizes(new Array(tableData[0].length).fill(100 / tableData[0].length));
//     }
//   }, [tableData, colSizes.length]);

//   // Autosave functionality
//   const triggerAutosave = (updatedData: string[][]) => {
//     if (autosaveTimerRef.current) {
//       clearTimeout(autosaveTimerRef.current);
//     }

//     autosaveTimerRef.current = setTimeout(() => {
//       onChange(updatedData); // Call onChange after 2s delay
//     }, 2000);
//   };

//   useEffect(() => {
//     return () => {
//       if (autosaveTimerRef.current) {
//         clearTimeout(autosaveTimerRef.current);
//       }
//     };
//   }, []);

//   return (
//     <div
//       className="w-full h-full relative"
//       style={{
//         background:
//           currentTheme.gradientBackground || currentTheme.backgroundColor,
//         borderRadius: "8px",
//         opacity: isPreview ? 0.8 : 1,
//       }}
//     >
//       {/* Render the table */}
//       <div className="w-full overflow-x-auto text-xs border rounded-md">
//         {tableData.map((row, rowIndex) => (
//           <div key={rowIndex} className="flex border-b last:border-b-0" style={{ minHeight: "40px" }}>
//             {/* Render each cell */}
//             <ResizablePanelGroup direction="horizontal" className="flex w-full">
//               {row.map((cell, colIndex) => (
//                 <React.Fragment key={colIndex}>
//                   {colIndex > 0 && !isPreview && <ResizableHandle />}
//                   <ResizablePanel defaultSize={colSizes[colIndex]} className="flex items-center justify-center">
//                     <input
//                       value={cell}
//                       onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
//                       onKeyDown={(e) => handleKeyDown(e, rowIndex)}
//                       className="w-full h-full p-2 bg-transparent text-xs text-center border-r border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       style={{ color: currentTheme.fontColor }}
//                       placeholder="Type here"
//                       readOnly={!isEditable || isPreview}
//                       disabled={isPreview}
//                     />
//                   </ResizablePanel>
//                 </React.Fragment>
//               ))}
//             </ResizablePanelGroup>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TableComponent;

// -------------------------------------------------------------------------------------------------------------------------------------------

// "use client";

// import {
//   ResizableHandle,
//   ResizablePanel,
//   ResizablePanelGroup,
// } from "@/components/ui/resizable";
// import { useSlideStore } from "@/store/useSlideStore";
// import React, { useEffect, useState, useRef } from "react";

// interface TableComponentProps {
//   content: string |string[][];
//   onChange: (newContent: string[][]) => void;
//   isPreview?: boolean;
//   isEditable?: boolean;
//   initialRowSize?: number;
//   initialColSize?: number;
// }

// const TableComponent = ({
//   content,
//   onChange,
//   isPreview = false,
//   isEditable = true,
//   initialRowSize = 3,
//   initialColSize = 3,
// }: TableComponentProps) => {
//   const { currentTheme } = useSlideStore();
//   const [colSizes, setColSizes] = useState<number[]>([]);

//   const [tableData, setTableData] = useState<string[][]>(() => {
//     if (Array.isArray(content) && content.length > 0 && Array.isArray(content[0])) {
//       return content.map(row =>
//         row.length < initialColSize
//           ? [...row, ...Array(initialColSize - row.length).fill("")]
//           : row
//       );
//     }
  
//     if (typeof content === "string") {
//       const parsedData = content
//         .split("\n") // Ensure `content` is a string before splitting
//         .map((row: string) => row.split(",")); // Explicitly type `row` as a string
  
//       return parsedData.length > 0
//         ? parsedData
//         : Array.from({ length: initialRowSize }, () =>
//             Array(initialColSize).fill("")
//           );
//     }
  
//     return Array.from({ length: initialRowSize }, () =>
//       Array(initialColSize).fill("")
//     );
//   });
  
//   console.log("content: ", content)
//   console.log("tableData: ", tableData)

//   const autosaveTimerRef = useRef<NodeJS.Timeout | null>(null);

//   /** Update cell data */
//   const updateCell = (rowIndex: number, colIndex: number, value: string) => {
//     if (!isEditable || isPreview) return;

//     const newData = tableData.map((row, rIndex) =>
//       rIndex === rowIndex
//         ? row.map((cell, cIndex) => (cIndex === colIndex ? value : cell))
//         : row
//     );

//     setTableData(newData);
//     triggerAutosave(newData);
//   };

//   /** Handle Enter (new row) and Backspace (delete row) */
//   const handleKeyDown = (
//     e: React.KeyboardEvent<HTMLInputElement>,
//     rowIndex: number
//   ) => {
//     if (!isEditable || isPreview) return;

//     if (e.key === "Enter") {
//       e.preventDefault();
//       const newRow = Array(tableData[0].length).fill("");
//       const updatedTable = [
//         ...tableData.slice(0, rowIndex + 1),
//         newRow,
//         ...tableData.slice(rowIndex + 1),
//       ];
//       setTableData(updatedTable);
//       triggerAutosave(updatedTable);
//     }

//     if (e.key === "Backspace" && tableData.length > 1) {
//       const isEmptyRow = tableData[rowIndex].every((cell) => cell === "");

//       if (isEmptyRow) {
//         e.preventDefault();
//         const updatedTable = tableData.filter((_, rIndex) => rIndex !== rowIndex);
//         setTableData(updatedTable);
//         triggerAutosave(updatedTable);
//       }
//     }
//   };

//   /** Handle column size initialization */
//   useEffect(() => {
//     if (tableData.length > 0) {
//       setColSizes((prevSizes) =>
//         prevSizes.length === tableData[0].length
//           ? prevSizes
//           : new Array(tableData[0].length).fill(100 / tableData[0].length)
//       );
//     }
//   }, [tableData]);

//   /** Autosave function */
//   const triggerAutosave = (updatedData: string[][]) => {
//     if (autosaveTimerRef.current) {
//       clearTimeout(autosaveTimerRef.current);
//     }

//     autosaveTimerRef.current = setTimeout(() => {
//       onChange(updatedData);
//     }, 1500);
//   };

//   useEffect(() => {
//     return () => {
//       if (autosaveTimerRef.current) {
//         clearTimeout(autosaveTimerRef.current);
//       }
//     };
//   }, []);

//   return (
//     <div
//       className="w-full h-full relative"
//       style={{
//         background:
//           currentTheme.gradientBackground || currentTheme.backgroundColor,
//         borderRadius: "8px",
//         opacity: isPreview ? 0.8 : 1,
//       }}
//     >
//       <div className="w-full overflow-x-auto text-xs border rounded-md">
//         {tableData.map((row, rowIndex) => (
//           <div key={rowIndex} className="flex border-b last:border-b-0" style={{ minHeight: "40px" }}>
//             <ResizablePanelGroup direction="horizontal" className="flex w-full">
//               {row.map((cell, colIndex) => (
//                 <React.Fragment key={colIndex}>
//                   {colIndex > 0 && !isPreview && <ResizableHandle />}
//                   <ResizablePanel
//                     defaultSize={colSizes[colIndex] || 100 / row.length}
//                     className="flex items-center justify-center"
//                   >
//                     <input
//                       value={cell}
//                       onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
//                       onKeyDown={(e) => handleKeyDown(e, rowIndex)}
//                       className="w-full h-full p-2 bg-transparent text-xs text-center border-r border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       style={{ color: currentTheme.fontColor }}
//                       placeholder="Type here"
//                       readOnly={!isEditable || isPreview}
//                       disabled={isPreview}
//                     />
//                   </ResizablePanel>
//                 </React.Fragment>
//               ))}
//             </ResizablePanelGroup>
//           </div>
//         ))}
//         <p>{tableData}</p>
//       </div>
//     </div>
//   );
// };

// export default TableComponent;


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
  content: string | TableRow[]; // Handles nested objects properly
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

  /** 🔥 Recursive function to flatten nested content */
  const flattenContent = (data: TableRow[]): string[][] => {
    if (!Array.isArray(data) || data.length === 0) return [];

    const allHeaders = new Set<string>();

    /** Collect all unique headers from every object */
    const extractHeaders = (obj: TableRow) => {
      Object.keys(obj).forEach((key) => {
        allHeaders.add(key);
        const value = obj[key];

        if (Array.isArray(value) && value.length > 0 && typeof value[0] === "object") {
          value.forEach(extractHeaders); // Recursively extract headers from nested objects
        }
      });
    };

    data.forEach(extractHeaders);
    const headers = Array.from(allHeaders);

    /** Convert objects to row data */
    const processRows = (obj: TableRow): string[] => {
      return headers.map((header) => {
        const value = obj[header];

        if (Array.isArray(value) && value.length > 0 && typeof value[0] === "object") {
          return value.map((nestedObj) => processRows(nestedObj).join(" | ")).join("\n"); // Flatten nested content
        }

        return typeof value === "string" ? value : ""; // Default empty cell if missing
      });
    };

    return [headers, ...data.map(processRows)];
  };

  /** 🔥 Initialize tableData recursively */
  const initializeTableData = () => {
    if (Array.isArray(content) && content.length > 0 && typeof content[0] === "object") {
      return flattenContent(content);
    }

    if (typeof content === "string") {
      return content.split("\n").map((row) => row.split(","));
    }

    return Array.from({ length: initialRowSize }, () =>
      Array(initialColSize).fill("")
    );
  };

  const [tableData, setTableData] = useState<string[][]>(initializeTableData);

  /** 🔥 Update cell data */
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

  /** 🔥 Handle row add & delete */
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

  /** 🔥 Handle column resizing */
  useEffect(() => {
    if (tableData.length > 0) {
      setColSizes((prevSizes) =>
        prevSizes.length === tableData[0].length
          ? prevSizes
          : new Array(tableData[0].length).fill(100 / tableData[0].length)
      );
    }
  }, [tableData]);

  /** 🔥 Autosave function */
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
                    className="flex items-center justify-center"
                  >
                    <input
                      value={cell}
                      onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, rowIndex)}
                      className="w-full h-full p-2 bg-transparent text-xs text-center border-r border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
