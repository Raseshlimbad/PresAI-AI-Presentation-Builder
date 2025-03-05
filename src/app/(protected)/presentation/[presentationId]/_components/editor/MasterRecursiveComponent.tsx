"use client";

import { ContentItem } from "@/lib/types";
import React, { useCallback } from "react";
import { motion } from "framer-motion";
import { Heading1, Heading2, Heading3, Heading4, Title } from "@/components/global/editor/components/Heading";
import { cn } from "@/lib/utils";
import DropZone from "./DropZone";
import Paragraph from "@/components/global/editor/components/Paragraph";

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

// Memoized component to render the content
const ContentRenderer: React.FC<MasterRecursiveComponentProps> = React.memo(
  ({ content, onContentChange, slideId, isEditable, isPreview, index }) => {
    // Handle change event for the content
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onContentChange(content.id, e.target.value);
      },
      [content.id, onContentChange]
    );

    // Common props for the components
    const commonProps = {
      placeholder: content.placeholder,
      value: content.content as string,
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
    // WIP: Complete types
    switch (content.type) {
      case "heading1":
        return (
          <motion.div className="w-full h-full"
          {...animationProps}>
            <Heading1 {...commonProps} />
          </motion.div>
        );
      case "heading2":
        return (
          <motion.div className="w-full h-full"
          {...animationProps}>
            <Heading2 {...commonProps} />
          </motion.div>
        );
      case "heading3":
        return (
          <motion.div className="w-full h-full"
          {...animationProps}>
            <Heading3 {...commonProps} />
          </motion.div>
        );
        case "heading4":
          return (
            <motion.div className="w-full h-full"
            {...animationProps}>
              <Heading4 {...commonProps} />
            </motion.div>
          );
        case "title":
          return (
            <motion.div className="w-full h-full"
            {...animationProps}>
              <Title {...commonProps} />
            </motion.div>
          );
        case "paragraph":
          return (
            <motion.div className="w-full h-full"
            {...animationProps}>
              <Paragraph {...commonProps} />
            </motion.div>
          );
        //   case "column":
      case "column":
        if (Array.isArray(content.content)) {
          return (
            // ✅ Add return here!
            <motion.div
              {...animationProps}
              className={cn("w-full h-full flex flex-col", content.className)}
            >
              {/* If the content is not empty, map through the content items */}
              {content.content.length > 0 ? (
                (content.content as ContentItem[]).map(
                  (subItem: ContentItem, subIndex: number) => (
                    <React.Fragment key={subItem.id || `item-${subIndex}`}>
                      {/* DropZone before first item */}
                      {!isPreview &&
                        !subItem.restrictToDrop &&
                        subIndex === 0 &&
                        isEditable && (
                          <DropZone
                            index={0}
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
              ) : isEditable ? (
                <DropZone index={0} slideId={slideId} parentId={content.id} />
              ) : null}
            </motion.div>
          );
        }
        return null;
      default:
        return null;
    }
  }
);

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
