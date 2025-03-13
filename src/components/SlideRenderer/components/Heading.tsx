"use client";

import { cn } from "@/lib/utils";
import React from "react";

// Props for heading components
interface HeadingProps {
  value: string;
  className?: string;
  styles?: React.CSSProperties;
}

// Function to create a readonly heading component
const createHeading = (displayName: string, defaultClassName: string) => {
  const Heading: React.FC<HeadingProps> = ({ value, className, styles }) => {
    return (
      <div
        className={cn(
          `w-full bg-transparent ${defaultClassName} font-normal text-gray-900 
          placeholder:text-gray-300 leading-tight`,
          className
        )}
        style={{
          padding: 0,
          margin: 0,
          color: "inherit",
          boxSizing: "content-box",
          lineHeight: "1.2em",
          minHeight: "1.2em",
          ...styles,
        }}
      >
        {value}
      </div>
    );
  };

  Heading.displayName = displayName;
  return Heading;
};

// Readonly Heading Components
const Heading1 = createHeading("Heading1", "text-4xl");
const Heading2 = createHeading("Heading2", "text-3xl");
const Heading3 = createHeading("Heading3", "text-2xl");
const Heading4 = createHeading("Heading4", "text-xl");
const Title = createHeading("Title", "text-5xl");

export { Heading1, Heading2, Heading3, Heading4, Title };
