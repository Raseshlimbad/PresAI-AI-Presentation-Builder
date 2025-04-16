import PptxGenJS from "pptxgenjs";
import { Slide, ContentItem, Theme } from "@/lib/types";
import { useSlideStore } from "@/store/useSlideStore";

// Helper function to get text content from a content item
const getTextContent = (content: ContentItem): string => {
  if (typeof content.content === "string") {
    return content.content || content.placeholder || "";
  }
  return "";
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const extractTableData = (data: any): string[][] => {
  // Handle string content
  if (typeof data === "string") {
    return data.split("\n").map((row) => row.split(","));
  }

  // Handle array of arrays
  if (Array.isArray(data) && data.length > 0) {
    // If it's already a 2D array of strings
    if (Array.isArray(data[0])) {
      return data.map((row) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        row.map((cell: any) => String(cell?.content || cell || ""))
      );
    }

    // If it's an array of objects (TableRow[])
    if (typeof data[0] === "object") {
      return data.map((row) => {
        if (!row) return [];
        return Object.keys(row)
          .filter((key) => key === "0" || key === "1" || key === "2")
          .map((key) => String(row[key] || ""));
      });
    }
  }

  return [[]]; // Return empty table as fallback
};

// Helper function to calculate vertical position with better spacing
const calculateVerticalPosition = (index: number, type: string): number => {
  const basePosition = 0.5;
  const spacing = type === "title" ? 0.8 : 0.5; // More spacing for titles
  return basePosition + index * spacing;
};

// Helper function to recursively process content
const processContent = async (
  slidePpt: PptxGenJS.Slide,
  content: ContentItem,
  theme: Theme,
  index: number = 0,
  depth: number = 0,
  parentX: number = 0.5,
  parentWidth: number = 9
): Promise<number> => {
  const fontSize = {
    title: 44,
    heading1: 32,
    heading2: 28,
    heading3: 24,
    heading4: 20,
    paragraph: 16,
    default: 16,
  };

  const yPosition = calculateVerticalPosition(index, content.type);
  let nextIndex = index + 1;

  // Handle different content types
  switch (content.type) {
    case "title":
      slidePpt.addText(getTextContent(content), {
        x: 0.5, // Center align title
        y: yPosition,
        w: 9, // Full width for title
        h: 0.8,
        fontSize: fontSize.title,
        bold: true,
        color: theme.accentColor,
        align: "center",
        fontFace: theme.fontFamily,
        wrap: true,
      });
      break;

    case "heading1":
    case "heading2":
    case "heading3":
    case "heading4":
      slidePpt.addText(getTextContent(content), {
        x: 0.5 + depth * 0.3, // Indent for hierarchy
        y: yPosition,
        w: 8.5 - depth * 0.3, // Adjust width based on indent
        h: 0.6,
        fontSize: fontSize[content.type],
        bold: true,
        color: theme.accentColor,
        fontFace: theme.fontFamily,
        wrap: true,
      });
      break;

    case "paragraph":
      slidePpt.addText(getTextContent(content), {
        x: 0.5 + depth * 0.3,
        y: yPosition,
        w: 8.5 - depth * 0.3,
        h: 0.5,
        fontSize: fontSize.paragraph,
        color: theme.fontColor,
        fontFace: theme.fontFamily,
        breakLine: true,
        wrap: true,
      });
      break;

    case "bulletList":
      if (Array.isArray(content.content)) {
        const items = content.content as string[];
        const bulletPoints = items.map((item) => ({
          text: item,
          options: {
            bullet: true,
            color: theme.fontColor,
            fontSize: fontSize.default,
            fontFace: theme.fontFamily,
          },
        }));
        slidePpt.addText(bulletPoints, {
          x: 0.5 + depth * 0.3,
          y: yPosition,
          w: 8.5 - depth * 0.3,
          h: items.length * 0.4, // Increased height per item
          wrap: true,
        });
        nextIndex += items.length;
      }
      break;

    case "numberedList":
      if (Array.isArray(content.content)) {
        const items = content.content as string[];
        const numberedPoints = items.map((item, index) => ({
          // text: item,
          text: `${index + 1}. ${item}\n`,
          options: {
            // bullet: true,
            numbering: true,
            color: theme.fontColor,
            fontSize: fontSize.default,
            fontFace: theme.fontFamily,
          },
        }));
        slidePpt.addText(numberedPoints, {
          x: 0.5 + depth * 0.3,
          y: yPosition,
          w: 8.5 - depth * 0.3,
          h: items.length * 0.4,
          wrap: true,
        });
        nextIndex += items.length;
      }
      break;

    // Update the table case in processContent
    case "table":
      if (content.content) {
        const tableData = extractTableData(content.content).map((row) =>
          row.map((cell) => ({
            text: cell,
            options: {
              color: theme.fontColor,
              fontSize: fontSize.default,
              fontFace: theme.fontFamily,
              valign: "middle" as const,
              bold: false, // Add bold option
            },
          }))
        );

        // Make header row bold if table has data
        if (tableData.length > 0) {
          tableData[0] = tableData[0].map((cell) => ({
            ...cell,
            options: {
              ...cell.options,
              bold: true,
              fill: { color: "F5F5F5" }, // Light gray background for header
            },
          }));
        }

        slidePpt.addTable(tableData, {
          x: parentX + depth * 0.2,
          y: yPosition,
          w: parentWidth - depth * 0.4,
          border: { pt: 1, color: theme.accentColor },
          align: "left",
          fontFace: theme.fontFamily,
          fontSize: fontSize.default,
        });
        nextIndex += tableData.length;
      }
      break;

    case "image":
      try {
        slidePpt.addImage({
          path: content.content as string,
          x: parentX + depth * 0.2,
          y: yPosition,
          w: (parentWidth - depth * 0.4) * 0.8,
          h: 3,
          sizing: {
            type: "contain",
            w: (parentWidth - depth * 0.4) * 0.8,
            h: 3,
          },
        });
        nextIndex += 3;
      } catch (error) {
        console.error("Error adding image:", error);
      }
      break;

      case "blockquote":
        // Add left border rectangle
        slidePpt.addShape(PptxGenJS.ShapeType.rect, {
          x: parentX + depth * 0.2,
          y: yPosition,
          w: 0.1, // Thin border width
          h: 0.8,
          fill: { color: theme.accentColor },
          line: { color: theme.accentColor, width: 0 },
        });
      
        // Add text with proper padding and styling
        slidePpt.addText(getTextContent(content), {
          x: parentX + depth * 0.2 + 0.2, // Add padding after border
          y: yPosition,
          w: parentWidth - depth * 0.4 - 0.2,
          h: 0.8,
          fontSize: fontSize.default,
          italic: true,
          color: theme.fontColor,
          fontFace: theme.fontFamily,
          align: "left",
          valign: "middle",
          margin: [0.2, 0, 0.2, 0], // Add vertical margin
        });
        nextIndex += 1;
        break;
      
        slidePpt.addText(getTextContent(content), {
          x: parentX + depth * 0.2 + 0.3, // Added padding for left border
          y: yPosition + 0.1,
          w: parentWidth - depth * 0.4 - 0.4,
          h: 0.6,
          fontSize: fontSize.default,
          italic: true,
          color: theme.fontColor,
          fontFace: theme.fontFamily,
          align: "left",
          valign: "middle",
        });
        nextIndex += 1;
        break;

    case "codeBlock":
      slidePpt.addText(getTextContent(content), {
        x: parentX + depth * 0.2,
        y: yPosition,
        w: parentWidth - depth * 0.4,
        h: 1,
        fontSize: fontSize.default - 2,
        fontFace: "Courier New",
        color: theme.fontColor,
        fill: { color: "F5F5F5" },
      });
      nextIndex += 2;
      break;

    case "divider":
      slidePpt.addShape(PptxGenJS.ShapeType.line, {
        x: parentX + depth * 0.2,
        y: yPosition,
        w: parentWidth - depth * 0.4,
        h: 0,
        line: { color: theme.accentColor, width: 1 },
      });
      break;

    case "column":
    case "resizable-column":
      if (Array.isArray(content.content)) {
        const columns = content.content as ContentItem[];
        const columnWidth = (parentWidth - depth * 0.4) / columns.length;

        for (let i = 0; i < columns.length; i++) {
          const columnX = parentX + depth * 0.2 + i * columnWidth;
          nextIndex = await processContent(
            slidePpt,
            columns[i],
            theme,
            nextIndex,
            depth + 1,
            columnX,
            columnWidth
          );
        }
      }
      break;
  }

  return nextIndex;
};

// const processContent = async (
//   slidePpt: PptxGenJS.Slide,
//   content: ContentItem,
//   theme: Theme,
//   index: number = 0,
//   depth: number = 0,
//   parentX: number = 0.5,
//   parentWidth: number = 9
// ): Promise<number> => {
//   const fontSize = {
//     title: 44,
//     heading1: 32,
//     heading2: 28,
//     heading3: 24,
//     heading4: 20,
//     paragraph: 16,
//     default: 16,
//   };

//   // Adjust the spacing to prevent overflow
//   const basePosition = 0.5;
//   const spacing = 0.6; // Reduced vertical spacing
//   const yPosition = basePosition + index * spacing;
//   let nextIndex = index + 1;

//   // Handle different content types
//   switch (content.type) {
//     case "title":
//       slidePpt.addText(getTextContent(content), {
//         x: 0.5, // Center align title
//         y: yPosition,
//         w: 9, // Full width for title
//         h: 0.8,
//         fontSize: fontSize.title,
//         bold: true,
//         color: theme.accentColor,
//         align: "center",
//         fontFace: theme.fontFamily,
//         wrap: true,
//       });
//       break;

//     case "heading1":
//     case "heading2":
//     case "heading3":
//     case "heading4":
//       slidePpt.addText(getTextContent(content), {
//         x: 0.5 + depth * 0.3, // Indent for hierarchy
//         y: yPosition,
//         w: 9 - depth * 0.3, // Adjust width based on indent
//         h: 0.6,
//         fontSize: fontSize[content.type],
//         bold: true,
//         color: theme.accentColor,
//         fontFace: theme.fontFamily,
//         wrap: true,
//       });
//       break;

//     case "paragraph":
//       slidePpt.addText(getTextContent(content), {
//         x: 0.5 + depth * 0.3,
//         y: yPosition,
//         w: 9 - depth * 0.3,
//         h: 0.5,
//         fontSize: fontSize.paragraph,
//         color: theme.fontColor,
//         fontFace: theme.fontFamily,
//         breakLine: true,
//         wrap: true,
//       });
//       break;

//     case "bulletList":
//       if (Array.isArray(content.content)) {
//         const items = content.content as string[];
//         const bulletPoints = items.map((item) => ({
//           text: item,
//           options: {
//             bullet: true,
//             color: theme.fontColor,
//             fontSize: fontSize.default,
//             fontFace: theme.fontFamily,
//           },
//         }));
//         slidePpt.addText(bulletPoints, {
//           x: 0.5 + depth * 0.3,
//           y: yPosition,
//           w: 9 - depth * 0.3,
//           h: items.length * 0.4, // Adjusted height for bullet points
//           wrap: true,
//         });
//         nextIndex += items.length;
//       }
//       break;

//     case "numberedList":
//       if (Array.isArray(content.content)) {
//         const items = content.content as string[];
//         const numberedPoints = items.map((item, index) => ({
//           text: `${index + 1}. ${item}\n`,
//           options: {
//             numbering: true,
//             color: theme.fontColor,
//             fontSize: fontSize.default,
//             fontFace: theme.fontFamily,
//           },
//         }));
//         slidePpt.addText(numberedPoints, {
//           x: 0.5 + depth * 0.3,
//           y: yPosition,
//           w: 9 - depth * 0.3,
//           h: items.length * 0.4, // Adjusted height for numbered list
//           wrap: true,
//         });
//         nextIndex += items.length;
//       }
//       break;

//     case "table":
//       if (Array.isArray(content.content)) {
//         const tableData = (content.content as string[][]).map((row) =>
//           row.map((cell) => ({
//             text: cell,
//             options: {
//               color: theme.fontColor,
//               fontSize: fontSize.default,
//               fontFace: theme.fontFamily,
//               valign: "middle" as const,
//             },
//           }))
//         );

//         slidePpt.addTable(tableData, {
//           x: parentX + depth * 0.2,
//           y: yPosition,
//           w: parentWidth - depth * 0.4,
//           border: { pt: 1, color: theme.accentColor },
//           align: "left",
//           fontFace: theme.fontFamily,
//           fontSize: fontSize.default,
//         });
//         nextIndex += tableData.length;
//       }
//       break;

//     case "image":
//       try {
//         slidePpt.addImage({
//           path: content.content as string,
//           x: parentX + depth * 0.2,
//           y: yPosition,
//           w: (parentWidth - depth * 0.4) * 0.8,
//           h: 2.5, // Adjusted image height to fit better
//           sizing: {
//             type: "contain",
//             w: (parentWidth - depth * 0.4) * 0.8,
//             h: 2.5, // Adjusted height to fit
//           },
//         });
//         nextIndex += 2;
//       } catch (error) {
//         console.error("Error adding image:", error);
//       }
//       break;

//     case "blockquote":
//       slidePpt.addText(getTextContent(content), {
//         x: parentX + depth * 0.2 + 0.2,
//         y: yPosition,
//         w: parentWidth - depth * 0.4 - 0.4,
//         h: 0.8,
//         fontSize: fontSize.default,
//         italic: true,
//         color: theme.fontColor,
//         fontFace: theme.fontFamily,
//         fill: { color: "F5F5F5" },
//       });
//       break;

//     case "codeBlock":
//       slidePpt.addText(getTextContent(content), {
//         x: parentX + depth * 0.2,
//         y: yPosition,
//         w: parentWidth - depth * 0.4,
//         h: 1,
//         fontSize: fontSize.default - 2,
//         fontFace: "Courier New",
//         color: theme.fontColor,
//         fill: { color: "F5F5F5" },
//       });
//       nextIndex += 2;
//       break;

//     case "divider":
//       slidePpt.addShape(PptxGenJS.ShapeType.line, {
//         x: parentX + depth * 0.2,
//         y: yPosition,
//         w: parentWidth - depth * 0.4,
//         h: 0,
//         line: { color: theme.accentColor, width: 1 },
//       });
//       break;

//     case "column":
//     case "resizable-column":
//       if (Array.isArray(content.content)) {
//         const columns = content.content as ContentItem[];
//         const columnWidth = (parentWidth - depth * 0.4) / columns.length;

//         for (let i = 0; i < columns.length; i++) {
//           const columnX = parentX + depth * 0.2 + i * columnWidth;
//           nextIndex = await processContent(
//             slidePpt,
//             columns[i],
//             theme,
//             nextIndex,
//             depth + 1,
//             columnX,
//             columnWidth
//           );
//         }
//       }
//       break;
//   }

//   return nextIndex;
// };

// const processContent = async (
//   slidePpt: PptxGenJS.Slide,
//   content: ContentItem,
//   theme: Theme,
//   index: number = 0,
//   depth: number = 0,
//   parentX: number = 0.5,
//   parentWidth: number = 9
// ): Promise<number> => {
//   const fontSize = {
//     title: 44,
//     heading1: 32,
//     heading2: 28,
//     heading3: 24,
//     heading4: 20,
//     paragraph: 16,
//     default: 16,
//   };

//   const yPosition = calculateVerticalPosition(index, content.type);
//   let nextIndex = index + 1;

//   // Handle different content types
//   switch (content.type) {
//     case "title":
//       slidePpt.addText(getTextContent(content), {
//         x: 0.5, // Center align title
//         y: yPosition,
//         w: 4.2, // Half width for title to allow side-by-side content
//         h: 0.8,
//         fontSize: fontSize.title,
//         bold: true,
//         color: theme.accentColor,
//         align: "center",
//         fontFace: theme.fontFamily,
//         wrap: true,
//       });
//       break;

//     case "heading1":
//     case "heading2":
//     case "heading3":
//     case "heading4":
//       slidePpt.addText(getTextContent(content), {
//         x: 0.5 + depth * 0.3, // Indent for hierarchy
//         y: yPosition,
//         w: 4.2 - depth * 0.3, // Adjust width based on indent
//         h: 0.6,
//         fontSize: fontSize[content.type],
//         bold: true,
//         color: theme.accentColor,
//         fontFace: theme.fontFamily,
//         wrap: true,
//       });
//       break;

//     case "paragraph":
//       slidePpt.addText(getTextContent(content), {
//         x: 0.5 + depth * 0.3,
//         y: yPosition,
//         w: 4.2 - depth * 0.3,
//         h: 0.5,
//         fontSize: fontSize.paragraph,
//         color: theme.fontColor,
//         fontFace: theme.fontFamily,
//         breakLine: true,
//         wrap: true,
//       });
//       break;

//     case "bulletList":
//       if (Array.isArray(content.content)) {
//         const items = content.content as string[];
//         const bulletPoints = items.map((item) => ({
//           text: item,
//           options: {
//             bullet: true,
//             color: theme.fontColor,
//             fontSize: fontSize.default,
//             fontFace: theme.fontFamily,
//           },
//         }));
//         slidePpt.addText(bulletPoints, {
//           x: 0.5 + depth * 0.3,
//           y: yPosition,
//           w: 4.2 - depth * 0.3,
//           h: items.length * 0.4, // Increased height per item
//           wrap: true,
//         });
//         nextIndex += items.length;
//       }
//       break;

//     case "numberedList":
//       if (Array.isArray(content.content)) {
//         const items = content.content as string[];
//         const numberedPoints = items.map((item, index) => ({
//           text: `${index + 1}. ${item}\n`,
//           options: {
//             numbering: true,
//             color: theme.fontColor,
//             fontSize: fontSize.default,
//             fontFace: theme.fontFamily,
//           },
//         }));
//         slidePpt.addText(numberedPoints, {
//           x: 0.5 + depth * 0.3,
//           y: yPosition,
//           w: 4.2 - depth * 0.3,
//           h: items.length * 0.4,
//           wrap: true,
//         });
//         nextIndex += items.length;
//       }
//       break;

//     case "table":
//       if (Array.isArray(content.content)) {
//         const tableData = (content.content as string[][]).map((row) =>
//           row.map((cell) => ({
//             text: cell,
//             options: {
//               color: theme.fontColor,
//               fontSize: fontSize.default,
//               fontFace: theme.fontFamily,
//               valign: "middle" as const,
//             },
//           }))
//         );

//         slidePpt.addTable(tableData, {
//           x: parentX + depth * 0.2,
//           y: yPosition,
//           w: parentWidth - depth * 0.4,
//           border: { pt: 1, color: theme.accentColor },
//           align: "left",
//           fontFace: theme.fontFamily,
//           fontSize: fontSize.default,
//         });
//         nextIndex += tableData.length;
//       }
//       break;

//     case "image":
//       try {
//         slidePpt.addImage({
//           path: content.content as string,
//           x: parentX + depth * 0.2,
//           y: yPosition,
//           w: (parentWidth - depth * 0.4) * 0.8,
//           h: 3,
//           sizing: {
//             type: "contain",
//             w: (parentWidth - depth * 0.4) * 0.8,
//             h: 3,
//           },
//         });
//         nextIndex += 3;
//       } catch (error) {
//         console.error("Error adding image:", error);
//       }
//       break;

//     case "blockquote":
//       slidePpt.addText(getTextContent(content), {
//         x: parentX + depth * 0.2 + 0.2,
//         y: yPosition,
//         w: parentWidth - depth * 0.4 - 0.4,
//         h: 0.8,
//         fontSize: fontSize.default,
//         italic: true,
//         color: theme.fontColor,
//         fontFace: theme.fontFamily,
//         fill: { color: "F5F5F5" },
//       });
//       break;

//     case "codeBlock":
//       slidePpt.addText(getTextContent(content), {
//         x: parentX + depth * 0.2,
//         y: yPosition,
//         w: parentWidth - depth * 0.4,
//         h: 1,
//         fontSize: fontSize.default - 2,
//         fontFace: "Courier New",
//         color: theme.fontColor,
//         fill: { color: "F5F5F5" },
//       });
//       nextIndex += 2;
//       break;

//     case "divider":
//       slidePpt.addShape(PptxGenJS.ShapeType.line, {
//         x: parentX + depth * 0.2,
//         y: yPosition,
//         w: parentWidth - depth * 0.4,
//         h: 0,
//         line: { color: theme.accentColor, width: 1 },
//       });
//       break;

//     case "column":
//     case "resizable-column":
//       if (Array.isArray(content.content)) {
//         const columns = content.content as ContentItem[];
//         const columnWidth = (parentWidth - depth * 0.4) / columns.length;

//         for (let i = 0; i < columns.length; i++) {
//           const columnX = parentX + depth * 0.2 + i * columnWidth;
//           nextIndex = await processContent(
//             slidePpt,
//             columns[i],
//             theme,
//             nextIndex,
//             depth + 1,
//             columnX,
//             columnWidth
//           );
//         }
//       }
//       break;
//   }

//   return nextIndex;
// };

// Main function to generate PPTX
export const generateEnhancedPptx = async (
  slides: Slide[],
  title: string
  // options: PptxOptions = {}
) => {
  try {
    const { currentTheme } = useSlideStore.getState();
    const pptx = new PptxGenJS();

    // Set presentation properties
    pptx.author = "PresAI";
    pptx.company = "PresAI";
    pptx.revision = "1";
    pptx.subject = title;
    pptx.title = title;

    // Process each slide
    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i];
      const slidePpt = pptx.addSlide();

      // Set slide background
      if (currentTheme.gradientBackground) {
        slidePpt.background = { color: currentTheme.slideBackgroundColor };
      }

      // Process slide content
      await processContent(slidePpt, slide.content, currentTheme);
    }

    // Generate and download the PPTX file
    pptx.writeFile({ fileName: `${title.replace(/\s+/g, "-")}.pptx` });
  } catch (error) {
    console.error("Error generating enhanced PPTX:", error);
    throw error;
  }
};
