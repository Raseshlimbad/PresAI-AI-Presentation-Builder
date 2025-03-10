import PptxGenJS from "pptxgenjs";
import { v4 as uuidv4 } from "uuid";
import { Slide, ContentItem } from "@/lib/types";

// Helper Function to Map Content
const generateSlideContent = (slidePpt: PptxGenJS.Slide, content: ContentItem) => {
  switch (content.type) {
    case "title":
      slidePpt.addText(content.content as string || content.placeholder || "", {
        x: 0.5,
        y: 0.5,
        fontSize: 24,
        bold: true,
      });
      break;

    case "heading1":
      slidePpt.addText(content.content as string || content.placeholder || "", {
        x: 0.5,
        y: 0.5,
        fontSize: 28,
        bold: true,
      });
      break;

    case "heading2":
      slidePpt.addText(content.content as string || content.placeholder || "", {
        x: 0.5,
        y: 1,
        fontSize: 22,
        bold: true,
      });
      break;

    case "paragraph":
      slidePpt.addText(content.content as string || content.placeholder || "", {
        x: 0.5,
        y: 1.5,
        fontSize: 14,
      });
      break;

    case "image":
      slidePpt.addImage({
        path: content.content as string,
        x: 0.5,
        y: 0.5,
        w: 5,
        h: 3,
      });
      break;

      case "table":
        if (Array.isArray(content.content)) {
          const tableData = (content.content as string[][]).map((row) =>
            row.map((cell) => ({ text: cell }))
          );
          
          slidePpt.addTable(tableData, {
            x: 0.5,
            y: 0.5,
            w: 6,
            h: 3,
          });
        }
        break;

    case "bulletList":
      // ✅ FIX: Convert string[] to TextProps[] for Bullet Lists
      if (Array.isArray(content.content)) {
        const bulletText = (content.content as string[]).map((text) => ({
          text,
          options: { bullet: true },
        }));
        slidePpt.addText(bulletText, {
          x: 0.5,
          y: 0.5,
          fontSize: 14,
        });
      }
      break;

    case "blockquote":
      slidePpt.addText(content.content as string || content.placeholder || "", {
        x: 0.5,
        y: 0.5,
        fontSize: 18,
        italic: true,
      });
      break;

    case "codeBlock":
      slidePpt.addText(content.content as string || content.placeholder || "", {
        x: 0.5,
        y: 0.5,
        fontSize: 14,
        fontFace: "Courier New",
        color: "333333",
      });
      break;

    case "divider":
      slidePpt.addShape(PptxGenJS.ShapeType.rect, {
        x: 0.5,
        y: 1.5,
        w: 6,
        h: 0.1,
        fill: { color: "333333" },
      });
      break;

    default:
      console.warn("Unknown content type:", content.type);
      break;
  }
};

// Function to Generate PPTX from JSON
export const generatePptxFromJson = (jsonData: Slide[], title: string) => {
    const pptx = new PptxGenJS();
  
    jsonData.forEach((slide: Slide) => {
      const slidePpt = pptx.addSlide();
  
      if (Array.isArray(slide.content.content)) {
        slide.content.content.forEach((contentItem) => {
          if (typeof contentItem === "object" && contentItem !== null) {
            generateSlideContent(slidePpt, contentItem as ContentItem);
          }
        });
      } else {
        generateSlideContent(slidePpt, slide.content);
      }
    });
  
    // ✅ Generate and Download the PPTX file with Dynamic Title
    pptx.writeFile({ fileName: `${title.replace(/\s+/g, "-")}-${uuidv4()}.pptx` });
  };
