import { cn } from "@/lib/utils";
import React from "react";

interface ListProps {
  items: string[];
  className?: string;
}

// Numbered List Component (Display Only)
const NumberedList: React.FC<ListProps> = ({ items, className }) => {

  return (
    <ol className={cn("list-decimal list-inside space-y-1 text-black dark:text-white", className)}>
      {items.map((item, index) => (
        <li key={index} className="text-inherit">{item}</li>
      ))}
    </ol>
  );
};

// Bullet List Component (Display Only)
const BulletList: React.FC<ListProps> = ({ items, className }) => {

  return (
    <ul className={cn("list-disc list-inside space-y-1 text-black dark:text-white", className)}>
      {items.map((item, index) => (
        <li key={index} className="text-inherit">{item}</li>
      ))}
    </ul>
  );
};

// Todo List Component (Display Only)
const TodoList: React.FC<ListProps> = ({ items, className }) => {

  return (
    <ul className={cn("space-y-1 text-black dark:text-white", className)}>
      {items.map((item, index) => (
        <li key={index} className="flex items-center space-x-2 text-inherit">
          <input
            type="checkbox"
            checked={item.startsWith("[x]")}
            className="form-checkbox text-inherit"
            disabled
          />
          <span>{item.replace(/^\[[ x]\] /, "")}</span>
        </li>
      ))}
    </ul>
  );
};


export { NumberedList, BulletList, TodoList };
