// import { cn } from "@/lib/utils";
// import { useSlideStore } from "@/store/useSlideStore";
// import React from "react";

// // Types for the CodeBlock component
// interface CodeBlockProps {
//   code?: string;
//   language?: string;
//   onChange: (newcode: string) => void;
//   className?: string;
// }

// // CodeBlock component
// const CodeBlock = ({ code, language, onChange, className }: CodeBlockProps) => {
//   const { currentTheme } = useSlideStore();

//   return (
//     // Code Block Container pre tag
//     <pre
//       className={cn("p-4 rounded-lg overflow-x-auto", className)}
//       style={{ backgroundColor: currentTheme.accentColor + "20" }}
//     >
//         {/* Code Block */}
//       <code className={`language-${language}`}>
//         <textarea
//           value={code}
//           onChange={(e) => onChange(e.target.value)}
//           className="w-full h-full bg-transparent outline-none font-mono"
//           style={{ color: currentTheme.fontColor }}
//         >
//         </textarea>
//       </code>
//     </pre>
//   );
// };

// export default CodeBlock;


import { cn } from "@/lib/utils";
import { useSlideStore } from "@/store/useSlideStore";
import React from "react";

// Types for the CodeBlock component
interface CodeBlockProps {
  code?: string;
  language?: string;
  onChange: (newcode: string) => void;
  className?: string;
}

// CodeBlock component
const CodeBlock = ({ code, language = "plaintext", onChange, className }: CodeBlockProps) => {
  const { currentTheme } = useSlideStore();

  return (
    // Code Block Container pre tag
    <pre
      className={cn("p-4 rounded-lg overflow-x-auto", className)}
      style={{ backgroundColor: currentTheme.accentColor + "20" }}
    >
      {/* Code Block */}
      <code className={`language-${language}`}>
        <textarea
          value={code}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-full bg-transparent outline-none font-mono resize-none"
          style={{ color: currentTheme.fontColor }}
        />
      </code>
    </pre>
  );
};

export default CodeBlock;
