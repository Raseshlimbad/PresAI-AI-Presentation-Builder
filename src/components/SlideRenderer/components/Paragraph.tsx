import { cn } from "@/lib/utils";
import React from "react";

// Paragraph Props
interface ParagraphProps {
  className?: string;
  styles?: React.CSSProperties;
  value: string; // Readonly value to display text
}

// Paragraph Component (Readonly Mode)
const Paragraph: React.FC<ParagraphProps> = ({ className, styles, value }) => {
  return (
    <p
      className={cn(
        "w-full bg-transparent font-normal text-gray-900 dark:text-white placeholder:text-gray-300 leading-tight",
        "text-md", // Fixed text size
        className
      )}
      style={{
        padding: 0,
        margin: 0,
        // color: "inherit",
        boxSizing: "content-box",
        lineHeight: "1.5em",
        minHeight: "1.5em",
        ...styles,
      }}
    >
      {value}
    </p>
  );
};

// Display Name
Paragraph.displayName = "Paragraph";

export default Paragraph;
