"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

interface HeadingProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  styles?: React.CSSProperties;
  isPreview?: boolean;
}

// Create Heading Component
const createHeading = (displayName: string, defaultClassName: string) => {
  const Heading = React.forwardRef<HTMLTextAreaElement, HeadingProps>(
    ({ className, styles, isPreview = false, ...props }, ref) => {
      const textareaRef = useRef<HTMLTextAreaElement>(null);

      // Adjust Height
      useEffect(() => {
        const textarea = textareaRef.current;

        // If the textarea is not in preview mode, adjust the height
        if (textarea && !isPreview) {
          // Adjust Height Function
          const adjustHeight = () => {
            textarea.style.height = "0";
            textarea.style.height = `${textarea.scrollHeight}px`;
          };

          // Add Event Listener
          textarea.addEventListener("input", adjustHeight);
          adjustHeight();

          // Remove Event Listener
          return () => {
            textarea.removeEventListener("input", adjustHeight);
          };
        }
      }, [isPreview]);

      // Preview Class Name
      const previewClassName = isPreview ? "text-xs" : "";

      // Return Heading Component 
      return (
        // Textarea
        <textarea
          className={cn(
            `w-full bg-transparent ${defaultClassName} ${previewClassName}
          font-normal text-gray-900 placeholder:text-gray-300
          focus:outline-none resize-none overflow-hidden leading-tight`,
            className
          )}
          // Style
          style={{
            padding: 0,
            margin: 0,
            color: "inherit",
            boxSizing: "content-box",
            lineHeight: "1.2em",
            minHeight: "1.2em",
            ...styles,
          }}
          // Ref
          ref={(el) => {
            (textareaRef.current as HTMLTextAreaElement | null) = el;
            if (typeof ref === "function") ref(el);
            else if (ref) ref.current = el;
          }}
          // Read Only
          readOnly={isPreview}
          // Props
          {...props}
        ></textarea>
      );
    }
  );
  // Display Name
  Heading.displayName = displayName;
  return Heading;
};

// Heading 1
const Heading1 = createHeading("Heading", "text-4xl");
// Heading 2
const Heading2 = createHeading("Heading", "text-3xl");
// Heading 3
const Heading3 = createHeading("Heading", "text-2xl");
// Heading 4
const Heading4 = createHeading("Heading", "text-xl");
// Title
const Title = createHeading("Title", "text-5xl");

export { Heading1, Heading2, Heading3, Heading4, Title };
