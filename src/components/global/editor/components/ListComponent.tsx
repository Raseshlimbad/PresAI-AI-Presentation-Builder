import { cn } from "@/lib/utils";
import { useSlideStore } from "@/store/useSlideStore";
import React from "react";

// ListItemProps is the props for the ListItem component
interface ListItemProps {
  item: string;
  index: number;
  onChange: (index: number, value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, index: number) => void;
  fontColor: string;
  isEditable: boolean;
}

// ListItem is the component for the list item
const ListItem: React.FC<ListItemProps> = ({
  item,
  index,
  onChange,
  onKeyDown,
  fontColor,
  isEditable,
}) => {
  return (
    // input is the input for the list item
    <input
      type="text"
      value={item}
      onChange={(e) => onChange(index, e.target.value)}
      onKeyDown={(e) => onKeyDown(e, index)}
      className="bg-transparent outline-none w-full inline-block align-middle"
      style={{ color: fontColor }}
      readOnly={!isEditable}
      autoFocus={index === 0 && item === ""} // Focus on empty item by default
    />
  );
};

// ListProps is the props for the List component
interface ListProps {
  items: string[];
  className?: string;
  isEditable?: boolean;
  onChange: (newItems: string[]) => void;
}

// NumberdList is the component for the list
const NumberedList: React.FC<ListProps> = ({
  items,
  className,
  onChange,
  isEditable = true,
}) => {
  const { currentTheme } = useSlideStore();

  const handlechange = (index: number, value: string) => {
    if (isEditable) {
      const newItems = [...items];
      newItems[index] = value;
      onChange(newItems);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newItems = [...items];
      newItems.splice(index + 1, 0, "");
      onChange(newItems);
      setTimeout(() => {
        const nextInput = document.querySelector(
          `li:nth-child(${index + 2}) input`
        ) as HTMLElement;
        if (nextInput) {
          nextInput.focus();
        }
      }, 0);
    } else if (
      e.key === "Backspace" &&
      items[index] === "" &&
      items.length > 1
    ) {
      e.preventDefault();
      const newItems = [...items];
      newItems.splice(index, 1);
      onChange(newItems);
    }
  };

  return (
    <ol
      className={cn("list-decimal list-inside space-y-1", className)}
      style={{ color: currentTheme.fontColor }}
    >
      {items.map((item, index) => (
        <li
          key={index}
          className="flex items-center gap-2" // ✅ This keeps index and input aligned
        >
          <span className="text-inherit">{index + 1}.</span>
          <ListItem
            item={item}
            index={index}
            isEditable={isEditable}
            onChange={handlechange}
            onKeyDown={handleKeyDown}
            fontColor={currentTheme.fontColor}
          />
        </li>
      ))}
    </ol>
  );
};

// BulletList is the component for the bullet list
const BulletList: React.FC<ListProps> = ({
  items,
  className,
  onChange,
  isEditable = true,
}) => {
  const { currentTheme } = useSlideStore();

  const handlechange = (index: number, value: string) => {
    if (isEditable) {
      const newItems = [...items];
      newItems[index] = value;
      onChange(newItems);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newItems = [...items];
      newItems.splice(index + 1, 0, "");
      onChange(newItems);
      setTimeout(() => {
        const nextInput = document.querySelector(
          `li:nth-child(${index + 2}) input`
        ) as HTMLElement;
        if (nextInput) {
          nextInput.focus();
        }
      }, 0);
    } else if (
      e.key === "Backspace" &&
      items[index] === "" &&
      items.length > 1
    ) {
      e.preventDefault();
      const newItems = [...items];
      newItems.splice(index, 1);
      onChange(newItems);
    }
  };

  return (
    <ul
      className={cn("list-disc list-inside space-y-1", className)}
      style={{ color: currentTheme.fontColor }}
    >
      {items.map((item, index) => (
        <li
          key={index}
          className="flex items-center gap-2" // ✅ This keeps bullet and input aligned
        >
          <span className="text-inherit">•</span>
          <ListItem
            key={index}
            item={item}
            index={index}
            isEditable={isEditable}
            onChange={handlechange}
            onKeyDown={handleKeyDown}
            fontColor={currentTheme.fontColor}
          />
        </li>
      ))}
    </ul>
  );
};

