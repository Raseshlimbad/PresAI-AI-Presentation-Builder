"use client";

import { ContentItem } from "@/lib/types";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
// Read only components
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Title,
} from "./components/Heading";

import Divider from "./components/Divider";
import CalloutBox from "./components/CalloutBox";
import Blockquote from "./components/Blockquote";
import Paragraph from "./components/Paragraph";
import TableComponent from "./components/TableComponent";
import ColumnComponent from "./components/ColumnComponent";
import { BulletList, NumberedList, TodoList } from "./components/ListComponent";
import CodeBlock from "./components/CodeBlock";
import TableOfContents from "./components/TableOfContents";
import CustomImage from "./components/CustomImage";

// Props Type for SlideRenderer
type SlideRendererProps = {
  content: ContentItem;
};

// Animation settings for smooth rendering
const animationProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

// Recursive function to render slide content
const SlideRenderer: React.FC<SlideRendererProps> = ({ content }) => {
  if (!content) return null;

  switch (content.type) {
    case "heading1":
      return (
        <motion.div className="w-full h-full" {...animationProps}>
          <Heading1 value={content.content as string} />
        </motion.div>
      );

    case "heading2":
      return (
        <motion.div className="w-full h-full" {...animationProps}>
          <Heading2 value={content.content as string} />
        </motion.div>
      );

    case "heading3":
      return (
        <motion.div className="w-full h-full" {...animationProps}>
          <Heading3 value={content.content as string} />
        </motion.div>
      );

    case "heading4":
      return (
        <motion.div className="w-full h-full" {...animationProps}>
          <Heading4 value={content.content as string} />
        </motion.div>
      );

    case "title":
      return (
        <motion.div className="w-full h-full" {...animationProps}>
          <Title value={content.content as string} />
        </motion.div>
      );

    case "table":
      return (
        <motion.div className="w-full h-full" {...animationProps}>
          <TableComponent content={content.content as string[][]} />
        </motion.div>
      );

    case "resizable-column":
      if (Array.isArray(content.content)) {
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <ColumnComponent content={content.content as ContentItem[]} />
          </motion.div>
        );
      }
      return null;

    case "image":
      return (
        <motion.div className="w-full h-full" {...animationProps}>
          <CustomImage
            src={content.content as string}
            alt={content.alt || "image"}
          />
        </motion.div>
      );

    case "paragraph":
      return (
        <motion.div className="w-full h-full" {...animationProps}>
          <Paragraph value={content.content as string} />
        </motion.div>
      );

    case "blockquote":
      return (
        <motion.div className={cn("w-full h-full flex flex-col", content.className)} {...animationProps}>
          <Blockquote>
            <Paragraph value={content.content as string} />
          </Blockquote>
        </motion.div>
      );

    case "numberedList":
      return (
        <motion.div className="w-full h-full" {...animationProps}>
          <NumberedList items={content.content as string[]} />
        </motion.div>
      );

    case "bulletList":
      return (
        <motion.div className="w-full h-full" {...animationProps}>
          <BulletList items={content.content as string[]} />
        </motion.div>
      );

    case "todoList":
      return (
        <motion.div className="w-full h-full" {...animationProps}>
          <TodoList items={content.content as string[]} />
        </motion.div>
      );

    case "calloutBox":
      return (
        <motion.div className="w-full h-full" {...animationProps}>
          <CalloutBox type={content.callOutType || "info"}>
            <Paragraph value={content.content as string} />
          </CalloutBox>
        </motion.div>
      );

    case "codeBlock":
      return (
        <motion.div className="w-full h-full" {...animationProps}>
          <CodeBlock language={content.language} code={content.content as string} />
        </motion.div>
      );

    case "tableOfContents":
      return (
        <motion.div className="w-full h-full" {...animationProps}>
          <TableOfContents items={(content.content as string[]) || []} />
        </motion.div>
      );

    case "divider":
      return (
        <motion.div className="w-full h-full" {...animationProps}>
          <Divider />
        </motion.div>
      );

      case "column":
        if (Array.isArray(content.content)) {
          return (
            <motion.div className={cn("w-full h-full flex flex-col p-4", content.className)} {...animationProps}>
              {content.content.map((subItem, index) => {
                // Check if subItem is an object and has an `id` (i.e., it's a `ContentItem`)
                const key = typeof subItem === "object" && "id" in subItem ? subItem.id : `item-${index}`;
      
                return <SlideRenderer key={key} content={subItem as ContentItem} />;
              })}
            </motion.div>
          );
        }
        return null;

    default:
      return null;
  }
};

export default SlideRenderer;
