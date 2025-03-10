import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Slide, ContentItem, Theme } from "@/lib/types";

// Helper Function to Map Content
const generateSlideContent = (
  slideDiv: HTMLDivElement,
  content: ContentItem
) => {
  switch (content.type) {
    case "title":
      slideDiv.innerHTML += `<h1 style="font-size: 24px; font-weight: bold;">${
        content.content || content.placeholder || ""
      }</h1>`;
      break;

    case "heading1":
      slideDiv.innerHTML += `<h2 style="font-size: 28px; font-weight: bold;">${
        content.content || content.placeholder || ""
      }</h2>`;
      break;

    case "heading2":
      slideDiv.innerHTML += `<h3 style="font-size: 22px; font-weight: bold;">${
        content.content || content.placeholder || ""
      }</h3>`;
      break;

    case "paragraph":
      slideDiv.innerHTML += `<p style="font-size: 14px;">${
        content.content || content.placeholder || ""
      }</p>`;
      break;

    case "image":
      slideDiv.innerHTML += `<img src="${content.content}" style="width:100%; height:auto; border-radius:8px;" />`;
      break;

    case "table":
      if (Array.isArray(content.content) && Array.isArray(content.content[0])) {
        let tableHtml = `<table border="1" style="width:100%; border-collapse:collapse;">`;
        (content.content as string[][]).forEach((row: string[]) => {
          tableHtml += `<tr>`;
          row.forEach((cell: string) => {
            tableHtml += `<td style="padding:8px;">${cell}</td>`;
          });
          tableHtml += `</tr>`;
        });
        tableHtml += `</table>`;
        slideDiv.innerHTML += tableHtml;
      }
      break;

    case "bulletList":
      if (Array.isArray(content.content)) {
        let listHtml = `<ul style="font-size: 14px;">`;
        (content.content as string[]).forEach((text: string) => {
          listHtml += `<li>${text}</li>`;
        });
        listHtml += `</ul>`;
        slideDiv.innerHTML += listHtml;
      }
      break;

    case "blockquote":
      slideDiv.innerHTML += `<blockquote style="font-size: 18px; font-style: italic; border-left: 4px solid #000; padding-left: 10px;">${content.content}</blockquote>`;
      break;

    case "codeBlock":
      slideDiv.innerHTML += `<pre style="background-color: #f4f4f4; padding: 10px; border-radius: 4px;"><code>${content.content}</code></pre>`;
      break;

    case "divider":
      slideDiv.innerHTML += `<hr style="border: 1px solid #ccc; margin: 10px 0;" />`;
      break;

    default:
      console.warn("Unknown content type:", content.type);
      break;
  }
};

// Function to Generate PDF from JSON
export const generatePdfFromJson = async (
  jsonData: Slide[],
  title: string,
  theme: Theme
) => {
  const pdf = new jsPDF("landscape", "mm", "a4");

  for (const slide of jsonData) {
    // ✅ Dynamically create a slide container
    const slideDiv = document.createElement("div");
    slideDiv.style.width = "800px";
    slideDiv.style.height = "600px";
    slideDiv.style.padding = "20px";
    slideDiv.style.backgroundColor =
      theme.slideBackgroundColor || "#ffffff"; // Use theme color
    slideDiv.style.borderRadius = "8px";
    slideDiv.style.fontFamily = theme.fontFamily || "Arial, sans-serif";
    slideDiv.style.color = theme.fontColor || "#000";

    // ✅ Render Slide Content
    if (Array.isArray(slide.content.content)) {
      (slide.content.content as ContentItem[]).forEach((contentItem) => {
        generateSlideContent(slideDiv, contentItem);
      });
    } else {
      generateSlideContent(slideDiv, slide.content);
    }

    // ✅ Append to body temporarily (hidden)
    document.body.appendChild(slideDiv);

    // ✅ Convert Slide to Canvas
    const canvas = await html2canvas(slideDiv, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");
    const imgWidth = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // ✅ Add Canvas as PDF Page
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.addPage();

    // ✅ Remove the slideDiv after capturing it
    document.body.removeChild(slideDiv);
  }

  // ✅ Remove the last blank page
  pdf.deletePage(pdf.internal.pages.length);

  // ✅ Download PDF
  pdf.save(`${title.replace(/\s+/g, "-")}.pdf`);
};