// TodoList is the component for the todo list
const TodoList: React.FC<ListProps> = ({
  items,
  className,
  onChange,
  isEditable = true,
}) => {
  const { currentTheme } = useSlideStore();

  // ✅ Handle text change without breaking [ ] or [x]
  const handleTextChange = (index: number, value: string) => {
    if (isEditable) {
      const newItems = [...items];

      // ✅ Strip any existing [ ] or [x] from text while typing
      const newValue = value.replace(/^\[.\] /, "");
      const prefix = items[index].startsWith("[x] ") ? "[x] " : "[ ] ";
      
      // ✅ Prevent duplication of [ ] or [x] when editing
      newItems[index] = `${prefix}${newValue}`;
      onChange(newItems);
    }
  };

  // ✅ Handle checkbox toggle without breaking text
  const handleCheckboxToggle = (index: number) => {
    if (isEditable) {
      const newItems = [...items];
      if (newItems[index].startsWith("[x] ")) {
        newItems[index] = newItems[index].replace("[x]", "[ ]");
      } else {
        newItems[index] = newItems[index].replace("[ ]", "[x]");
      }
      onChange(newItems);
    }
  };

  // ✅ Handle Enter to add new todo
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newItems = [...items];
      newItems.splice(index + 1, 0, "[ ] ");
      onChange(newItems);

      // ✅ Auto-focus on the next input
      setTimeout(() => {
        const nextInput = document.querySelector(
          `li:nth-child(${index + 2}) input`
        ) as HTMLElement;
        if (nextInput) {
          nextInput.focus();
        }
      }, 0);
    }

    // ✅ Handle Backspace to delete todo if text is empty
    else if (
      e.key === "Backspace" &&
      items[index] === "[ ] " &&
      items.length > 1
    ) {
      e.preventDefault();
      const newItems = [...items];
      newItems.splice(index, 1);
      onChange(newItems);
    }
  };

  return (
    <ul
      className={cn("space-y-1", className)}
      style={{ color: currentTheme.fontColor }}
    >
      {items.map((item, index) => (
        <li key={index} className="flex items-center space-x-2">
          {/* ✅ Checkbox */}
          <input
            type="checkbox"
            checked={item.startsWith("[x]")}
            className="form-checkbox"
            onChange={() => handleCheckboxToggle(index)}
            disabled={!isEditable}
          />

          {/* ✅ ListItem - Don't Change This */}
          <ListItem
            key={index}
            item={item.replace(/^\[[ x]\] /, "")} // Always show clean text
            index={index}
            isEditable={isEditable}
            onChange={(index, value) =>
              handleTextChange(index, value)
            }
            onKeyDown={handleKeyDown}
            fontColor={currentTheme.fontColor}
          />
        </li>
      ))}
    </ul>
  );
};



export { NumberedList, BulletList, TodoList };

// ----------------------------------------------------------------------------------------------------------------------------------------





// import { cn } from "@/lib/utils";
// import { useSlideStore } from "@/store/useSlideStore";
// import React, { useEffect, useRef } from "react";


// // ListItemProps is the props for the ListItem component
// interface ListItemProps {
//   item: string;
//   index: number;
//   onChange: (index: number, value: string) => void;
//   onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, index: number) => void;
//   fontColor: string;
//   isEditable: boolean;
//   autoFocus?: boolean;
// }

// // ListItem is the component for the list item
// const ListItem: React.FC<ListItemProps> = ({
//   item,
//   index,
//   onChange,
//   onKeyDown,
//   fontColor,
//   isEditable,
//   autoFocus,
// }) => {
//   const inputRef = useRef<HTMLInputElement>(null);

//   // ✅ Automatically focus on the new item when Enter is pressed
//   useEffect(() => {
//     if (autoFocus && inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, [autoFocus]);

