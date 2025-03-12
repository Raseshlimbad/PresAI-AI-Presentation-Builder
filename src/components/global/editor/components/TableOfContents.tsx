// import { cn } from "@/lib/utils";
// import { useSlideStore } from "@/store/useSlideStore";
// import React, { useState } from "react";

// interface TableOfContentsProps {
//   items: string[];
//   className?: string;
//   onItemClick: (id: string) => void;
//   isEditable?: boolean;
//   onUpdateItem?: (index: number, newValue: string) => void;
// }

// const TableOfContents = ({
//   items,
//   className,
//   onItemClick,
//   isEditable = false,
//   onUpdateItem,
// }: TableOfContentsProps) => {
//   const { currentTheme } = useSlideStore();
//   const [editingIndex, setEditingIndex] = useState<number | null>(null);
//   const [editedText, setEditedText] = useState<string>("");

//   const handleDoubleClick = (index: number, text: string) => {
//     if (isEditable) {
//       setEditingIndex(index);
//       setEditedText(text);
//     }
//   };

//   const handleBlur = (index: number) => {
//     if (onUpdateItem && editedText.trim() !== "") {
//       onUpdateItem(index, editedText);
//     }
//     setEditingIndex(null);
//   };

//   return (
//     <nav
//       className={cn("space-y-2", className)}
//       style={{ color: currentTheme.fontColor }}
//     >
//       {items.map((item, index) => (
//         <div key={index} className="flex items-center">
//           {editingIndex === index ? (
//             <input
//               type="text"
//               value={editedText}
//               onChange={(e) => setEditedText(e.target.value)}
//               onBlur={() => handleBlur(index)}
//               onKeyDown={(e) => e.key === "Enter" && handleBlur(index)}
//               autoFocus
//               className="border border-gray-300 px-2 py-1 rounded w-full"
//             />
//           ) : (
//             <div
//               className={cn("cursor-pointer hover:underline flex-grow")}
//               onClick={() => onItemClick(item)}
//               onDoubleClick={() => handleDoubleClick(index, item)}
//             >
//               {item}
//             </div>
//           )}
//         </div>
//       ))}
//     </nav>
//   );
// };

// export default TableOfContents;


import { cn } from "@/lib/utils";
import { useSlideStore } from "@/store/useSlideStore";
import React, { useState } from "react";

interface TableOfContentsProps {
  items: string[];
  className?: string;
  onItemClick: (id: string) => void;
  isEditable?: boolean;
  onUpdateItem?: (index: number, newValue: string) => void;
}

const TableOfContents = ({
  items,
  className,
  onItemClick,
  isEditable = false,
  onUpdateItem,
}: TableOfContentsProps) => {
  const { currentTheme } = useSlideStore();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedText, setEditedText] = useState<string>("");

  const handleDoubleClick = (index: number, text: string) => {
    if (isEditable) {
      setEditingIndex(index);
      setEditedText(text);
    }
  };

  const handleBlur = (index: number) => {
    if (onUpdateItem && editedText.trim() !== "") {
      onUpdateItem(index, editedText);
    }
    setEditingIndex(null);
  };

  return (
    <nav
      className={cn("space-y-2", className)}
      style={{ color: currentTheme.fontColor }}
    >
      {items.map((item, index) => (
        <div key={index} className="">
          {editingIndex === index ? (
            <input
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              onBlur={() => handleBlur(index)}
              onKeyDown={(e) => e.key === "Enter" && handleBlur(index)}
              autoFocus
              className="border border-gray-300 px-2 py-1 rounded w-full"
            />
          ) : (
            <div
              className={cn("cursor-pointer hover:underline flex-grow")}
              onClick={() => onItemClick(item)}
              onDoubleClick={() => handleDoubleClick(index, item)}
            >
              {item}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default TableOfContents;
