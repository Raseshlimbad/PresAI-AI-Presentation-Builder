"use client";

import { ContentItem } from "@/lib/types";
import React, { useCallback } from "react";
import { motion } from "framer-motion";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Title,
} from "@/components/global/editor/components/Heading";
import { cn } from "@/lib/utils";
import DropZone from "./DropZone";
import Paragraph from "@/components/global/editor/components/Paragraph";
import TableComponent from "@/components/global/editor/components/TableComponent";
import ColumnComponent from "@/components/global/editor/components/ColumnComponent";
import CustomImage from "@/components/global/editor/components/ImageComponent";
import Blockquote from "@/components/global/editor/components/Blockquote";
import {
  NumberedList,
  BulletList,
  TodoList,
} from "@/components/global/editor/components/ListComponent";
import CalloutBox from "@/components/global/editor/components/CalloutBox";
import CodeBlock from "@/components/global/editor/components/CodeBlock";
import TableOfContents from "@/components/global/editor/components/TableOfContents";
import Divider from "@/components/global/editor/components/Divider";
// Define the types for the MasterRecursiveComponentProps
type MasterRecursiveComponentProps = {
  content: ContentItem;
  onContentChange: (
    contentId: string,
    newContent: string | string[] | string[][]
  ) => void;
  isPreview?: boolean;
  isEditable?: boolean;
  index?: number;
  slideId: string;
};