//   return (
//     <input
//       ref={inputRef}
//       type="text"
//       value={item}
//       onChange={(e) => onChange(index, e.target.value)}
//       onKeyDown={(e) => onKeyDown(e, index)}
//       className="bg-transparent outline-none w-full inline-block align-middle"
//       style={{ color: fontColor }}
//       readOnly={!isEditable}
//     />
//   );
// };

// // ✅ Common List Logic (Enter to add, Backspace to remove)
// const useListLogic = (
//   items: string[],
//   onChange: (newItems: string[]) => void
// ) => {
//   const handleChange = (index: number, value: string) => {
//     const newItems = [...items];
//     newItems[index] = value;
//     onChange(newItems);
//   };

//   const handleKeyDown = (
//     e: React.KeyboardEvent<HTMLInputElement>,
//     index: number
//   ) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       const newItems = [...items];
//       newItems.splice(index + 1, 0, "");
//       onChange(newItems);

//       // Auto-focus the new input
//       setTimeout(() => {
//         const nextInput = document.querySelector(
//           `li:nth-child(${index + 2}) input`
//         ) as HTMLElement;
//         if (nextInput) nextInput.focus();
//       }, 0);
//     }

//     if (e.key === "Backspace" && items[index] === "" && items.length > 1) {
//       e.preventDefault();
//       const newItems = [...items];
//       newItems.splice(index, 1);
//       onChange(newItems);
//     }
//   };

//   return { handleChange, handleKeyDown };
// };

// interface ListProps {
//   items: string[];
//   className?: string;
//   onChange: (newItems: string[]) => void;
//   isEditable?: boolean;
// }


// // ✅ Numbered List
// const NumberedList: React.FC<ListProps> = ({
//   items,
//   className,
//   onChange,
//   isEditable = true,
// }) => {
//   const { currentTheme } = useSlideStore();

//   const handleChange = (index: number, value: string) => {
//     if (isEditable) {
//       const newItems = [...items];
//       newItems[index] = value;
//       onChange(newItems);
//     }
//   };

//   const handleKeyDown = (
//     e: React.KeyboardEvent<HTMLInputElement>,
//     index: number
//   ) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       const newItems = [...items];
//       newItems.splice(index + 1, 0, "");
//       onChange(newItems);
//     } else if (
//       e.key === "Backspace" &&
//       items[index] === "" &&
//       items.length > 1
//     ) {
//       e.preventDefault();
//       const newItems = [...items];
//       newItems.splice(index, 1);
//       onChange(newItems);
//     }
//   };

//   return (
//     <ol
//       className={cn("list-decimal list-inside space-y-1", className)}
//       style={{ color: currentTheme.fontColor }}
//     >
//       {items.map((item, index) => (
//         <li
//           key={index}
//           className="flex items-center gap-2"
//         >
//           <span className="text-inherit">{index + 1}.</span>
//           <ListItem
//             item={item}
//             index={index}
//             isEditable={isEditable}
//             onChange={handleChange}
//             onKeyDown={handleKeyDown}
//             fontColor={currentTheme.fontColor}
//             autoFocus={index === items.length - 1 && item === ""}
//           />
//         </li>
//       ))}
//     </ol>
//   );
// };

// // ✅ Bullet List
// const BulletList: React.FC<ListProps> = ({
//   items,
//   className,
//   onChange,
//   isEditable = true,
// }) => {
//   const { currentTheme } = useSlideStore();

//   const handleChange = (index: number, value: string) => {
//     const newItems = [...items];
//     newItems[index] = value;
//     onChange(newItems);
//   };

//   const handleKeyDown = (
//     e: React.KeyboardEvent<HTMLInputElement>,
//     index: number
//   ) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       const newItems = [...items];
//       newItems.splice(index + 1, 0, "");
//       onChange(newItems);
//     }
//   };

