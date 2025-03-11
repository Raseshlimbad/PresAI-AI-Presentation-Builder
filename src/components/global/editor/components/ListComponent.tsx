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
      className="bg-transperent outline-none w-full py-1"
      style={{ color: fontColor }}
      readOnly={!isEditable}
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

  // handlechange is the function for the list item
  const handlechange = (index: number, value: string) => {
    if (isEditable) {
      const newItems = [...items];
      newItems[index] = value;
      onChange(newItems);
    }
  };

  // handleKeyDown is the function for the list item
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    // if the key is enter, add a new item to the list
    if (e.key === "Enter") {
      e.preventDefault();
      const newItems = [...items];
      newItems.splice(index + 1, 0, "");
      onChange(newItems);
      // set the focus to the next input
      setTimeout(() => {
        const nextInput = document.querySelector(
          `li:nth-child(${index + 2}) input`
        ) as HTMLElement;
        if (nextInput) {
          nextInput.focus();
        }
      }, 0);
      // if the key is backspace, remove the item from the list
    } else if (
      e.key === "Backspace" &&
      items[index] === "" &&
      items.length > 1
      // if the key is backspace and the item is empty and the list is not empty, remove the item from the list
    ) {
      e.preventDefault();
      const newItems = [...items];
      newItems.splice(index, 1);
      onChange(newItems);
    }
  };

  // Return the Numbered List Component
  return (
    // ol is the ordered list
    <ol
      className={cn("list-decimal list-inside space-y-1", className)}
      style={{ color: currentTheme.fontColor }}
    >
      {/* map is the function for the list item */}
      {items.map((item, index) => (
        <li key={index}>
          {/* ListItem is the component for the list item */}
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
export const BulletList: React.FC<ListProps> = ({
  items,
  className,
  onChange,
  isEditable = true,
}) => {
  const { currentTheme } = useSlideStore();

  // handlechange is the function for the list item
  const handlechange = (index: number, value: string) => {
    if (isEditable) {
      const newItems = [...items];
      newItems[index] = value;
      onChange(newItems);
    }
  };

  // handleKeyDown is the function for the list item
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    // if the key is enter, add a new item to the list
    if (e.key === "Enter") {
      e.preventDefault();
      const newItems = [...items];
      newItems.splice(index + 1, 0, "");
      onChange(newItems);
      // set the focus to the next input
      setTimeout(() => {
        const nextInput = document.querySelector(
          `li:nth-child(${index + 2}) input`
        ) as HTMLElement;
        if (nextInput) {
          nextInput.focus();
        }
      }, 0);
      // if the key is backspace, remove the item from the list
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
    // ul is the unordered list
    <ul
      className={cn("list-decimal list-inside space-y-1", className)}
      style={{ color: currentTheme.fontColor }}
    >
      {/* map is the function for the list item */}
      {items.map((item, index) => (
        <li key={index} className="pl-1 marker:text-current">
          {/* ListItem is the component for the list item */}
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
export const TodoList: React.FC<ListProps> = ({
  items,
  className,
  onChange,
  isEditable = true,
}) => {
  const { currentTheme } = useSlideStore();

  // handlechange is the function for the list item
  const handlechange = (index: number, value: string) => {
    if (isEditable) {
      const newItems = [...items];
      // if the value starts with [ ] or [x] then keep it, otherwise add [ ] in front of the value
      newItems[index] =
        value.startsWith("[ ] ") || value.startsWith("[x] ")
          ? value
          : `[ ] ${value}`;
      onChange(newItems);
    }
  };

  // handleKeyDown is the function for the list item
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    // if the key is enter, add a new item to the list
    if (e.key === "Enter") {
      e.preventDefault();
      const newItems = [...items];
      // if the value starts with [ ] or [x] then keep it, otherwise add [ ] in front of the value
      newItems.splice(index + 1, 0, "[ ] ");
      onChange(newItems);
      // set the focus to the next input
      setTimeout(() => {
        const nextInput = document.querySelector(
          `li:nth-child(${index + 2}) input`
        ) as HTMLElement;
        if (nextInput) {
          nextInput.focus();
        }
      }, 0);
      // if the key is backspace and the value is [ ] and the list is not empty, remove the item from the list
    } else if (
      e.key === "Backspace" &&
      items[index] === "[ ] " &&
      items.length > 1
      // if the key is backspace and the value is [x] and the list is not empty, remove the item from the list
    ) {
      e.preventDefault();
      const newItems = [...items];
      newItems.splice(index, 1);
      onChange(newItems);
    }
  };

  // toggleCheckbox is the function for the checkbox
  const toggleCheckbox = (index: number) => {
    if (isEditable) {
      const newItems = [...items];
      newItems[index] = newItems[index].startsWith("[x]")
        ? newItems[index].replace("[x]", "[ ]")
        : newItems[index].replace("[ ]", "[x]");
      onChange(newItems);
    }
  };

  return (
    // ul is the unordered list
    <ul
      className={cn("space-y-1", className)}
      style={{ color: currentTheme.fontColor }}
    >
      {/* map is the function for the list item */}
      {items.map((item, index) => (
        <li key={index} className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={item.startsWith("[x]")}
            className="form-checkbox"
            onChange={() => toggleCheckbox(index)}
            disabled={!isEditable}
          />
          {/* ListItem is the component for the list item */}
          <ListItem
            key={item.replace(/^\[[ x]\] /, "")}
            item={item}
            index={index}
            isEditable={isEditable}
            onChange={(index, value) =>
              // handlechange is the function for the list item
              handlechange(
                index,
                `${items[index].startsWith("[x] ") ? "[x] " : "[ ] "}${value}`
              )
            }
            onKeyDown={handleKeyDown}
            fontColor={currentTheme.fontColor}
          />
        </li>
      ))}
    </ul>
  );
};

export default NumberedList;