// Memoized component to render the content ------------------------------------------------------------------------------------------------
const ContentRenderer: React.FC<MasterRecursiveComponentProps> = React.memo(
  ({ content, onContentChange, slideId, isEditable, isPreview }) => {
    // Handle change event for the content
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onContentChange(content.id, e.target.value);
      },
      [content?.id, onContentChange]
    );

    const getCodeContent = (content: ContentItem): string | undefined => {
      if (!content) return undefined;

      if (typeof content.content === "string") {
        return content.content; // If content is a string, return it directly
      }

      if (
        content.type === "codeBlock" &&
        typeof content.codeBlock === "string"
      ) {
        return content.codeBlock; // If it's a codeBlock type and has a codeBlock string, return it
      }

      if (Array.isArray(content.content)) {
        for (const subContent of content.content) {
          const found = getCodeContent(subContent as ContentItem);
          if (found) return found; // Return the first valid code block found
        }
      }

      return undefined; // Return undefined if nothing is found
    };

    // Common props for the components
    const commonProps = {
      placeholder: content?.placeholder,
      value: content?.content as string,
      onChange: handleChange,
      isPreview: isPreview,
    };

    // Animation props for the components
    const animationProps = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 },
    };

    // Render the component based on the content type
    switch (content?.type) {
      // Heading 1
      case "heading1":
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <Heading1 {...commonProps} />
          </motion.div>
        );

      // Heading 2
      case "heading2":
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <Heading2 {...commonProps} />
          </motion.div>
        );

      // Heading 3
      case "heading3":
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <Heading3 {...commonProps} />
          </motion.div>
        );

      // Heading 4
      case "heading4":
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <Heading4 {...commonProps} />
          </motion.div>
        );

      // Title
      case "title":
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <Title {...commonProps} />
          </motion.div>
        );

      // Table
      case "table":
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <TableComponent
              content={content.content as string[][]}
              onChange={(newContent) =>
                onContentChange(
                  content.id,
                  newContent != null ? newContent : ""
                )
              }
              isEditable={isEditable}
              isPreview={isPreview}
              initialColSize={content.initialColumns}
              initialRowSize={content.initialRows}
            />
          </motion.div>
        );

      // Resizable Column
      case "resizable-column":
        if (Array.isArray(content.content)) {
          return (
            <motion.div className="w-full h-full" {...animationProps}>
              <ColumnComponent
                content={content.content as ContentItem[]}
                slideId={slideId}
                onContentChange={onContentChange}
                isEditable={isEditable}
                isPreview={isPreview}
                className={content.className}
              />
            </motion.div>
          );
        }
        return null;

      // Image
      case "image":
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <CustomImage
              src={content.content as string}
              // src="https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt={content.alt || "image"}
              contentId={content.id}
              onComponentChange={(newContent) =>
                onContentChange(content.id, newContent)
              }
              isEditable={isEditable}
              isPreview={isPreview}
              className={content.className}
            />
          </motion.div>
        );

      // Paragraph
      case "paragraph":
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <Paragraph {...commonProps} />
          </motion.div>
        );

      // Blockquote
      case "blockquote":
        return (
          <motion.div
            {...animationProps}
            className={cn("w-full h-full flex flex-col", content.className)}
          >
            {/* Blockquote */}
            <Blockquote>
              {/* Paragraph component call because blockquote is a paragraph */}
              <Paragraph {...commonProps} />
            </Blockquote>
          </motion.div>
        );

      // Numbered List
      case "numberedList":
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <NumberedList
              items={content.content as string[]}
              onChange={(newItems) => onContentChange(content.id, newItems)}
              className={content.className}
              // isEditable={isEditable}
            />
          </motion.div>
        );

      // Bullet List
      case "bulletList":
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <BulletList
              items={content.content as string[]}
              onChange={(newItems) => onContentChange(content.id, newItems)}
              className={content.className}
              // isEditable={isEditable}
            />
          </motion.div>
        );

      // Todo List
      case "todoList":
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <TodoList
              items={content.content as string[]}
              onChange={(newItems) => onContentChange(content.id, newItems)}
              className={content.className}
              // isEditable={isEditable}
            />
          </motion.div>
        );

      // Callout Box
      case "calloutBox":
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <CalloutBox
              type={content.callOutType || "info"}
              className={content.className}
            >
              <Paragraph {...commonProps} />
            </CalloutBox>
          </motion.div>
        );

      case "codeBlock":
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <CodeBlock
              language={content.language}
              className={content.className}
              onChange={(newCode) => {
                onContentChange(content.id, newCode);
              }}
              code={getCodeContent(content) || ""} // Ensures a string is passed
            />
          </motion.div>
        );

      case "tableOfContents":
        return (
          <TableOfContents
          items = {content.content as string[] || []}
            className={content.className}
            onItemClick={(id) => {
              console.log(`Navigate to section: ${id}`);
            }}
          isEditable={isEditable}
          onUpdateItem={(index, newValue) => {
            const updatedItems = [...(content.content as string[] || [])];
            updatedItems[index] = newValue;
            onContentChange(content.id, updatedItems);
          }}
        />);

      // Divider
      case "divider":
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <Divider className={content.className} />
          </motion.div>
        );

      //   case "column":
      case "column":
        if (Array.isArray(content.content)) {
          return (
            // ✅ Add return here!
            <motion.div
              {...animationProps}
              className={cn("w-full h-full flex flex-col p-4", content.className)}
            >
              {/* If the content is not empty, map through the content items */}
              {content.content.length > 0 ? (
                // Map through the content items
                (content.content as ContentItem[]).map(
                  // Render the content sub items
                  (subItem: ContentItem, subIndex: number) => (
                    <React.Fragment key={subItem.id || `item-${subIndex}`}>
                      {/* DropZone before first item */}
                      {!isPreview &&
                        !subItem.restrictToDrop &&
                        subIndex === 0 &&
                        isEditable && (
                          // DropZone before first item
                          <DropZone
                            index={subIndex + 1}
                            slideId={slideId}
                            parentId={content.id}
                          />
                        )}

                      {/* Recursively render nested content */}
                      <MasterRecursiveComponent
                        content={subItem}
                        onContentChange={onContentChange}
                        slideId={slideId}
                        isEditable={isEditable}
                        isPreview={isPreview}
                        index={subIndex}
                      />

                      {/* DropZone after each item */}
                      {!isPreview && !subItem.restrictToDrop && isEditable && (
                        <DropZone
                          index={subIndex + 1}
                          slideId={slideId}
                          parentId={content.id}
                        />
                      )}
                    </React.Fragment>
                  )
                )
              ) : // If the content is empty, render a drop zone
              isEditable ? (
                <DropZone index={0} slideId={slideId} parentId={content.id} />
              ) : null}
            </motion.div>
          );
        }
        // If the content is not an array, return null
        return null;
      // If the content is not a valid type, return null as default
      default:
        return null;
    }
  }
);

// Display name for the ContentRenderer component
ContentRenderer.displayName = "ContentRenderer";

// Memoized component to render the master recursive component
export const MasterRecursiveComponent: React.FC<MasterRecursiveComponentProps> =
  React.memo(
    ({
      content,
      onContentChange,
      slideId,
      index,
      isEditable = false,
      isPreview = false,
    }) => {
      // If the content is in preview mode, render the content renderer
      if (isPreview) {
        return (
          <ContentRenderer
            content={content}
            onContentChange={onContentChange}
            slideId={slideId}
            isEditable={isEditable}
            isPreview={isPreview}
            index={index}
          />
        );
      }

      // If the content is not in preview mode, render the master recursive component
      return (
        <React.Fragment>
          <ContentRenderer
            content={content}
            onContentChange={onContentChange}
            slideId={slideId}
            isEditable={isEditable}
            isPreview={isPreview}
            index={index}
          />
        </React.Fragment>
      );
    }
  );

MasterRecursiveComponent.displayName = "MasterRecursiveComponent";
