import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

// Paragraph Props
interface ParagraphProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  styles?: React.CSSProperties;
  isPreview?: boolean;
}

// Paragraph Component
const Paragraph = React.forwardRef<HTMLTextAreaElement, ParagraphProps>(
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

    // Return Paragraph Component
      return (
      // Textarea
      <textarea
        className={cn(
          "w-full bg-transparent font-normal text-gray-900 placeholder:text-gray-300 focus:outline-none resize-none overflow-hidden leading-tight",
          isPreview ? "text-[0.5rem] " : "text-lg",
          className
        )}
        style={{
          padding: 0,
          margin: 0,
          color: "inherit",
          boxSizing: "content-box",
          lineHeight: "1.5em",
          minHeight: "1.5em",
          ...styles,
        }}
        ref={(el) => {
          (textareaRef.current as HTMLTextAreaElement | null) = el;

          // If the ref is a function, call it with the element
          if (typeof ref === "function") ref(el);
          // If the ref is an object, set the current property to the element
          else if (ref) ref.current = el;
        }}
        readOnly={isPreview}
        {...props}
      ></textarea>
    );
  }
);

// Display Name
Paragraph.displayName = "Paragraph";

export default Paragraph;
