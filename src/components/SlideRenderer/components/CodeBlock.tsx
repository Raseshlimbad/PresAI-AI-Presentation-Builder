import { cn } from "@/lib/utils";
import { useSlideStore } from "@/store/useSlideStore";
import React from "react";

// Types for the CodeBlock component
interface CodeBlockProps {
  code?: string;
  language?: string;
  className?: string;
}

// CodeBlock component (Display Only)
const CodeBlock: React.FC<CodeBlockProps> = ({ code = "", language = "plaintext", className }) => {
  const { currentTheme } = useSlideStore();

  return (
    // Code Block Container
    <pre
      className={cn("p-4 rounded-lg overflow-x-auto", className)}
      style={{ backgroundColor: currentTheme.accentColor + "20", color: currentTheme.fontColor }}
    >
      {/* Code Block */}
      <code className={`language-${language}`}>{code}</code>
    </pre>
  );
};

export default CodeBlock;
