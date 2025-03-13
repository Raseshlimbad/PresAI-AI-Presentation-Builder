import { cn } from "@/lib/utils";
import { useSlideStore } from "@/store/useSlideStore";
import React from "react";

interface ListProps {
  items: string[];
  className?: string;
}

// Numbered List Component (Display Only)
const NumberedList: React.FC<ListProps> = ({ items, className }) => {
  const { currentTheme } = useSlideStore();

  return (
    <ol
      className={cn("list-decimal list-inside space-y-1", className)}
      style={{ color: currentTheme.fontColor }}
    >
      {items.map((item, index) => (
        <li key={index} className="text-inherit">
          {index + 1}. {item}
        </li>
      ))}
    </ol>
  );
};

// Bullet List Component (Display Only)
const BulletList: React.FC<ListProps> = ({ items, className }) => {
  const { currentTheme } = useSlideStore();

  return (
    <ul
      className={cn("list-disc list-inside space-y-1", className)}
      style={{ color: currentTheme.fontColor }}
    >
      {items.map((item, index) => (
        <li key={index} className="text-inherit">• {item}</li>
      ))}
    </ul>
  );
};

// Todo List Component (Display Only)
const TodoList: React.FC<ListProps> = ({ items, className }) => {
  const { currentTheme } = useSlideStore();

  return (
    <ul
      className={cn("space-y-1", className)}
      style={{ color: currentTheme.fontColor }}
    >
      {items.map((item, index) => (
        <li key={index} className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={item.startsWith("[x]")}
            className="form-checkbox"
            disabled
          />
          <span className="text-inherit">{item.replace(/^\[[ x]\] /, "")}</span>
        </li>
      ))}
    </ul>
  );
};

export { NumberedList, BulletList, TodoList };