//   return (
//     <ul
//       className={cn("list-disc list-inside space-y-1", className)}
//       style={{ color: currentTheme.fontColor }}
//     >
//       {items.map((item, index) => (
//         <li key={index} className="flex items-center gap-2">
//           <span className="text-inherit">•</span>
//           <ListItem
//             item={item}
//             index={index}
//             onChange={handleChange}
//             onKeyDown={handleKeyDown}
//             fontColor={currentTheme.fontColor}
//             isEditable={isEditable}
//             autoFocus={index === items.length - 1 && item === ""}
//           />
//         </li>
//       ))}
//     </ul>
//   );
// };

// const TodoList: React.FC<ListProps> = ({
//   items,
//   className,
//   onChange,
//   isEditable = true,
// }) => {
//   const { currentTheme } = useSlideStore();

//   // ✅ Handle text change without breaking [ ] or [x]
//   const handleTextChange = (index: number, value: string) => {
//     if (isEditable) {
//       const newItems = [...items];

//       // ✅ Strip any existing [ ] or [x] from text while typing
//       const newValue = value.replace(/^\[.\] /, "");
//       const prefix = items[index].startsWith("[x] ") ? "[x] " : "[ ] ";
      
//       // ✅ Prevent duplication of [ ] or [x] when editing
//       newItems[index] = `${prefix}${newValue}`;
//       onChange(newItems);
//     }
//   };

//   // ✅ Handle checkbox toggle without breaking text
//   const handleCheckboxToggle = (index: number) => {
//     if (isEditable) {
//       const newItems = [...items];
//       if (newItems[index].startsWith("[x] ")) {
//         newItems[index] = newItems[index].replace("[x]", "[ ]");
//       } else {
//         newItems[index] = newItems[index].replace("[ ]", "[x]");
//       }
//       onChange(newItems);
//     }
//   };

//   // ✅ Handle Enter to add new todo
//   const handleKeyDown = (
//     e: React.KeyboardEvent<HTMLInputElement>,
//     index: number
//   ) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       const newItems = [...items];
//       newItems.splice(index + 1, 0, "[ ] ");
//       onChange(newItems);

//       // ✅ Auto-focus on the next input after Enter
//       setTimeout(() => {
//         const nextInput = document.querySelector(
//           `li:nth-child(${index + 2}) input`
//         ) as HTMLElement;
//         if (nextInput) {
//           nextInput.focus();
//         }
//       }, 0);
//     }

//     // ✅ Handle Backspace to delete todo if text is empty
//     else if (
//       e.key === "Backspace" &&
//       items[index] === "[ ] " &&
//       items.length > 1
//     ) {
//       e.preventDefault();
//       const newItems = [...items];
//       newItems.splice(index, 1);
//       onChange(newItems);

//       // ✅ Focus back to the previous input after deletion
//       setTimeout(() => {
//         const prevInput = document.querySelector(
//           `li:nth-child(${index}) input`
//         ) as HTMLElement;
//         if (prevInput) {
//           prevInput.focus();
//         }
//       }, 0);
//     }
//   };

//   return (
//     <ul
//       className={cn("space-y-1", className)}
//       style={{ color: currentTheme.fontColor }}
//     >
//       {items.map((item, index) => (
//         <li key={index} className="flex items-center space-x-2">
//           {/* ✅ Checkbox */}
//           <input
//             type="checkbox"
//             checked={item.startsWith("[x]")}
//             className="form-checkbox"
//             onChange={() => handleCheckboxToggle(index)}
//             disabled={!isEditable}
//           />

//           {/* ✅ ListItem - Don't Change This */}
//           <ListItem
//             key={index}
//             item={item.replace(/^\[[ x]\] /, "")} // Always show clean text
//             index={index}
//             isEditable={isEditable}
//             onChange={(index, value) =>
//               handleTextChange(index, value)
//             }
//             onKeyDown={handleKeyDown}
//             fontColor={currentTheme.fontColor}
//             autoFocus={index === items.length - 1 && item === "[ ] "} // Auto-focus on newly created item
//           />
//         </li>
//       ))}
//     </ul>
//   );
// };


// export { NumberedList, BulletList,  TodoList};