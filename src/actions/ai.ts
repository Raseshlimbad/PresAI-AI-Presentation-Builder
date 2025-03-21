"use server";

import { client } from "@/lib/prisma";
import { ContentItem, Slide } from "@/lib/types";
import { currentUser } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { v4 as uuidv4 } from "uuid";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is missing in environment variables.");
}

// Initialize Google Generative AI
const google = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Generate Creative Prompt #########################################################################################################################################
export const generateCreativePrompt = async (
  userPrompt: string,
  numberOfOutlines: number
) => {
  try {
    // Get Model
    const model = google.getGenerativeModel({ model: "gemini-1.5-flash" });

    const finalPrompt = `
      Create a coherent and relevant outline for the following prompt: ${userPrompt}.
      The outline should consist of at least 6 points, with each point written as a single sentence.
      Ensure the outline is well-structured and directly related to the topic.
      Return the output in the following JSON format:

      {
          "outlines": [
              "Point 1",
              "Point 2",
              "Point 3",
              "Point 4",
              "Point 5",
              "Point 6"
              // Continue up to ${numberOfOutlines} points
          ]
      }

      Ensure that the JSON is valid and properly formatted. Do not include any other text or explanation outside the JSON and generate .
    `;
    const response = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: finalPrompt }] }],
    });

    const responseContent =
      response?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (responseContent) {
      try {
        // 🛠 Remove triple backticks if present
        const cleanedResponse = responseContent
          .replace(/```json|```/g, "")
          .trim();

        //  Parse cleaned JSON
        const jsonResponse = JSON.parse(cleanedResponse);
        // console.log(jsonResponse)
        return { status: 200, data: jsonResponse };
      } catch (error) {
        console.error("Invalid JSON received from AI:", responseContent, error);
        return { status: 500, error: "Invalid JSON received from AI" };
      }
    }

    return { status: 400, error: "No response from AI" };
  } catch (error) {
    console.error("Error generating outline:", error);
    return { status: 500, error: "Internal server error" };
  }
};

// Find Image Components #########################################################################################################################################
const findImageComponents = (layout: ContentItem): ContentItem[] => {
  const images = [];
  if (layout.type === "image") {
    images.push(layout);

    if (Array.isArray(layout.content)) {
      layout.content.forEach((child) => {
        images.push(...findImageComponents(child as ContentItem));
      });
    } else if (layout.content && typeof layout.content === "object") {
      images.push(...findImageComponents(layout.content));
    }
  }
  console.log("findImageComponents", images);
  return images;
};

// Generate Image URL #########################################################################################################################################
const generateImageUrl = async (prompt: string): Promise<string> => {
  try {
    const improvedPrompt = `
      Create a highly realistic, professional image based on the following description. The image should look as if captured in real life, with attention to detail, lighting, and texture.
  
      Description: ${prompt}
  
      Important Notes:
      - Image size must be 1024x1024px.
      - The image must be in a photorealistic style and visually compelling.
      - Ensure all text, signs, or visible writing in the image are in English.
      - Pay special attention to lighting, shadows, and textures to make the image as lifelike as possible.
      - Avoid elements that appear abstract, cartoonish, or overly artistic. The image should be suitable for professional presentations.
      - Focus on accurately depicting the concept described, including specific objects, environment, mood, and context. Maintain relevance to the description provided.
      
      Example Use Cases: Business presentation, educational slides, professional designs.
      
      `;

    const model = google.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: improvedPrompt }] }],
    });

    const imageUrl =
      result.response?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!imageUrl) throw new Error("Failed to generate image URL");

    console.log("Generated Image URL:", imageUrl);

    console.log("Image generated successfully: ", imageUrl);
    return imageUrl || "https://via.placeholder.com/1024";
  } catch (error) {
    console.error("Error generating image URL:", error);
    return "https://via.placeholder.com/1024";
  }
};

// const existingLayouts = [
//   {
//     id: uuidv4(),
//     slideName: "Two Column with Header",
//     type: "twoColumns",
//     className: "p-6 mx-auto flex flex-col items-center",
//     content: {
//       id: uuidv4(),
//       type: "row" as ContentType,
//       name: "Header Row",
//       content: [
//         {
//           id: uuidv4(),
//           type: "title" as ContentType,
//           name: "Main Header",
//           content: "",
//           placeholder: "Enter Slide Title...",
//         },
//       ],
//     },
//     body: {
//       id: uuidv4(),
//       type: "row" as ContentType,
//       name: "Two Columns",
//       content: [
//         {
//           id: uuidv4(),
//           type: "column" as ContentType,
//           name: "Left Column",
//           className: "p-4 border-r",
//           content: [
//             {
//               id: uuidv4(),
//               type: "paragraph" as ContentType,
//               name: "",
//               content: "",
//               placeholder: "Write something here...",
//             },
//           ],
//         },
//         {
//           id: uuidv4(),
//           type: "column" as ContentType,
//           name: "Right Column",
//           className: "p-4",
//           content: [
//             {
//               id: uuidv4(),
//               type: "image" as ContentType,
//               name: "Image Block",
//               content: "",
//               placeholder: "Upload an image...",
//             },
//           ],
//         },
//       ],
//     },
//   },
//   {
//     id: uuidv4(),
//     slideName: "Single Column Text",
//     type: "singleColumn",
//     className: "p-6 mx-auto flex flex-col items-center",
//     content: {
//       id: uuidv4(),
//       type: "column" as ContentType,
//       name: "Main Column",
//       content: [
//         {
//           id: uuidv4(),
//           type: "title" as ContentType,
//           name: "Slide Title",
//           content: "",
//           placeholder: "Enter your title...",
//         },
//         {
//           id: uuidv4(),
//           type: "paragraph" as ContentType,
//           name: "",
//           content: "",
//           placeholder: "Write detailed content here...",
//         },
//         {
//           id: uuidv4(),
//           type: "paragraph" as ContentType,
//           name: "",
//           content: "",
//           placeholder: "Add more details...",
//         },
//       ],
//     },
//   },
//   {
//     id: uuidv4(),
//     slideName: "Grid Layout",
//     type: "grid",
//     className: "p-6 mx-auto grid grid-cols-2 gap-4",
//     content: [
//       {
//         id: uuidv4(),
//         type: "column" as ContentType,
//         name: "Top Left",
//         content: [
//           {
//             id: uuidv4(),
//             type: "title" as ContentType,
//             name: "Subtitle",
//             content: "",
//             placeholder: "Enter subtitle...",
//           },
//         ],
//       },
//       {
//         id: uuidv4(),
//         type: "column" as ContentType,
//         name: "Top Right",
//         content: [
//           {
//             id: uuidv4(),
//             type: "image" as ContentType,
//             name: "Picture Block",
//             content: "",
//             placeholder: "Upload an image...",
//           },
//         ],
//       },
//       {
//         id: uuidv4(),
//         type: "column" as ContentType,
//         name: "Bottom Left",
//         content: [
//           {
//             id: uuidv4(),
//             type: "paragraph" as ContentType,
//             name: "",
//             content: "",
//             placeholder: "Write additional text...",
//           },
//         ],
//       },
//       {
//         id: uuidv4(),
//         type: "column" as ContentType,
//         name: "Bottom Right",
//         content: [
//           {
//             id: uuidv4(),
//             type: "list" as ContentType,
//             name: "Bullet Points",
//             content: "",
//             placeholder: "Add bullet points...",
//           },
//         ],
//       },
//     ],
//   },
// ];

const replaceImagePlaceholders = async (layout: Slide) => {
  console.log("layout", layout);
  const imageComponents = findImageComponents(layout.content);
  console.log("Found image components: ", imageComponents);
  for (const component of imageComponents) {
    console.log("Generating image for component:", component.alt);
    component.content = await generateImageUrl(
      component.alt || "Placeholder Image"
    );
    console.log("Generated URL:", component.content);
  }
};

// ########################################################## Original generateLayoutJson function ##########################################################
// Generate Layouts in Json Format for the Project #########################################################################################################################################
// export const generateLayoutsJson = async (outlineArray: string[]) => {
  // const prompt = `
  // You are highly creative AI that generates JSON-based layouts for presentations.I will provide you with an array of outlines, and for each outline, you must generate a unique and creative layout. Use the existing layouts as examples for structure and design, and generate unique designs bases on the provided outlines.

  // ### Guidlines:
  // 1. Write layouts based on the specific outline provided.
  // 2. user diverse and engaging designs, ensuring each layout is unique.
  // 3. Adhere to the structure of the existing layouts but add new styles or components ifneeded.
  // 4. Fill placeholder data into content fields where required.
  // 5. Generate unique image placeholders for the 'content' property to image components and also alt text according to the outline.
  // 6. Ensure proper formatting and schema alignment for the output JSON.

  // ### Example Layouts:
  // ${JSON.stringify(existingLayouts, null, 2)}

  // ### Outline Array:
  // ${JSON.stringify(outlineArray)}

  // For each entry in the outline array, generate:
  // - A unique JSON layout with creative desins.
  // - Properly filled for image components.
  // - Clear and well-structured JSON data.

  // For Images
  // - The alt text should describe the image clearly and concisely.
  // - Focus on the main subject(s) of the image and relavent details such as colors, shapes, people, or objects.
  // - Ensure that alt text aligns with the context of the presentation slide it will be used on (e.g., professional, educational, business-releted).
  // - Avoid using terms like "image of" or "picture of", and instead focus directly on the content and meaning.

  // Output the layout in JSON format. Ensure the are no duplicate layout across the array.
  //  `;

  // Test Prompt 1 ---------------------------------------------------
  //   const prompt = `### Guidelines
  // You are a highly creative AI that generates JSON-based layouts for presentations. I will provide you with a pattern and a format to follow, and for each outline, you must generate unique layouts and contents and give me the output in the JSON format expected.
  // Our final JSON output is a combination of layouts and elements. The available LAYOUTS TYPES are as follows: "accentLeft", "accentRight", "imageAndText", "textAndImage", "twoColumns", "twoColumnsWithHeadings", "threeColumns", "threeColumnsWithHeadings", "fourColumns", "twoImageColumns", "threeImageColumns", "fourImageColumns", "tableLayout".
  // The available CONTENT TYPES are "heading1", "heading2", "heading3", "heading4", "title", "paragraph", "table", "resizable-column", "image",
  // "blockquote", "numberedList", "bulletList", "todoList", "calloutBox", "codeBlock", "tableOfContents", "divider", "column"

  // Use these outlines as a starting point for the
  // content of the presentations
  // ${JSON.stringify(outlineArray)}

  // The output must be an array of JSON objects.
  // 1. Write layouts based on the specific outline provided. Do not use types that are not mentioned in the example layouts.
  // 2. Ensuring each layout is unique.
  // 3. Adhere to the structure of existing layouts.
  // 4. Fill placeholder data into content fields where required.
  // 5. Generate unique image placeholders for the 'content' property of image components and also alt text according to the outline.
  // 6. Ensure proper formatting and schema alignment for the output JSON.
  // 7. First create LAYOUTS TYPES at the top most level of the JSON output as follows ${JSON.stringify(
  //     [
  //       {
  //         id: uuidv4(),
  //         slideName: "Blank card",
  //         type: "blank-card",
  //         className: "p-8 mx-auto flex justify-center items-center min-h-[200px]",
  //         content: [
  //           {
  //             "id": uuidv4(),
  //             "name": "Title",
  //             "type": "title",
  //             "content": "",
  //             "placeholder": "Untitled Card"
  //           }
  //         ],
  //       },
  //     ]
  //   )}

  //   8. The content property of each LAYOUTS TYPE should start with "column" and within the columns content property you can use any of the CONTENT TYPES I provided above. Resizable-column, column and other multi element contents should be an array because you can have more elements inside them nested. Static elements like title and paragraph should have content set to a string. Here is an example of what 1 layout with 1 column with 1 title inside would look like:
  //   ${JSON.stringify([
  //     {
  //       id: uuidv4(),
  //       slideName: "Blank card",
  //       type: "blank-card",
  //       className: "p-8 mx-auto flex justify-center items-center min-h-[200px]",
  //       content: {
  //         id: uuidv4(),
  //         type: "column" as ContentType,
  //         name: "Column",
  //         content: [
  //           {
  //             id: uuidv4(),
  //             type: "title" as ContentType,
  //             name: "Title",
  //             content: "",
  //             placeholder: "Untitled Card",
  //           },
  //         ],
  //       },
  //     },
  //   ])}

  //   9. Here is a final example of an example output for you to get an idea
  //   ${JSON.stringify([
  //     {
  //       id: uuidv4(),
  //       slideName: "Blank card",
  //       type: "blank-card",
  //       className: "p-8 mx-auto flex justify-center items-center min-h-[200px]",
  //       content: {
  //         id: uuidv4(),
  //         type: "column" as ContentType,
  //         name: "Column",
  //         content: [
  //           {
  //             id: uuidv4(),
  //             type: "title" as ContentType,
  //             name: "Title",
  //             content: "",
  //             placeholder: "Untitled Card",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       id: uuidv4(),
  //       slideName: "Accent left",
  //       type: "accentLeft",
  //       className: "min-h-[300px]",
  //       content: {
  //         id: uuidv4(),
  //         type: "column" as ContentType,
  //         name: "Column",
  //         restrictDropTo: true,
  //         content: [
  //           {
  //             id: uuidv4(),
  //             type: "resizable-column" as ContentType,
  //             name: "Resizable column",
  //             restrictToDrop: true,
  //             content: [
  //               {
  //                 id: uuidv4(),
  //                 type: "image" as ContentType,
  //                 name: "Image",
  //                 content:
  //                   "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3FDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //                 alt: "Title",
  //               },
  //               {
  //                 id: uuidv4(),
  //                 type: "column" as ContentType,
  //                 name: "Column",
  //                 content: [
  //                   {
  //                     id: uuidv4(),
  //                     type: "heading1" as ContentType,
  //                     name: "Heading1",
  //                     content: "",
  //                     placeholder: "Heading1",
  //                   },
  //                   {
  //                     id: uuidv4(),
  //                     type: "paragraph" as ContentType,
  //                     name: "Paragraph",
  //                     content: "",
  //                     placeholder: "start typing here...",
  //                   },
  //                 ],
  //                 className: "w-full h-full p-8 flex justify-center items-center",
  //                 placeholder: "Heading1",
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     },
  //   ])}

  //   For Images
  // - The alt text should describe the image clearly and concisely.
  // - Focus on the main subject(s) of the image and any relevant details such as colors, shapes, people, or objects.
  // - Ensure the alt text aligns with the context of the presentation slide it will be used on (e.g., professional, educational, business-related).
  // - Avoid using terms like "image of" or "picture of," and instead focus directly on the content and meaning.

  // Output the layouts in JSON format. Ensure there are no duplicate layouts across the array.
  // `;

//   // Test Prompt 2 ---------------------------------------------------

//   const prompt = `### Guidelines
// You are a highly creative AI that generates JSON-based layouts for presentations. I will provide you with a pattern and a format to follow, and for each outline, you must generate unique layouts and contents and give me the output in the JSON format expected.
// Our final JSON output is a combination of layouts and elements. The available LAYOUTS TYPES are as follows: "accentLeft", "accentRight", "imageAndText", "textAndImage", "twoColumns", "twoColumnsWithHeadings", "threeColumns", "threeColumnsWithHeadings", "fourColumns", "twoImageColumns", "threeImageColumns", "fourImageColumns", "tableLayout".
// The available CONTENT TYPES are "heading1", "heading2", "heading3", "heading4", "title", "paragraph", "table", "resizable-column", "image", 
// "blockquote", "numberedList", "bulletList", "todoList", "calloutBox", "codeBlock", "tableOfContents", "divider", "column".

// Use these outlines as a starting point for the 
// content of the presentations:
// ${JSON.stringify(outlineArray)}

// The output must be an array of JSON objects.
// 1. Write layouts based on the specific outline provided. Do not use types that are not mentioned in the example layouts.
// 2. Ensure each layout is unique.
// 3. Adhere to the structure of existing layouts.
// 4. Fill placeholder data into content fields where required.
// 5. Generate unique image placeholders for the 'content' property of image components and also alt text according to the outline.
// 6. Ensure proper formatting and schema alignment for the output JSON.
// 7. The "content" property of each layout should strictly follow a structured format. Avoid using "content2", "content3", or any alternative names—only "content" should be used.

// 8. The "content" property of each layout should start with a "column", and within the column's content property, you can use any of the CONTENT TYPES provided above. 
//    - "resizable-column", "column", and other multi-element content types should be arrays because they may contain nested elements.
//    - Static elements like "title" and "paragraph" should have content set to a string.
//    - Here is an example of what one layout with one column with a title inside would look like:

//    ${JSON.stringify([
//      {
//        id: uuidv4(),
//        slideName: "Blank card",
//        type: "blank-card",
//        className: "p-8 mx-auto flex justify-center items-center min-h-[200px]",
//        content: {
//          id: uuidv4(),
//          type: "column",
//          name: "Column",
//          content: [
//            {
//              id: uuidv4(),
//              type: "title",
//              name: "Title",
//              content: "",
//              placeholder: "Untitled Card",
//            },
//          ],
//        },
//      },
//    ])}

// 9. Here is a final example output to ensure consistency and correctness:
// ${JSON.stringify([
//   {
//     id: uuidv4(),
//     slideName: "Accent Left",
//     type: "accentLeft",
//     className: "min-h-[300px]",
//     content: {
//       id: uuidv4(),
//       type: "column",
//       name: "Column",
//       restrictDropTo: true,
//       content: [
//         {
//           id: uuidv4(),
//           type: "resizable-column",
//           name: "Resizable column",
//           restrictToDrop: true,
//           content: [
//             {
//               id: uuidv4(),
//               type: "image",
//               name: "Image",
//               content:
//                 "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3FDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//               alt: "Conceptual image of digital connectivity",
//             },
//           ],
//         },
//         {
//           id: uuidv4(),
//           type: "column",
//           name: "Column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "heading1",
//               name: "Heading1",
//               content: "",
//               placeholder: "Heading1",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               name: "Paragraph",
//               content: "",
//               placeholder: "Start typing here...",
//             },
//           ],
//           className: "w-full h-full p-8 flex justify-center items-center",
//           placeholder: "Heading1",
//         },
//       ],
//     },
//   },
// ])}

// For Images:
// - The alt text should describe the image clearly and concisely.
// - Focus on the main subject(s) of the image and any relevant context.
// - Example: Instead of "An image of a laptop," use "A developer coding on a laptop in a dimly lit room."

// Now generate the JSON output based on these rules.`;

//   try {
//     console.log("Generating layouts JSON ....");

//     if (!process.env.GEMINI_API_KEY) {
//       throw new Error("GEMINI_API_KEY is missing in environment variables.");
//     }

//     const model = google.getGenerativeModel({ model: "gemini-2.0-flash" });

//     const response = await model.generateContent({
//       contents: [{ role: "user", parts: [{ text: prompt }] }],
//     });

//     const responseContent =
//       response?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

//     if (responseContent) {
//       try {
//         // 🛠 Remove triple backticks if present
//         const cleanedResponse = responseContent
//           .replace(/```json|```/g, "")
//           .trim();

//         //  Parse cleaned JSON
//         const jsonResponse = JSON.parse(cleanedResponse);
//         // console.log(jsonResponse)

//         await Promise.all(jsonResponse.map(replaceImagePlaceholders));
//         // console.log("jsonResponse", jsonResponse);
//         return { status: 200, data: jsonResponse };
//       } catch (error) {
//         console.error(
//           "Invalid JSON layouts received from AI:",
//           responseContent,
//           error
//         );
//         return { status: 500, error: "Invalid JSON layouts received from AI" };
//       }
//     }

//     return { status: 400, error: "No response from AI" };
//   } catch (error) {
//     console.error("Error generating layouts JSON:", error);
//     return {
//       status: 500,
//       error: "Internal server error generating layouts JSON",
//     };
//   }
// };


// Function to recursively generate unique IDs
const generateUniqueIds = (content: ContentItem): ContentItem => {
  if (Array.isArray(content.content)) {
    return {
      ...content,
      id: uuidv4(),
      content: content.content
        .filter((item): item is ContentItem => typeof item === "object")
        .map((item) => generateUniqueIds(item)),
    };
  } else {
    return { ...content, id: uuidv4() };
  }
};

const parseSlideJson = (cleanedResponse: string): Slide | null => {
  try {
    // Attempt to parse the cleaned response into a JSON object
    const slide: Slide = JSON.parse(cleanedResponse);
    return slide;
  } catch (error) {
    // If JSON parsing fails, log the error and return null
    console.error("Invalid JSON structure:", cleanedResponse, error);
    return null;
  }
};

// Utility function for rate limiting
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Function to generate a single slide based on an outline
export const generateSlideJson = async (outline: string, slideOrder: number): Promise<Slide | null> => {
  // const prompt = `### Guidelines
  // You are an AI that generates JSON-based layouts for presentations. You will receive a single slide outline and must generate a **single slide JSON** following these rules:
  
  // 1. Use only these layout types:  
  //    "accentLeft", "accentRight", "imageAndText", "textAndImage", "twoColumns", "twoColumnsWithHeadings", "threeColumns", "threeColumnsWithHeadings", "fourColumns", "twoImageColumns", "threeImageColumns", "fourImageColumns", "tableLayout".
  
  // 2. Use only these content types:  
  //    "heading1", "heading2", "heading3", "heading4", "title", "paragraph", "table", "resizable-column", "image", "blockquote", "numberedList", "bulletList", "todoList", "calloutBox", "codeBlock", "tableOfContents", "divider", "column".
  
  // 3. **Strict Naming Rules:**  
  //    - The key '"content"' **must always be exactly '"content"', never '"content1"', '"content2"', etc.**  
  //    - The type '"column"' **must always be exactly '"column"', never '"column1"', '"column2"', etc.**  

  // 4. **Handling column-based layouts:**  
  //    - If the layout type is **"twoColumns", "twoColumnsWithHeadings", "threeColumns", "threeColumnsWithHeadings", "fourColumns", "twoImageColumns",        "threeImageColumns", "fourImageColumns"**, then create **multiple "column" content types at the same nesting level** instead of wrapping them inside another object.

  // 5. **For bullet lists ('bulletList' and 'numberedList'),** the "content" **must be an array of strings**, not HTML. Example:  
  //    ✅ Correct:  
  //    \`\`\`json
  //    { "type": "bulletList", "content": ["Item 1", "Item 2", "Item 3"] }
  //    \`\`\`  
  //    ❌ Incorrect:  
  //    \`\`\`json
  //    { "type": "bulletList", "content": "<ul><li>Item 1</li><li>Item 2</li></ul>" }
  //    \`\`\`
  
  // 6. The JSON structure **must** match the following format:
  //    ${JSON.stringify({
  //      id: uuidv4(),
  //      slideName: "Sample Slide",
  //      type: "imageAndText",
  //      slideOrder: slideOrder,
  //      className: "min-h-[300px]",
  //      content: {
  //        id: uuidv4(),
  //        type: "column",
  //        name: "Column",
  //        content: [
  //          {
  //            id: uuidv4(),
  //            type: "heading1",
  //            name: "Heading1",
  //            content: "",
  //            placeholder: "Enter heading...",
  //          },
  //          {
  //            id: uuidv4(),
  //            type: "paragraph",
  //            name: "Paragraph",
  //            content: "",
  //            placeholder: "Enter description...",
  //          },
  //          {
  //            id: uuidv4(),
  //            type: "bulletList",
  //            name: "Bullet List",
  //            content: ["Item 1", "Item 2", "Item 3"], 
  //            placeholder: "Enter list items...",
  //          }
  //        ],
  //      },
  //    })}
  
  // 7. Generate only **one slide** based on the following outline:  
  //    **Outline:** ${outline}
  
  // 8. Ensure that every "id" field is a valid UUID.
  
  // Now, generate the JSON output for this slide.`;

//   const prompt = `### Guidelines  
// You are an AI that generates **JSON-based layouts** for presentations. You will receive **one slide outline at a time** and must generate a **single slide JSON** following these rules:  

// ### 1. Allowed Layout Types  
// Use **only** these layout types:  
// - "accentLeft", "accentRight", "imageAndText", "textAndImage", "twoColumns", "twoColumnsWithHeadings", "threeColumns", "threeColumnsWithHeadings", "fourColumns", "twoImageColumns", "threeImageColumns", "fourImageColumns", "tableLayout".  

// ### 2. Allowed Content Types  
// Use **only** these content types:  
// - "heading1", "heading2", "heading3", "heading4", "title", "paragraph", "table", "resizable-column", "image", "blockquote", "numberedList", "bulletList", "todoList", "calloutBox", "codeBlock", "tableOfContents", "divider", "column".  

// ### 3. **Strict Naming Rules**  
// - The key **"content"** must **always** be **exactly "content"**, never **"content1"**, **"content2"**, etc.  
// - The type **"column"** must **always** be **exactly "column"**, never **"column1"**, **"column2"**, etc.  

// ### 4. **Column-Based Layout Handling**  
// For layouts like:  
// - **"twoColumns", "twoColumnsWithHeadings", "threeColumns", "threeColumnsWithHeadings", "fourColumns", "twoImageColumns", "threeImageColumns", "fourImageColumns"**  
// → Use **multiple "column" content types at the same nesting level** instead of wrapping them inside another object.  

// ### 5. **List Formatting Rules**  
// For **"bulletList" and "numberedList"**, the "content" must be an **array of strings**, not HTML.  

// ✅ Correct:  
// \`\`\`json
// { 
//   "type": "bulletList",
//   "content": ["Item 1", "Item 2", "Item 3"] 
// }
// \`\`\`  

// ❌ Incorrect:  
// \`\`\`json
// { 
//   "type": "bulletList",
//   "content": "<ul><li>Item 1</li><li>Item 2</li></ul>" 
// }
// \`\`\`  

// ### 6. **Correct JSON Structure Example**  
// Ensure the JSON structure matches the following format:  
// ${JSON.stringify(
// {
//   "id": uuidv4(),
//   "slideName": "Sample Slide",
//   "type": "imageAndText",
//   "slideOrder": slideOrder,
//   "className": "min-h-[300px]",
//   "content": {
//     "id": uuidv4(),
//     "type": "column",
//     "name": "Column",
//     "content": [
//       {
//         "id": uuidv4(),
//         "type": "heading1",
//         "name": "Heading1",
//         "content": "",
//         "placeholder": "Enter heading..."
//       },
//       {
//         "id": uuidv4(),
//         "type": "paragraph",
//         "name": "Paragraph",
//         "content": "",
//         "placeholder": "Enter description..."
//       },
//       {
//         "id": uuidv4(),
//         "type": "bulletList",
//         "name": "Bullet List",
//         "content": ["Item 1", "Item 2", "Item 3"],
//         "placeholder": "Enter list items..."
//       }
//     ]
//   }
// }
// )}

// ### 7. **Image Handling**  
// - Generate unique image placeholders for "image" content types.  
// - The **"alt"** text should describe the image clearly.  
// - Example: Instead of "A laptop," use "A developer coding on a laptop in a dimly lit room."  

// ### 8. **Final Output Rules**  
// - Generate **only one slide JSON** per outline.  
// - Ensure that every **"id"** field is a valid UUID.  

// ### 9. **Generate the JSON Output for the Following Outline:**  
// **Outline:** ${outline}  
// `;


// ------test-prompt-run 1 ----------------------------------------------------------------------------------------
// const prompt = `### Guidelines  
// You are an AI that generates **JSON-based layouts** for presentations. You will receive **one slide outline at a time** and must generate a **single slide JSON** following these rules:  

// ### 1. Allowed Layout Types  
// Use **only** these layout types:  
// - "accentLeft", "accentRight", "imageAndText", "textAndImage", "twoColumns", "twoColumnsWithHeadings", "threeColumns", "threeColumnsWithHeadings", "fourColumns", "twoImageColumns", "threeImageColumns", "fourImageColumns", "tableLayout".  

// ### 2. Allowed Content Types  
// Use **only** these content types:  
// - "heading1", "heading2", "heading3", "heading4", "title", "paragraph", "table", "resizable-column", "image", "blockquote", "numberedList", "bulletList", "todoList", "calloutBox", "codeBlock", "tableOfContents", "divider", "column".  

// ### 3. **Strict Naming Rules**  
// - The key **"content"** must **always** be **exactly "content"**, never **"content1"**, **"content2"**, etc.  
// - The type **"column"** must **always** be **exactly "column"**, never **"column1"**, **"column2"**, etc.  

// ### 4. **Column-Based Layout Handling**  
// For layouts like:  
// - **"twoColumns", "twoColumnsWithHeadings", "threeColumns", "threeColumnsWithHeadings", "fourColumns", "twoImageColumns", "threeImageColumns", "fourImageColumns"**  
// → Use **multiple "column" content types at the same nesting level** instead of wrapping them inside another object.  

// ### 5. **List Formatting Rules**  
// For **"bulletList" and "numberedList"**, the "content" must be an **array of strings**, not HTML.  

// ✅ Correct:  
// \`\`\`json
// { 
//   "type": "bulletList",
//   "content": ["Item 1", "Item 2", "Item 3"] 
// }
// \`\`\`  

// ❌ Incorrect:  
// \`\`\`json
// { 
//   "type": "bulletList",
//   "content": "<ul><li>Item 1</li><li>Item 2</li></ul>" 
// }
// \`\`\`  

// ### 6. **Correct JSON Structure Example**  
// Ensure the JSON structure matches the following format:  
// ${JSON.stringify(
// {
//   "id": uuidv4(),
//   "slideName": "Sample Slide",
//   "type": "imageAndText",
//   "slideOrder": slideOrder,
//   "className": "min-h-[300px]",
//   "content": {
//     "id": uuidv4(),
//     "type": "column",
//     "name": "Column",
//     "content": [
//       {
//         "id": uuidv4(),
//         "type": "heading1",
//         "name": "Heading1",
//         "content": "",
//         "placeholder": "Enter heading..."
//       },
//       {
//         "id": uuidv4(),
//         "type": "paragraph",
//         "name": "Paragraph",
//         "content": "",
//         "placeholder": "Enter description..."
//       },
//       {
//         "id": uuidv4(),
//         "type": "bulletList",
//         "name": "Bullet List",
//         "content": ["Item 1", "Item 2", "Item 3"],
//         "placeholder": "Enter list items..."
//       }
//     ]
//   }
// }
// )}

// ### 7. **Image Handling**  
// - Generate unique image placeholders for "image" content types.  
// - The **"alt"** text should describe the image clearly.  
// - Example: Instead of "A laptop," use "A developer coding on a laptop in a dimly lit room."  

// ### 8. **Content Clarity and Accuracy**  
// - Ensure that all content in the slide JSON is clear, accurate, and appropriate to the context. Avoid vague or ambiguous placeholders and ensure the content directly relates to the subject matter of the slide. For example, avoid using placeholders like "Content" or "Description" without specifying the subject matter. Instead, use more specific placeholders such as "Enter project description" or "Enter company overview."

// ### 9. **Final Output Rules**  
// - Generate **only one slide JSON** per outline.  
// - Ensure that every **"id"** field is a valid UUID.  

// ### 10. **Generate the JSON Output for the Following Outline:**  
// **Outline:** ${outline}  
// `;

// ------test-prompt-run 2 : Colums shows but all in horizontal--------------------------------------------------------------
// const prompt = `### Guidelines  
// You are an AI that generates **JSON-based layouts** for presentations. You will receive **one slide outline at a time** and must generate a **single slide JSON** following these rules:  

// ### 1. Allowed Layout Types  
// Use **only** these layout types:  
// - "accentLeft", "accentRight", "imageAndText", "textAndImage", "twoColumns", "twoColumnsWithHeadings", "threeColumns", "threeColumnsWithHeadings", "fourColumns", "twoImageColumns", "threeImageColumns", "fourImageColumns", "tableLayout".  

// ### 2. Allowed Content Types  
// Use **only** these content types:  
// - "heading1", "heading2", "heading3", "heading4", "title", "paragraph", "table", "resizable-column", "image", "blockquote", "numberedList", "bulletList", "todoList", "calloutBox", "codeBlock", "tableOfContents", "divider", "column".  

// ### 3. **Strict Naming Rules**  
// - The key **"content"** must **always** be **exactly "content"**, never **"content1"**, **"content2"**, etc.  
// - The type **"column"** must **always** be **exactly "column"**, never **"column1"**, **"column2"**, etc.  

// ### 4. **Column-Based Layout Handling**  
// For layouts like:  
// - **"twoColumns", "twoColumnsWithHeadings", "threeColumns", "threeColumnsWithHeadings", "fourColumns", "twoImageColumns", "threeImageColumns", "fourImageColumns"**  
// → **Use a single "content" object** with an **array of "resizable-column" items**, each representing a column.  

// ✅ **Correct (Expected Format)**  
// \`\`\`json
// {
//   "id": "uuid",
//   "type": "twoColumns",
//   "content": {
//     "id": "uuid",
//     "name": "Column",
//     "type": "column",
//     "content": [
//       {
//         "id": "uuid",
//         "name": "Resizable column",
//         "type": "resizable-column",
//         "content": [
//           {
//             "id": "uuid",
//             "name": "Heading3",
//             "type": "heading3",
//             "content": "Amazon S3",
//             "placeholder": "Heading3"
//           },
//           {
//             "id": "uuid",
//             "name": "Paragraph",
//             "type": "paragraph",
//             "content": "Amazon S3 provides scalable and durable object storage for data backups, archiving, and content delivery.",
//             "placeholder": "Start typing here..."
//           }
//         ],
//         "restrictToDrop": true
//       },
//       {
//         "id": "uuid",
//         "name": "Resizable column",
//         "type": "resizable-column",
//         "content": [
//           {
//             "id": "uuid",
//             "alt": "A person working on multiple computer screens in a dimly lit office.",
//             "name": "Image",
//             "type": "image",
//             "content": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//           }
//         ],
//         "restrictToDrop": true
//       }
//     ],
//     "restrictDropTo": true
//   },
//   "className": "min-h-[300px]",
//   "slideName": "Two Columns"
// }
// \`\`\`  

// ❌ **Incorrect (Avoid Nested "column1", "column2")**  
// \`\`\`json
// {
//   "content": {
//     "column1": {...},
//     "column2": {...}
//   }
// }
// \`\`\`  

// ### 5. **List Formatting Rules**  
// For **"bulletList" and "numberedList"**, the "content" must be an **array of strings**, not HTML.  

// ✅ **Correct:**  
// \`\`\`json
// { 
//   "type": "bulletList",
//   "content": ["Item 1", "Item 2", "Item 3"] 
// }
// \`\`\`  

// ❌ **Incorrect:**  
// \`\`\`json
// { 
//   "type": "bulletList",
//   "content": "<ul><li>Item 1</li><li>Item 2</li></ul>" 
// }
// \`\`\`  

// ### 6. **Image Handling**  
// - Generate unique image placeholders for "image" content types.  
// - The **"alt"** text should describe the image clearly.  
// - Example: Instead of "A laptop," use "A developer coding on a laptop in a dimly lit room."  

// ### 7. **Final Output Rules**  
// - Generate **only one slide JSON** per outline.  
// - Ensure that every **"id"** field is a valid UUID.  

// ### 8. **Generate the JSON Output for the Following Outline:**  
// **Outline:** ${outline}  
// `;


// ------test-prompt-run 3 : Colums shows but all in horizontal--------------------------------------------------------------
// const prompt = `### Guidelines  
// You are an AI that generates **JSON-based layouts** for presentations. You will receive **one slide outline at a time** and must generate a **single slide JSON** following these rules:  

// ---

// ### **1. Allowed Layout Types**  
// Use **only** the following layout types:  
// - **"accentLeft"**, **"accentRight"**, **"imageAndText"**, **"textAndImage"**, **"twoColumns"**, **"twoColumnsWithHeadings"**, **"threeColumns"**, **"threeColumnsWithHeadings"**, **"fourColumns"**, **"twoImageColumns"**, **"threeImageColumns"**, **"fourImageColumns"**, **"tableLayout"**.  

// You **must** ensure that each layout is structured uniquely while keeping it **visually appealing and easy to understand**.  

// ---

// ### **2. Allowed Content Types**  
// Use **only** the following content types:  
// - **"heading1"**, **"heading2"**, **"heading3"**, **"heading4"**, **"title"**, **"paragraph"**, **"table"**, **"resizable-column"**, **"image"**, **"blockquote"**, **"numberedList"**, **"bulletList"**, **"todoList"**, **"calloutBox"**, **"codeBlock"**, **"tableOfContents"**, **"divider"**, **"column"**.  

// All elements must be wrapped in an appropriate column structure.

// ---

// ### **3. Creative Column-Based Layout Handling**  
// 💡 **Your job is to structure columns in diverse ways** instead of always using a simple left-to-right layout. Be creative while ensuring clarity!  

// ✅ **Allowed Variations:**  
// 1️⃣ **Horizontal Columns:** Regular side-by-side columns.  
// 2️⃣ **Vertical Stacking:** Some columns can be stacked inside each other to form a **layered structure**.  
// 3️⃣ **Table-Like Structure:** Columns arranged in a **grid-like structure** using **"resizable-column"** types.  
// 4️⃣ **Nested Resizable Columns:** Use **"resizable-column"** inside a **"column"** to allow flexible layouts.  

// 📌 **Examples of Layout Styles:**  
// - A **"twoColumns"** layout can have **one wide column** and **one narrow column** instead of equal width.  
// - A **"threeColumns"** layout can be structured as **two side-by-side** with a **third column stacked below one of them**.  
// - A **"fourColumns"** layout can resemble a **2x2 grid (table-like structure)** using **resizable-columns**.  
// - An **"imageAndText"** layout can place an image on the left and text in a resizable column on the right, or vice versa.  

// 🚀 **Your goal is to make every layout feel unique, structured, and balanced.**  

// ---

// ### **4. Naming Rules**  
// - The key **"content"** must **always** be **exactly "content"**, never **"content1"**, **"content2"**, etc.  
// - The type **"column"** must **always** be **exactly "column"**, never **"column1"**, **"column2"**, etc.  
// - **Use "resizable-column"** for flexible-width sections inside a column.  

// ✅ **Correct JSON Example (Creative Layout)**  
// \`\`\`json
// {
//   "id": "uuid",
//   "type": "threeColumns",
//   "content": {
//     "id": "uuid",
//     "name": "Column",
//     "type": "column",
//     "content": [
//       {
//         "id": "uuid",
//         "name": "Resizable column",
//         "type": "resizable-column",
//         "content": [
//           {
//             "id": "uuid",
//             "name": "Heading3",
//             "type": "heading3",
//             "content": "Cloud Computing",
//             "placeholder": "Heading3"
//           },
//           {
//             "id": "uuid",
//             "name": "Paragraph",
//             "type": "paragraph",
//             "content": "Cloud computing enables on-demand scalability of IT resources with minimal management effort.",
//             "placeholder": "Start typing here..."
//           }
//         ],
//         "restrictToDrop": true
//       },
//       {
//         "id": "uuid",
//         "name": "Resizable column",
//         "type": "resizable-column",
//         "content": [
//           {
//             "id": "uuid",
//             "name": "Bullet List",
//             "type": "bulletList",
//             "content": [
//               "Scalability",
//               "Flexibility",
//               "Cost Efficiency"
//             ]
//           }
//         ],
//         "restrictToDrop": true
//       },
//       {
//         "id": "uuid",
//         "name": "Resizable column",
//         "type": "resizable-column",
//         "content": [
//           {
//             "id": "uuid",
//             "alt": "A team of developers collaborating on cloud solutions.",
//             "name": "Image",
//             "type": "image",
//             "content": "https://images.unsplash.com/photo-1564865878824-2b96418c0382"
//           }
//         ],
//         "restrictToDrop": true
//       }
//     ],
//     "restrictDropTo": true
//   },
//   "className": "min-h-[300px]",
//   "slideName": "Cloud Computing Overview"
// }
// \`\`\`  

// ❌ **Incorrect (Avoid Nested "column1", "column2")**  
// \`\`\`json
// {
//   "content": {
//     "column1": {...},
//     "column2": {...}
//   }
// }
// \`\`\`  

// ---

// ### **5. List Formatting Rules**  
// For **"bulletList" and "numberedList"**, the "content" must be an **array of strings**, not HTML.  

// ✅ **Correct:**  
// \`\`\`json
// { 
//   "type": "bulletList",
//   "content": ["Item 1", "Item 2", "Item 3"] 
// }
// \`\`\`  

// ❌ **Incorrect:**  
// \`\`\`json
// { 
//   "type": "bulletList",
//   "content": "<ul><li>Item 1</li><li>Item 2</li></ul>" 
// }
// \`\`\`  

// ---

// ### **6. Image Handling**  
// - Generate unique image placeholders for "image" content types.  
// - The **"alt"** text should describe the image clearly.  
// - Example: Instead of "A laptop," use "A developer coding on a laptop in a dimly lit room."  

// ---

// ### **7. Final Output Rules**  
// 📌 **Generate a well-structured JSON layout based on the outline:**  
// - Generate **only one slide JSON** per outline.  
// - Ensure that every **"id"** field is a valid UUID.  
// - Apply **creative column structuring** to break the monotony of traditional layouts.  

// ---

// ### **8. Generate the JSON Output for the Following Outline:**  
// **Outline:** ${outline}  
// `;


// ------test-prompt-run 4 : Good run - Table generation formate changes and list type content empty sometimes + uses content alternatives--------------------------------------------------------------
// const prompt = `### Guidelines
// You are a highly creative AI that generates JSON-based layouts for presentations. I will provide you with a pattern and a format to follow, and for each outline, you must generate a unique layout and content, giving me the output in the JSON format expected.
// Our final JSON output is a combination of layouts and elements. The available LAYOUT TYPES are as follows: "accentLeft", "accentRight", "imageAndText", "textAndImage", "twoColumns", "twoColumnsWithHeadings", "threeColumns", "threeColumnsWithHeadings", "fourColumns", "twoImageColumns", "threeImageColumns", "fourImageColumns", "tableLayout".
// The available CONTENT TYPES are "heading1", "heading2", "heading3", "heading4", "title", "paragraph", "table", "resizable-column", "image", 
// "blockquote", "numberedList", "bulletList", "todoList", "calloutBox", "codeBlock", "tableOfContents", "divider", "column".

// The output must be a single JSON object.
// 1. Write a layout based on the specific outline provided. Do not use types that are not mentioned in the example layouts.
// 2. Ensure the layout is unique.
// 3. Adhere to the structure of existing layouts.
// 4. Fill placeholder data into content fields where required. If the outline does not provide specific content, use meaningful placeholder text from the outline's context or the "placeholder" field, ensuring it is non-empty.
// 5. Generate unique image placeholders for the 'content' property of image components and also alt text according to the outline.
// 6. Ensure proper formatting and schema alignment for the output JSON.
// 7. The "content" property of the layout should strictly follow a structured format. Avoid using "content2", "content3", or any alternative names—only "content" should be used.
// 8. The "content" property of the layout should start with a "column", and within the column's content property, you can use any of the CONTENT TYPES provided above. 
//    - "resizable-column", "column", and other multi-element content types should be arrays because they may contain nested elements.
//    - Static elements like "title" and "paragraph" should have content set to a string.
//    - Here is an example of what one layout with one column with a title inside would look like:

//    ${JSON.stringify({
//      id: uuidv4(),
//      slideName: "Blank card",
//      type: "blank-card",
//      className: "p-8 mx-auto flex justify-center items-center min-h-[200px]",
//      content: {
//        id: uuidv4(),
//        type: "column",
//        name: "Column",
//        content: [
//          {
//            id: uuidv4(),
//            type: "title",
//            name: "Title",
//            content: "Untitled Card",
//            placeholder: "Untitled Card",
//          },
//        ],
//      },
//    })}

// 9. Here is a final example output to ensure consistency and correctness:
// ${JSON.stringify({
//   id: uuidv4(),
//   slideName: "Accent Left",
//   type: "accentLeft",
//   className: "min-h-[300px]",
//   content: {
//     id: uuidv4(),
//     type: "column",
//     name: "Column",
//     restrictDropTo: true,
//     content: [
//       {
//         id: uuidv4(),
//         type: "resizable-column",
//         name: "Resizable column",
//         restrictToDrop: true,
//         content: [
//           {
//             id: uuidv4(),
//             type: "image",
//             name: "Image",
//             content:
//               "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3FDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//             alt: "Conceptual image of digital connectivity",
//           },
//         ],
//       },
//       {
//         id: uuidv4(),
//         type: "column",
//         name: "Column",
//         content: [
//           {
//             id: uuidv4(),
//             type: "heading1",
//             name: "Heading1",
//             content: "Heading1",
//             placeholder: "Heading1",
//           },
//           {
//             id: uuidv4(),
//             type: "paragraph",
//             name: "Paragraph",
//             content: "Start typing here...",
//             placeholder: "Start typing here...",
//           },
//         ],
//         className: "w-full h-full p-8 flex justify-center items-center",
//         placeholder: "Heading1",
//       },
//     ],
//   },
// })}

// 10. Ensure that the "content" property of CONTENT TYPES is never empty. If no specific content is provided in the outline, populate the "content" field with the value from the "placeholder" field or generate concise, contextually relevant text based on the outline.

// 11. Generate the JSON Output for the Following Outline:**  
//   **Outline:** ${outline}  

// For Images:
// - The alt text should describe the image clearly and concisely.
// - Focus on the main subject(s) of the image and any relevant context.
// - Example: Instead of "An image of a laptop," use "A developer coding on a laptop in a dimly lit room."

// Now generate the JSON output based on these rules.`;


// ------test-prompt-run 5 : Good run - Table generation formate changes and list type content empty sometimes--------------------------------------------------------------
// const prompt = `### Guidelines
// You are a highly creative AI that generates JSON-based layouts for presentations. I will provide you with a pattern and a format to follow, and for each outline, you must generate a unique layout and content, giving me the output in the JSON format expected.
// Our final JSON output is a combination of layouts and elements. The available LAYOUT TYPES are as follows: "accentLeft", "accentRight", "imageAndText", "textAndImage", "twoColumns", "twoColumnsWithHeadings", "threeColumns", "threeColumnsWithHeadings", "fourColumns", "twoImageColumns", "threeImageColumns", "fourImageColumns", "tableLayout".
// The available CONTENT TYPES are: "heading1", "heading2", "heading3", "heading4", "title", "paragraph", "table", "resizable-column", "image", "blockquote", "numberedList", "bulletList", "todoList", "calloutBox", "codeBlock", "tableOfContents", "divider", "column".

// The output must be a single JSON object.
// 1. Write a layout based on the specific outline provided. Do not use types that are not mentioned in the example layouts.
// 2. Ensure the layout is unique.
// 3. Adhere to the structure of existing layouts.
// 4. Fill placeholder data into content fields where required. If the outline does not provide specific content, use meaningful placeholder text from the outline's context or the "placeholder" field, ensuring it is non-empty.
// 5. Generate unique image placeholders for the 'content' property of image components and also alt text according to the outline.
// 6. Ensure proper formatting and schema alignment for the output JSON.
// 7. The "content" property of the layout must strictly use only the "content" key. Do not use alternative names such as "content1", "content2", "content3", or any other variations—only "content" is permitted.

// 8. The "content" property of the layout must start with a "column", and within the column's content property, you can use any of the CONTENT TYPES provided above. 
//    - "resizable-column", "column", and other multi-element content types (e.g., "table", "numberedList", "bulletList", "todoList") must have their "content" property as an array because they may contain nested elements.
//    - Static elements like "title", "heading1", "heading2", "heading3", "heading4", "paragraph", "blockquote", "calloutBox", "codeBlock", "tableOfContents", and "divider" must have their "content" property set to a string.
//    - Here is an example of what one layout with one column with a title inside would look like:

//    ${JSON.stringify({
//      id: uuidv4(),
//      slideName: "Blank card",
//      type: "blank-card",
//      className: "p-8 mx-auto flex justify-center items-center min-h-[200px]",
//      content: {
//        id: uuidv4(),
//        type: "column",
//        name: "Column",
//        content: [
//          {
//            id: uuidv4(),
//            type: "title",
//            name: "Title",
//            content: "Untitled Card",
//            placeholder: "Untitled Card",
//          },
//        ],
//      },
//    })}

// 9. Here is a final example output to ensure consistency and correctness:
// ${JSON.stringify({
//   id: uuidv4(),
//   slideName: "Accent Left",
//   type: "accentLeft",
//   className: "min-h-[300px]",
//   content: {
//     id: uuidv4(),
//     type: "column",
//     name: "Column",
//     restrictDropTo: true,
//     content: [
//       {
//         id: uuidv4(),
//         type: "resizable-column",
//         name: "Resizable column",
//         restrictToDrop: true,
//         content: [
//           {
//             id: uuidv4(),
//             type: "image",
//             name: "Image",
//             content: "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3FDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//             alt: "Conceptual image of digital connectivity",
//           },
//         ],
//       },
//       {
//         id: uuidv4(),
//         type: "column",
//         name: "Column",
//         content: [
//           {
//             id: uuidv4(),
//             type: "heading1",
//             name: "Heading1",
//             content: "Introduction to Connectivity",
//             placeholder: "Heading1",
//           },
//           {
//             id: uuidv4(),
//             type: "paragraph",
//             name: "Paragraph",
//             content: "Exploring the impact of digital connectivity on modern society.",
//             placeholder: "Start typing here...",
//           },
//         ],
//         className: "w-full h-full p-8 flex justify-center items-center",
//         placeholder: "Heading1",
//       },
//     ],
//   },
// })}

// 10. Ensure that the "content" property of all CONTENT TYPES ("heading1", "heading2", "heading3", "heading4", "title", "paragraph", "table", "resizable-column", "image", "blockquote", "numberedList", "bulletList", "todoList", "calloutBox", "codeBlock", "tableOfContents", "divider", "column") is never empty. Populate the "content" field as follows:
//    - For "heading1", "heading2", "heading3", "heading4", "title": Use the "placeholder" value or a concise, contextually relevant string based on the outline (e.g., "Section Title").
//    - For "paragraph", "blockquote", "calloutBox": Use the "placeholder" value or a brief sentence relevant to the outline (e.g., "Description goes here.").
//    - For "codeBlock": Use a sample code snippet relevant to the outline or "console.log('Example');".
//    - For "table": Use an array with at least one row (e.g., [["Header1", "Header2"], ["Data1", "Data2"]]).
//    - For "resizable-column", "column": Use an array with at least one nested element (e.g., a "paragraph" or "image").
//    - For "image": Use a valid URL (e.g., from Unsplash) relevant to the outline.
//    - For "numberedList", "bulletList": Use an array with at least one plain string (e.g., ["Item 1"]).
//    - For "todoList": Use an array with at least one string prefixed with "[ ]" or "[x]" (e.g., ["[ ] Task 1"]).
//    - For "tableOfContents": Use a string like "TOC Placeholder".
//    - For "divider": Use a string like "Divider Line".

// 11. Generate the JSON Output for the Following Outline:**  
//   **Outline:** ${outline}  

// For Images:
// - The alt text should describe the image clearly and concisely.
// - Focus on the main subject(s) of the image and any relevant context.
// - Example: Instead of "An image of a laptop," use "A developer coding on a laptop in a dimly lit room."

// Now generate the JSON output based on these rules.`;

// ------test-prompt-run 6 : Good run - Table generation formate changes and list type content empty sometimes--------------------------------------------------------------
// const prompt = `### Guidelines
// You are a highly creative AI that generates JSON-based layouts for presentations. I will provide you with a pattern and a format to follow, and for each outline, you must generate a unique layout and content, giving me the output in the JSON format expected.
// Our final JSON output is a combination of layouts and elements. The available LAYOUT TYPES are as follows: "accentLeft", "accentRight", "imageAndText", "textAndImage", "twoColumns", "twoColumnsWithHeadings", "threeColumns", "threeColumnsWithHeadings", "fourColumns", "twoImageColumns", "threeImageColumns", "fourImageColumns", "tableLayout".
// The available CONTENT TYPES are: "heading1", "heading2", "heading3", "heading4", "title", "paragraph", "table", "resizable-column", "image", "blockquote", "numberedList", "bulletList", "todoList", "calloutBox", "codeBlock", "tableOfContents", "divider", "column".

// The output must be a single JSON object.
// 1. Write a layout based on the specific outline provided. Do not use types that are not mentioned in the example layouts.
// 2. Ensure the layout is unique.
// 3. Adhere to the structure of existing layouts.
// 4. Fill placeholder data into content fields where required. If the outline does not provide specific content, use meaningful placeholder text from the outline's context or the "placeholder" field, ensuring it is non-empty.
// 5. Generate unique image placeholders for the 'content' property of image components and also alt text according to the outline.
// 6. Ensure proper formatting and schema alignment for the output JSON.
// 7. The "content" property of the layout must strictly use only the "content" key. Do not use alternative names such as "content1", "content2", "content3", or any other variations—only "content" is permitted.

// 8. The "content" property of the layout must start with a "column", and within the column's content property, you can use any of the CONTENT TYPES provided above. 
//    - "resizable-column", "column", and other multi-element content types (e.g., "table", "numberedList", "bulletList", "todoList") must have their "content" property as an array because they may contain nested elements.
//    - Static elements like "title", "heading1", "heading2", "heading3", "heading4", "paragraph", "blockquote", "calloutBox", "codeBlock", "tableOfContents", and "divider" must have their "content" property set to a string.
//    - Here is an example of what one layout with one column with a title inside would look like:

//    ${JSON.stringify({
//      id: uuidv4(),
//      slideName: "Blank card",
//      type: "blank-card",
//      className: "p-8 mx-auto flex justify-center items-center min-h-[200px]",
//      content: {
//        id: uuidv4(),
//        type: "column",
//        name: "Column",
//        content: [
//          {
//            id: uuidv4(),
//            type: "title",
//            name: "Title",
//            content: "Untitled Card",
//            placeholder: "Untitled Card",
//          },
//        ],
//      },
//    })}

// 9. Here is a final example output to ensure consistency and correctness:
// ${JSON.stringify({
//   id: uuidv4(),
//   slideName: "Accent Left",
//   type: "accentLeft",
//   className: "min-h-[300px]",
//   content: {
//     id: uuidv4(),
//     type: "column",
//     name: "Column",
//     restrictDropTo: true,
//     content: [
//       {
//         id: uuidv4(),
//         type: "resizable-column",
//         name: "Resizable column",
//         restrictToDrop: true,
//         content: [
//           {
//             id: uuidv4(),
//             type: "image",
//             name: "Image",
//             content: "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3FDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//             alt: "Conceptual image of digital connectivity",
//           },
//         ],
//       },
//       {
//         id: uuidv4(),
//         type: "column",
//         name: "Column",
//         content: [
//           {
//             id: uuidv4(),
//             type: "heading1",
//             name: "Heading1",
//             content: "Introduction to Connectivity",
//             placeholder: "Heading1",
//           },
//           {
//             id: uuidv4(),
//             type: "paragraph",
//             name: "Paragraph",
//             content: "Exploring the impact of digital connectivity on modern society.",
//             placeholder: "Start typing here...",
//           },
//           {
//             id: uuidv4(),
//             type: "bulletList",
//             name: "BulletList",
//             content: [
//               "Enhance communication across regions.",
//               "Enable remote collaboration tools.",
//               "Support digital education initiatives.",
//               "Improve access to online resources."
//             ],
//             placeholder: "List Item",
//           },
//         ],
//         className: "w-full h-full p-8 flex justify-center items-center",
//         placeholder: "Heading1",
//       },
//     ],
//   },
// })}

// 10. Ensure that the "content" property of all CONTENT TYPES ("heading1", "heading2", "heading3", "heading4", "title", "paragraph", "table", "resizable-column", "image", "blockquote", "numberedList", "bulletList", "todoList", "calloutBox", "codeBlock", "tableOfContents", "divider", "column") is never empty. Populate the "content" field as follows:
//    - For "heading1", "heading2", "heading3", "heading4", "title": Use the "placeholder" value or a concise, contextually relevant string based on the outline (e.g., "Section Title").
//    - For "paragraph", "blockquote", "calloutBox": Use the "placeholder" value or a brief sentence relevant to the outline (e.g., "Description goes here.").
//    - For "codeBlock": Use a sample code snippet relevant to the outline or "console.log('Example');".
//    - For "table": Use an array with at least one row (e.g., [["Header1", "Header2"], ["Data1", "Data2"]]).
//    - For "resizable-column", "column": Use an array with at least one nested element (e.g., a "paragraph" or "image").
//    - For "image": Use a valid URL (e.g., from Unsplash) relevant to the outline.
//    - For "numberedList": Use an array with at least three plain strings, each contextually relevant to the outline (e.g., ["Step 1: Define goals.", "Step 2: Assign tasks.", "Step 3: Review progress."]).
//    - For "bulletList": Use an array with at least three plain strings, each contextually relevant to the outline (e.g., ["Feature 1", "Feature 2", "Feature 3"]).
//    - For "todoList": Use an array with at least three strings prefixed with "[ ]" or "[x]", each contextually relevant to the outline (e.g., ["[ ] Task 1", "[x] Task 2", "[ ] Task 3"]).
//    - For "tableOfContents": Use a string like "TOC Placeholder".
//    - For "divider": Use a string like "Divider Line".

// 11. Generate the JSON Output for the Following Outline:**  
//   **Outline:** ${outline}  

// For Images:
// - The alt text should describe the image clearly and concisely.
// - Focus on the main subject(s) of the image and any relevant context.
// - Example: Instead of "An image of a laptop," use "A developer coding on a laptop in a dimly lit room."

// Now generate the JSON output based on these rules.`;

// ------test-prompt-run 7 : Good run - Table generation formate changes and list type content empty sometimes @@@ No parsing error--------------------------------------------------------------
const prompt = `### Guidelines
You are a highly creative AI that generates JSON-based layouts for presentations. I will provide you with a pattern and a format to follow, and for each outline, you must generate a unique layout and content, giving me the output in the JSON format expected.
Our final JSON output is a combination of layouts and elements. The available LAYOUT TYPES are as follows: "accentLeft", "accentRight", "imageAndText", "textAndImage", "twoColumns", "twoColumnsWithHeadings", "threeColumns", "threeColumnsWithHeadings", "fourColumns", "twoImageColumns", "threeImageColumns", "fourImageColumns", "tableLayout".
The available CONTENT TYPES are: "heading1", "heading2", "heading3", "heading4", "title", "paragraph", "table", "resizable-column", "image", "blockquote", "numberedList", "bulletList", "todoList", "calloutBox", "codeBlock", "tableOfContents", "divider", "column".

The output must be a single JSON object.
1. Write a layout based on the specific outline provided. Do not use types that are not mentioned in the example layouts.
2. Ensure the layout is unique.
3. Adhere to the structure of existing layouts.
4. Fill placeholder data into content fields where required. If the outline does not provide specific content, use meaningful placeholder text from the outline's context or the "placeholder" field, ensuring it is non-empty.
5. Generate unique image placeholders for the 'content' property of image components and also alt text according to the outline.
6. Ensure proper formatting and schema alignment for the output JSON.
7. The "content" property of the layout must strictly use only the "content" key. Do not use alternative names such as "content1", "content2", "content3", or any other variations—only "content" is permitted.

8. The "content" property of the layout must start with a "column", and within the column's content property, you can use any of the CONTENT TYPES provided above. 
   - "resizable-column", "column", and other multi-element content types (e.g., "table", "numberedList", "bulletList", "todoList") must have their "content" property as an array because they may contain nested elements.
   - Static elements like "title", "heading1", "heading2", "heading3", "heading4", "paragraph", "blockquote", "calloutBox", "codeBlock", "tableOfContents", and "divider" must have their "content" property set to a string.
   - Here is an example of what one layout with one column with a title inside would look like:

   ${JSON.stringify({
     id: uuidv4(),
     slideName: "Blank card",
     type: "blank-card",
     className: "p-8 mx-auto flex justify-center items-center min-h-[200px]",
     content: {
       id: uuidv4(),
       type: "column",
       name: "Column",
       content: [
         {
           id: uuidv4(),
           type: "title",
           name: "Title",
           content: "Untitled Card",
           placeholder: "Untitled Card",
         },
       ],
     },
   })}

9. Here is a final example output to ensure consistency and correctness:
${JSON.stringify({
  id: uuidv4(),
  slideName: "Three Columns with Lists",
  type: "threeColumns",
  className: "min-h-[300px]",
  content: {
    id: uuidv4(),
    type: "column",
    name: "Column",
    restrictDropTo: true,
    content: [
      {
        id: uuidv4(),
        type: "resizable-column",
        name: "Resizable column 1",
        restrictToDrop: true,
        content: [
          {
            id: uuidv4(),
            type: "heading2",
            name: "Heading2",
            content: "Project Steps",
            placeholder: "Heading2",
          },
          {
            id: uuidv4(),
            type: "numberedList",
            name: "NumberedList",
            content: [
              "Step 1: Define project scope.",
              "Step 2: Assign team roles.",
              "Step 3: Set deadlines.",
              "Step 4: Review progress."
            ],
            placeholder: "List Item",
          },
        ],
      },
      {
        id: uuidv4(),
        type: "resizable-column",
        name: "Resizable column 2",
        restrictToDrop: true,
        content: [
          {
            id: uuidv4(),
            type: "heading2",
            name: "Heading2",
            content: "Key Features",
            placeholder: "Heading2",
          },
          {
            id: uuidv4(),
            type: "bulletList",
            name: "BulletList",
            content: [
              "Real-time collaboration.",
              "Responsive design.",
              "SEO optimization.",
              "Fast load times."
            ],
            placeholder: "List Item",
          },
        ],
      },
      {
        id: uuidv4(),
        type: "resizable-column",
        name: "Resizable column 3",
        restrictToDrop: true,
        content: [
          {
            id: uuidv4(),
            type: "heading2",
            name: "Heading2",
            content: "Tasks",
            placeholder: "Heading2",
          },
          {
            id: uuidv4(),
            type: "todoList",
            name: "TodoList",
            content: [
              "[ ] Finalize design mockups.",
              "[x] Deploy initial version.",
              "[ ] Test user feedback.",
              "[x] Optimize performance."
            ],
            placeholder: "List Item",
          },
        ],
      },
    ],
  },
})}

10. Strictly ensure that the "content" property of all CONTENT TYPES ("heading1", "heading2", "heading3", "heading4", "title", "paragraph", "table", "resizable-column", "image", "blockquote", "numberedList", "bulletList", "todoList", "calloutBox", "codeBlock", "tableOfContents", "divider", "column") is never empty. Populate the "content" field as follows, with no exceptions:
   - For "heading1", "heading2", "heading3", "heading4", "title": Use the "placeholder" value or a concise, contextually relevant string based on the outline (e.g., "Section Title").
   - For "paragraph", "blockquote", "calloutBox": Use the "placeholder" value or a brief sentence relevant to the outline (e.g., "Description goes here.").
   - For "codeBlock": Use a sample code snippet relevant to the outline or "console.log('Example');".
   - For "table": Use an array with at least one row (e.g., [["Header1", "Header2"], ["Data1", "Data2"]]).
   - For "resizable-column", "column": Use an array with at least one nested element (e.g., a "paragraph" or "image").
   - For "image": Use a valid URL (e.g., from Unsplash) relevant to the outline.
   - For "numberedList": Always populate with at least three plain strings, each contextually relevant to the outline (e.g., ["Step 1: Define goals.", "Step 2: Assign tasks.", "Step 3: Review progress."]).
   - For "bulletList": Always populate with at least three plain strings, each contextually relevant to the outline (e.g., ["Feature 1", "Feature 2", "Feature 3"]).
   - For "todoList": Always populate with at least three strings prefixed with "[ ]" or "[x]", each contextually relevant to the outline (e.g., ["[ ] Task 1", "[x] Task 2", "[ ] Task 3"]).
   - For "tableOfContents": Use a string like "TOC Placeholder".
   - For "divider": Use a string like "Divider Line".

11. Generate the JSON Output for the Following Outline:**  
  **Outline:** ${outline}  

12. Before finalizing the output, validate that the "content" arrays for "numberedList", "bulletList", and "todoList" are never empty and contain at least three items. If they are empty or have fewer than three items, populate them with contextually relevant defaults based on the outline or slideName.

For Images:
- The alt text should describe the image clearly and concisely.
- Focus on the main subject(s) of the image and any relevant context.
- Example: Instead of "An image of a laptop," use "A developer coding on a laptop in a dimly lit room."

Now generate the JSON output based on these rules.`;


// updated prompt for table issues
// const prompt = `### Guidelines  
// You are an AI that generates **JSON-based layouts** for presentations. You will receive **one slide outline at a time** and must generate a **single slide JSON** following these rules:  

// ### 1. Allowed Layout Types  
// Use **only** these layout types:  
// - "accentLeft", "accentRight", "imageAndText", "textAndImage", "twoColumns", "twoColumnsWithHeadings", "threeColumns", "threeColumnsWithHeadings", "fourColumns", "twoImageColumns", "threeImageColumns", "fourImageColumns", "tableLayout".  

// ### 2. Allowed Content Types  
// Use **only** these content types:  
// - "heading1", "heading2", "heading3", "heading4", "title", "paragraph", "table", "resizable-column", "image", "blockquote", "numberedList", "bulletList", "todoList", "calloutBox", "codeBlock", "tableOfContents", "divider", "column".  

// ### 3. **Strict Naming Rules**  
// - The key **"content"** must **always** be **exactly "content"**, never **"content1"**, **"content2"**, etc.  
// - The type **"column"** must **always** be **exactly "column"**, never **"column1"**, **"column2"**, etc.  

// ### 4. **Column-Based Layout Handling**  
// For layouts like:  
// - **"twoColumns", "twoColumnsWithHeadings", "threeColumns", "threeColumnsWithHeadings", "fourColumns", "twoImageColumns", "threeImageColumns", "fourImageColumns"**  
// → Use **multiple "column" content types at the same nesting level** instead of wrapping them inside another object.  

// ### 5. **List Formatting Rules**  
// For **"bulletList" and "numberedList"**, the "content" must be an **array of strings**, not HTML.  

// ✅ Correct:  
// \`\`\`json
// { 
//   "type": "bulletList",
//   "content": ["Item 1", "Item 2", "Item 3"] 
// }
// \`\`\`  

// ❌ Incorrect:  
// \`\`\`json
// { 
//   "type": "bulletList",
//   "content": "<ul><li>Item 1</li><li>Item 2</li></ul>" 
// }
// \`\`\`  

// ### 6. **Correct JSON Structure Example**  
// Ensure the JSON structure matches the following format:  
// ${JSON.stringify(
// {
//   "id": uuidv4(),
//   "slideName": "Sample Slide",
//   "type": "imageAndText",
//   "slideOrder": slideOrder,
//   "className": "min-h-[300px]",
//   "content": {
//     "id": uuidv4(),
//     "type": "column",
//     "name": "Column",
//     "content": [
//       {
//         "id": uuidv4(),
//         "type": "heading1",
//         "name": "Heading1",
//         "content": "",
//         "placeholder": "Enter heading..."
//       },
//       {
//         "id": uuidv4(),
//         "type": "paragraph",
//         "name": "Paragraph",
//         "content": "",
//         "placeholder": "Enter description..."
//       },
//       {
//         "id": uuidv4(),
//         "type": "bulletList",
//         "name": "Bullet List",
//         "content": ["Item 1", "Item 2", "Item 3"],
//         "placeholder": "Enter list items..."
//       }
//     ]
//   }
// }
// )}

// ### 7. **Image Handling**  
// - Generate unique image placeholders for "image" content types.  
// - The **"alt"** text should describe the image clearly.  
// - Example: Instead of "A laptop," use "A developer coding on a laptop in a dimly lit room."  

// ### 8. **Content Clarity and Accuracy**  
// - Ensure that all content in the slide JSON is clear, accurate, and appropriate to the context. Avoid vague or ambiguous placeholders and ensure the content directly relates to the subject matter of the slide. For example, avoid using placeholders like "Content" or "Description" without specifying the subject matter. Instead, use more specific placeholders such as "Enter project description" or "Enter company overview."

// ### 9. **Table Content Format**  
// For **"table"** content, the table data must be formatted as **arrays of arrays**, with each row being an array containing the values for each column. Do **not** use key-value pairs for table rows. The rows should be structured like this:

// ✅ Correct:  
// \`\`\`json
// {
//   "id": uuidv4(),
//   "name": "Table",
//   "type": "table",
//   "content": [
//     ["State", "Official Language(s)", "Other Prominent Languages"],
//     ["Andhra Pradesh", "Telugu", "Urdu, Hindi"],
//     ["Arunachal Pradesh", "English", "Hindi, Assamese, various tribal languages"],
//     ["Assam", "Assamese", "Bengali, Hindi, Bodo"]
//   ]
// }
// \`\`\`

// ❌ Incorrect:  
// \`\`\`json
// {
//   "id": uuidv4(),
//   "name": "Table",
//   "type": "table",
//   "content": [
//     { "0": "State", "1": "Official Language(s)", "2": "Other Prominent Languages" },
//     { "0": "Andhra Pradesh", "1": "Telugu", "2": "Urdu, Hindi" },
//     { "0": "Arunachal Pradesh", "1": "English", "2": "Hindi, Assamese, various tribal languages" }
//   ]
// }
// \`\`\`

// ### 10. **Final Output Rules**  
// - Generate **only one slide JSON** per outline.  
// - Ensure that every **"id"** field is a valid UUID.  

// ### 11. **Generate the JSON Output for the Following Outline:**  
// **Outline:** ${outline}  
// `;


  try {
    console.log(`Generating slide JSON ...`);

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is missing in environment variables.");
    }

    const model = google.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Rate limit: Wait 1 second before the request (adjust as needed)
    await delay(1000);

    const response = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const responseContent =
      response?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (responseContent) {
      try {
        // Remove possible triple backticks from AI response
        const cleanedResponse = responseContent.replace(/```json|```/g, "").trim();

        // Parse JSON response
        // const slide: Slide = JSON.parse(cleanedResponse);
                // Try parsing the cleaned response
                const slide: Slide | null = parseSlideJson(cleanedResponse);
                if (!slide) {
                  console.error("Failed to parse slide JSON.");
                  return null;
                }

        // Ensure unique IDs for all nested content items
        slide.id = uuidv4();
        slide.content = generateUniqueIds(slide.content);

        // console.log("Generated Slide:", slide);
        // return slide;

        const populatedSlide = await populateListItems(slide, outline);
        if (!populatedSlide) {
          console.error("Failed to populate list items.");
          return slide; // Return the unpopulated slide as a fallback
        }

        // console.log("Generated and Populated Slide:", populatedSlide);
        return populatedSlide;
      } catch (error) {
        console.error("Invalid JSON received from AI:", responseContent, error);
        return null;
      }
    }

    return null;
  } catch (error) {
    console.error("Error generating slide JSON:", error);
    if (typeof error === "object" && error !== null && "status" in error && error.status === 429) {
      console.error("Rate limit exceeded. Retrying after delay...");
      
            await delay(5000); // Wait 5 seconds before retrying
      return generateSlideJson(outline, slideOrder); // Recursive retry (limit retries in production)
    }
    console.error("Error generating slide JSON:", error);
    return null;
  }
};

// Function to populate list items in a slide
// export const populateListItems = async (slide: Slide | null, outline: string): Promise<Slide | null> => {
//   if (!slide || !slide.content || !slide.content.content) {
//     console.error("Invalid slide input for list population.");
//     return null;
//   }

//   const listPrompt = `### Guidelines
// You are a creative AI tasked with generating list items for a JSON-based presentation slide. I will provide a "Heading 2" value and an outline, and you must generate exactly four list items for each specified list type ("numberedList", "bulletList", or "todoList"). The output should be a JSON array of strings, tailored to the list type and contextually relevant to the "Heading 2" and outline.

// 1. For "numberedList": Generate four plain strings, each starting with "Step X: " (e.g., "Step 1: Do something."), relevant to the heading and outline.
// 2. For "bulletList": Generate four plain strings, each a concise point (e.g., "Point 1"), relevant to the heading and outline.
// 3. For "todoList": Generate four strings prefixed with "[ ]" or "[x]" (mix them, e.g., two unchecked, two checked), relevant to the heading and outline.
// 4. Ensure all items are unique and meaningful, avoiding generic placeholders like "Item 1".
// 5. Return the result as a JSON array of strings, e.g., ["Item 1", "Item 2", "Item 3", "Item 4"].

// **Input:**
// - **Heading 2:** \${heading2}
// - **Outline:** \${outline}

// **Task:** Generate the list items based on the specified list type: \${listType}.`;

//   try {
//     if (!process.env.GEMINI_API_KEY) {
//       throw new Error("GEMINI_API_KEY is missing in environment variables.");
//     }

//     const model = google.getGenerativeModel({ model: "gemini-2.0-flash" });

//     // Deep clone the slide to avoid mutating the original
//     const updatedSlide: Slide = JSON.parse(JSON.stringify(slide));

//     // Traverse the content to find and populate lists
//     const processContent = async (items: ContentItem[]): Promise<void> => {
//       for (const item of items) {
//         if (item.type === "resizable-column" || item.type === "column") {
//           await processContent(item.content as ContentItem[]);
//         } else if (["numberedList", "bulletList", "todoList"].includes(item.type)) {
//           // Find the associated heading2 in the same content array
//           const heading2Item = (item.content as ContentItem[]).find(
//             (c) => c.type === "heading2"
//           );
//           const heading2 = heading2Item?.content || updatedSlide.slideName;

//           // Prepare the prompt with dynamic values
//           const filledPrompt = listPrompt
//             .replace("${heading2}", heading2 as string)
//             .replace("${outline}", outline)
//             .replace("${listType}", item.type);

//           // Generate list items using Gemini
//           const response = await model.generateContent({
//             contents: [{ role: "user", parts: [{ text: filledPrompt }] }],
//           });

//           const responseContent =
//             response?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

//           if (responseContent) {
//             try {
//               const cleanedResponse = responseContent.replace(/```json|```/g, "").trim();
//               const listItems: string[] = JSON.parse(cleanedResponse);
              
//               // Validate: ensure exactly 4 items
//               if (listItems.length !== 4) {
//                 throw new Error(`Expected 4 items for ${item.type}, got ${listItems.length}`);
//               }
              
//               item.content = listItems;
//             } catch (error) {
//               console.error(`Failed to parse list items for ${item.type}:`, error);
//               // Fallback: use defaults based on heading2
//               item.content = generateFallbackListItems(item.type, heading2 as string);
//             }
//           } else {
//             // Fallback if no response
//             item.content = generateFallbackListItems(item.type, heading2 as string);
//           }
//         }
//       }
//     };

//     // Process the slide content
//     await processContent(updatedSlide.content.content as ContentItem[]);

//     console.log("Populated Slide:", updatedSlide);
//     return updatedSlide;
//   } catch (error) {
//     console.error("Error populating list items:", error);
//     return null;
//   }
// };

export const populateListItems = async (slide: Slide | null, outline: string): Promise<Slide | null> => {
  if (!slide || !slide.content || !slide.content.content) {
    console.error("Invalid slide input for list population.");
    return null;
  }

  // Batch prompt for all lists in one request
  const listPrompt = `### Guidelines
You are a creative AI tasked with generating list items for a JSON-based presentation slide. I will provide multiple "Heading 2" values, an outline, and list types, and you must generate exactly four list items for each. Return a JSON object where each key is a list ID and the value is an array of four strings, contextually relevant to the "Heading 2" and outline.

1. For "numberedList": Generate four plain strings, each starting with "Step X: " (e.g., "Step 1: Do something.").
2. For "bulletList": Generate four plain strings, each a concise point (e.g., "Point 1").
3. For "todoList": Generate four strings prefixed with "[ ]" or "[x]" (mix them, e.g., two unchecked, two checked).
4. Ensure all items are unique and meaningful, avoiding generic placeholders like "Item 1".

**Outline:** ${outline}

**Lists to Generate:**
{listItems}

**Task:** Generate the list items and return them as a JSON object, e.g., {"listId1": ["Item 1", "Item 2", "Item 3", "Item 4"], "listId2": [...]}.`;

  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is missing in environment variables.");
    }

    const model = google.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Deep clone the slide to avoid mutating the original
    const updatedSlide: Slide = JSON.parse(JSON.stringify(slide));

    // Collect all lists to batch
    const listRequests: { id: string; type: string; heading2: string }[] = [];
    const collectLists = (items: ContentItem[]) => {
      for (const item of items) {
        if (item.type === "resizable-column" || item.type === "column") {
          collectLists(item.content as ContentItem[]);
        } else if (["numberedList", "bulletList", "todoList"].includes(item.type)) {
          const heading2Item = (item.content as ContentItem[]).find(c => c.type === "heading2");
          const heading2 = heading2Item?.content || updatedSlide.slideName;
          listRequests.push({ id: item.id, type: item.type, heading2: typeof heading2 === 'string' ? heading2 : JSON.stringify(heading2) });
        }
      }
    };

    collectLists(updatedSlide.content.content as ContentItem[]);

    // If no lists to populate, return the slide as-is
    if (listRequests.length === 0) {
      console.log("No lists to populate. Returning original slide:", updatedSlide);
      return updatedSlide;
    }

    // Construct batched prompt
    const listItemsStr = listRequests
      .map(req => `- ID: ${req.id}, Type: ${req.type}, Heading 2: ${req.heading2}`)
      .join("\n");
    const filledPrompt = listPrompt.replace("{listItems}", listItemsStr);

    // Rate limiting: Wait 1 second before making the API call
    await delay(1000);

    // Generate all list items in one API call
    const response = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: filledPrompt }] }],
    });

    const responseContent = response?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (responseContent) {
      try {
        const cleanedResponse = responseContent.replace(/```json|```/g, "").trim();
        const listItemsMap: { [key: string]: string[] } = JSON.parse(cleanedResponse);

        // Validate and apply batched results
        const applyContent = (items: ContentItem[]) => {
          for (const item of items) {
            if (item.type === "resizable-column" || item.type === "column") {
              applyContent(item.content as ContentItem[]);
            } else if (listItemsMap[item.id]) {
              if (listItemsMap[item.id].length !== 4) {
                throw new Error(`Expected 4 items for ${item.type} (ID: ${item.id}), got ${listItemsMap[item.id].length}`);
              }
              item.content = listItemsMap[item.id];
            }
          }
        };
        applyContent(updatedSlide.content.content as ContentItem[]);

        console.log("Populated Slide:", updatedSlide);
        return updatedSlide;
      } catch (error) {
        console.error("Failed to parse or validate list items from API response:", error);
        return applyFallback(updatedSlide);
      }
    } else {
      console.warn("No response content from API. Using fallback...");
      return applyFallback(updatedSlide);
    }
  } catch (error) {
    if (typeof error === "object" && error !== null && "status" in error && (error as { status: number }).status === 429) {
      console.error("Rate limit exceeded (429). Retrying after 5 seconds...");
      await delay(5000); // Wait 5 seconds before retrying
      return populateListItems(slide, outline); // Recursive retry (consider limiting retries in production)
    }
    console.error("Error populating list items:", error);
    return applyFallback(slide);
  }
};

// Fallback function to populate lists locally
const applyFallback = (slide: Slide): Slide => {
  const updatedSlide = JSON.parse(JSON.stringify(slide));
  const processContent = (items: ContentItem[]) => {
    for (const item of items) {
      if (item.type === "resizable-column" || item.type === "column") {
        processContent(item.content as ContentItem[]);
      } else if (["numberedList", "bulletList", "todoList"].includes(item.type)) {
        const heading2Item = (item.content as ContentItem[]).find(c => c.type === "heading2");
        const heading2 = heading2Item?.content || updatedSlide.slideName;
        item.content = generateFallbackListItems(item.type, heading2);
      }
    }
  };
  processContent(updatedSlide.content.content as ContentItem[]);
  console.log("Applied fallback list items:", updatedSlide);
  return updatedSlide;
};

// Helper function for fallback list items
const generateFallbackListItems = (listType: string, heading2: string): string[] => {
  switch (listType) {
    case "numberedList":
      return [
        `Step 1: Start ${heading2.toLowerCase()}.`,
        `Step 2: Develop ${heading2.toLowerCase()}.`,
        `Step 3: Test ${heading2.toLowerCase()}.`,
        `Step 4: Deploy ${heading2.toLowerCase()}.`
      ];
    case "bulletList":
      return [
        `${heading2} benefit 1.`,
        `${heading2} benefit 2.`,
        `${heading2} benefit 3.`,
        `${heading2} benefit 4.`
      ];
    case "todoList":
      return [
        `[ ] ${heading2} task 1.`,
        `[x] ${heading2} task 2.`,
        `[ ] ${heading2} task 3.`,
        `[x] ${heading2} task 4.`
      ];
    default:
      return ["Fallback 1", "Fallback 2", "Fallback 3", "Fallback 4"];
  }
};


// export const generateLayoutsJson = async (outlineArray: string[]) => {
//   const slidesData = [];

//   for (const outline of outlineArray) {
//     const slideJson = await generateSlideJson(outline, slidesData.length + 1);
//     if (slideJson) {
//       slidesData.push(slideJson);
//     }
//   }

//   return { status: 200, data: slidesData };
// };

export const generateLayoutsJson = async (outlineArray: string[]) => {
  const slidesData: Slide[] = [];


  for (let index = 0; index < outlineArray.length; index++) {
    const slideJson = await generateSlideJson(outlineArray[index], index + 1); // Pass index + 1 as slideOrder
    if (slideJson) {
      slidesData.push(slideJson);
    }
  }

  return { status: 200, data: slidesData };
};

// Generate Layouts for the Project #########################################################################################################################################
export const generateLayouts = async (ProjectId: string, theme: string) => {
  try {
    if (!ProjectId) {
      return { status: 400, error: "ProjectId is required!" };
    }
    // console.log(ProjectId)

    const user = await currentUser();
    if (!user) {
      return { status: 403, error: "User not authanticated" };
    }

    // Find the user
    const userExists = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
    });
    // If user doesn't exist or doesn't have subscription
    if (!userExists || !userExists.subscription) {
      return {
        status: 403,
        error: !userExists?.subscription
          ? "User does not have an active subscription"
          : "User not found in th database",
      };
    }

    // Find the project
    const project = await client.project.findUnique({
      where: {
        id: ProjectId,
      },
    });

    // console.log(project);
    //cm7u32ath0003oxydebddu4tg
    //cm7u5uay80001odntv50yjo1i

    // If project doesn't exist
    if (!project) {
      return { status: 404, error: "Project not found" };
    }

    // If project doesn't have outlines
    if (!project.outlines || project.outlines.length === 0) {
      return { status: 400, error: "Project does not have any outlines" };
    }

    // Testing
    let i=1;
    project.outlines.map((outline) => { console.log(`Outline ${i++} : ${outline}`) });


    // Generate Loayout Json data
    const layouts = await generateLayoutsJson(project.outlines);

    if (layouts.status !== 200) {
      return layouts;
    }

    //update project with layouts
    await client.project.update({
      where: {
        id: ProjectId,
      },
      data: {
        // slides: layouts.data,    -----Changes -----
        slides: JSON.parse(JSON.stringify(layouts.data)),
        themeName: theme,
      },
    });

    // Return the layouts if all successful
    return { status: 200, data: layouts.data };
  } catch (error) {
    console.error("Error generating layouts:", error);

    return { status: 500, error: "Internal server error", data: [] };
  }
};

// ChatGPT generated file -----------------------------------------------------------------------------------------------------------------

// "use server";

// import { client } from "@/lib/prisma";
// import { ContentItem, ContentType, Slide } from "@/lib/types";
// import { currentUser } from "@clerk/nextjs/server";
// // import { placeholder } from "@cloudinary/react";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { v4 as uuidv4 } from "uuid";

// if (!process.env.GEMINI_API_KEY) {
//   throw new Error("GEMINI_API_KEY is missing in environment variables.");
// }

// const google = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// export const generateCreativePrompt = async (userPrompt: string) => {
//   try {
//     const model = google.getGenerativeModel({ model: "gemini-1.5-flash" });

//     const finalPrompt = `
//       Create a coherent and relevant outline for the following prompt: ${userPrompt}.
//       The outline should consist of at least 6 points, with each point written as a single sentence.
//       Ensure the outline is well-structured and directly related to the topic.
//       Return the output in the following JSON format:

//       {
//           "outlines": [
//               "Point 1",
//               "Point 2",
//               "Point 3",
//               "Point 4",
//               "Point 5",
//               "Point 6"
//           ]
//       }

//       Ensure that the JSON is valid and properly formatted. Do not include any other text or explanation outside the JSON.
//     `;

//     const response = await model.generateContent({
//       contents: [{ role: "user", parts: [{ text: finalPrompt }] }],
//     });

//     const responseContent =
//       response?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

//     if (responseContent) {
//       try {
//         // 🛠 Remove triple backticks if present
//         const cleanedResponse = responseContent
//           .replace(/```json|```/g, "")
//           .trim();

//         //  Parse cleaned JSON
//         const jsonResponse = JSON.parse(cleanedResponse);
//         // console.log(jsonResponse)
//         return { status: 200, data: jsonResponse };
//       } catch (error) {
//         console.error("Invalid JSON received from AI:", responseContent, error);
//         return { status: 500, error: "Invalid JSON received from AI" };
//       }
//     }

//     return { status: 400, error: "No response from AI" };
//   } catch (error) {
//     console.error("Error generating outline:", error);
//     return { status: 500, error: "Internal server error" };
//   }
// };

// const findImageComponents = (layout: ContentItem): ContentItem[] => {
//   const images: ContentItem[] = [];

//   // If this is an image component, add it
//   if (layout.type === "image") {
//     images.push(layout);
//   }

//   // Check for nested content regardless of current component type
//   if (Array.isArray(layout.content)) {
//     layout.content.forEach((child) => {
//       images.push(...findImageComponents(child as ContentItem));
//     });
//   } else if (layout.content && typeof layout.content === "object") {
//     images.push(...findImageComponents(layout.content as ContentItem));
//   }

//   console.log("images: ", images);
//   return images;
// };

// // const generateImageUrl = async (prompt: string): Promise<string> => {
// //   try {
// //     const improvedPrompt = `
// //       Create a highly realistic, professional image based on the following description. The image should look as if captured in real life, with attention to detail, lighting, and texture.

// //       Description: ${prompt}

// //       Important Notes:
// //       - Image size must be 1024x1024px.
// //       - The image must be in a photorealistic style and visually compelling.
// //       - Ensure all text, signs, or visible writing in the image are in English.
// //       - Pay special attention to lighting, shadows, and textures to make the image as lifelike as possible.
// //       - Avoid elements that appear abstract, cartoonish, or overly artistic. The image should be suitable for professional presentations.
// //       - Focus on accurately depicting the concept described, including specific objects, environment, mood, and context. Maintain relevance to the description provided.

// //       Example Use Cases: Business presentation, educational slides, professional designs.

// //       `;

// //     const model = google.getGenerativeModel({ model: "gemini-2.0-flash" });

// //     const result = await model.generateContent({
// //       contents: [{ role: "user", parts: [{ text: improvedPrompt }] }],
// //     });

// //     const imageUrl =
// //       result.response?.candidates?.[0]?.content?.parts?.[0]?.text;

// //     if (!imageUrl) throw new Error("Failed to generate image URL");

// //     console.log("Generated Image URL:", imageUrl);

// //     console.log("Image generated successfully: ", imageUrl);
// //     return imageUrl || "https://via.placeholder.com/1024";
// //   } catch (error) {
// //     console.error("Error generating image URL:", error);
// //     return "https://via.placeholder.com/1024";
// //   }
// // };

//     // using Deep AI #################################################################################################
// const generateImageUrl = async (prompt: string): Promise<string> => {
//   try {
//     const improvedPrompt = `
//       Generate a high-quality, photorealistic image based on the description below. Ensure the image looks as if captured in real life with proper lighting, shadows, and texture.

//       Description: ${prompt}

//       Important Notes:
//       - The image must be 1024x1024px.
//       - Maintain photorealism with attention to detail.
//       - Avoid cartoonish, abstract, or overly artistic styles.
//       - Ensure any text in the image appears in English.
//     `;

//     const response = await fetch("https://api.deepai.org/api/text2img", {
//       method: "POST",
//       headers: {
//         "api-key": process.env.DEEPAI_API_KEY!,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ text: improvedPrompt }),
//     });

//     const data = await response.json();

//     console.log("Full API Response:", JSON.stringify(data, null, 2));

//     if (!data.output_url) {
//       console.warn("⚠️ No valid image received. Using fallback.");
//       return "https://via.placeholder.com/1024";
//     }

//     console.log("Generated Image URL:", data.output_url);
//     return data.output_url;
//   } catch (error) {
//     console.error("❌ Error generating image URL:", error);
//     return "https://via.placeholder.com/1024";
//   }
// };

// // const existingLayouts = [
// //   {
// //     id: uuidv4(),
// //     slideName: "Two Column with Header",
// //     type: "twoColumns",
// //     className: "p-6 mx-auto flex flex-col items-center",
// //     content: {
// //       id: uuidv4(),
// //       type: "row" as ContentType,
// //       name: "Header Row",
// //       content: [
// //         {
// //           id: uuidv4(),
// //           type: "title" as ContentType,
// //           name: "Main Header",
// //           content: "",
// //           placeholder: "Enter Slide Title...",
// //         },
// //       ],
// //     },
// //     body: {
// //       id: uuidv4(),
// //       type: "row" as ContentType,
// //       name: "Two Columns",
// //       content: [
// //         {
// //           id: uuidv4(),
// //           type: "column" as ContentType,
// //           name: "Left Column",
// //           className: "p-4 border-r",
// //           content: [
// //             {
// //               id: uuidv4(),
// //               type: "paragraph" as ContentType,
// //               name: "",
// //               content: "",
// //               placeholder: "Write something here...",
// //             },
// //           ],
// //         },
// //         {
// //           id: uuidv4(),
// //           type: "column" as ContentType,
// //           name: "Right Column",
// //           className: "p-4",
// //           content: [
// //             {
// //               id: uuidv4(),
// //               type: "image" as ContentType,
// //               name: "Image Block",
// //               content: "",
// //               placeholder: "Upload an image...",
// //             },
// //           ],
// //         },
// //       ],
// //     },
// //   },
// //   {
// //     id: uuidv4(),
// //     slideName: "Single Column Text",
// //     type: "singleColumn",
// //     className: "p-6 mx-auto flex flex-col items-center",
// //     content: {
// //       id: uuidv4(),
// //       type: "column" as ContentType,
// //       name: "Main Column",
// //       content: [
// //         {
// //           id: uuidv4(),
// //           type: "title" as ContentType,
// //           name: "Slide Title",
// //           content: "",
// //           placeholder: "Enter your title...",
// //         },
// //         {
// //           id: uuidv4(),
// //           type: "paragraph" as ContentType,
// //           name: "",
// //           content: "",
// //           placeholder: "Write detailed content here...",
// //         },
// //         {
// //           id: uuidv4(),
// //           type: "paragraph" as ContentType,
// //           name: "",
// //           content: "",
// //           placeholder: "Add more details...",
// //         },
// //       ],
// //     },
// //   },
// //   {
// //     id: uuidv4(),
// //     slideName: "Grid Layout",
// //     type: "grid",
// //     className: "p-6 mx-auto grid grid-cols-2 gap-4",
// //     content: [
// //       {
// //         id: uuidv4(),
// //         type: "column" as ContentType,
// //         name: "Top Left",
// //         content: [
// //           {
// //             id: uuidv4(),
// //             type: "title" as ContentType,
// //             name: "Subtitle",
// //             content: "",
// //             placeholder: "Enter subtitle...",
// //           },
// //         ],
// //       },
// //       {
// //         id: uuidv4(),
// //         type: "column" as ContentType,
// //         name: "Top Right",
// //         content: [
// //           {
// //             id: uuidv4(),
// //             type: "image" as ContentType,
// //             name: "Picture Block",
// //             content: "",
// //             placeholder: "Upload an image...",
// //           },
// //         ],
// //       },
// //       {
// //         id: uuidv4(),
// //         type: "column" as ContentType,
// //         name: "Bottom Left",
// //         content: [
// //           {
// //             id: uuidv4(),
// //             type: "paragraph" as ContentType,
// //             name: "",
// //             content: "",
// //             placeholder: "Write additional text...",
// //           },
// //         ],
// //       },
// //       {
// //         id: uuidv4(),
// //         type: "column" as ContentType,
// //         name: "Bottom Right",
// //         content: [
// //           {
// //             id: uuidv4(),
// //             type: "list" as ContentType,
// //             name: "Bullet Points",
// //             content: "",
// //             placeholder: "Add bullet points...",
// //           },
// //         ],
// //       },
// //     ],
// //   },
// // ];

// const replaceImagePlaceholders = async (layout: Slide) => {
//   console.log("layout", layout);
//   const imageComponents = findImageComponents(layout.content);
//   console.log("Found image components: ", imageComponents);
//   for (const component of imageComponents) {
//     console.log("Generating image for component:", component.alt);
//     component.content = await generateImageUrl(
//       component.alt || "Placeholder Image"
//     );
//     console.log("Generated URL:", component.content);
//   }
// };

// // Generate layouts in Json format for the project
// export const generateLayoutsJson = async (outlineArray: string[]) => {
//   // const prompt = `
//   // You are highly creative AI that generates JSON-based layouts for presentations.I will provide you with an array of outlines, and for each outline, you must generate a unique and creative layout. Use the existing layouts as examples for structure and design, and generate unique designs bases on the provided outlines.

//   // ### Guidlines:
//   // 1. Write layouts based on the specific outline provided.
//   // 2. user diverse and engaging designs, ensuring each layout is unique.
//   // 3. Adhere to the structure of the existing layouts but add new styles or components ifneeded.
//   // 4. Fill placeholder data into content fields where required.
//   // 5. Generate unique image placeholders for the 'content' property to image components and also alt text according to the outline.
//   // 6. Ensure proper formatting and schema alignment for the output JSON.

//   // ### Example Layouts:
//   // ${JSON.stringify(existingLayouts, null, 2)}

//   // ### Outline Array:
//   // ${JSON.stringify(outlineArray)}

//   // For each entry in the outline array, generate:
//   // - A unique JSON layout with creative desins.
//   // - Properly filled for image components.
//   // - Clear and well-structured JSON data.

//   // For Images
//   // - The alt text should describe the image clearly and concisely.
//   // - Focus on the main subject(s) of the image and relavent details such as colors, shapes, people, or objects.
//   // - Ensure that alt text aligns with the context of the presentation slide it will be used on (e.g., professional, educational, business-releted).
//   // - Avoid using terms like "image of" or "picture of", and instead focus directly on the content and meaning.

//   // Output the layout in JSON format. Ensure the are no duplicate layout across the array.
//   //  `;

//   // Test Prompt---------------------------------------------------
//   const prompt = `### Guidelines
// You are a highly creative AI that generates JSON-based layouts for presentations. I will provide you with a pattern and a format to follow, and for each outline, you must generate unique layouts and contents and give me the output in the JSON format expected.
// Our final JSON output is a combination of layouts and elements. The available LAYOUTS TYPES are as follows: "accentLeft", "accentRight", "imageAndText", "textAndImage", "twoColumns", "twoColumnsWithHeadings", "threeColumns", "threeColumnsWithHeadings", "fourColumns", "twoImageColumns", "threeImageColumns", "fourImageColumns", "tableLayout".
// The available CONTENT TYPES are "heading1", "heading2", "heading3", "heading4", "title", "paragraph", "table", "resizable-column", "image",
// "blockquote", "numberedList", "bulletList", "todoList", "calloutBox", "codeBlock", "tableOfContents", "divider", "column"

// Use these outlines as a starting point for the
// content of the presentations
// ${JSON.stringify(outlineArray)}

// The output must be an array of JSON objects.
// 1. Write layouts based on the specific outline provided. Do not use types that are not mentioned in the example layouts.
// 2. Ensuring each layout is unique.
// 3. Adhere to the structure of existing layouts.
// 4. Fill placeholder data into content fields where required.
// 5. Generate unique image placeholders for the 'content' property of image components and also alt text according to the outline.
// 6. Ensure proper formatting and schema alignment for the output JSON.
// 7. First create LAYOUTS TYPES at the top most level of the JSON output as follows ${JSON.stringify(
//     [
//       {
//         slideName: "Blank card",
//         type: "blank-card",
//         className: "p-8 mx-auto flex justify-center items-center min-h-[200px]",
//         content: {},
//       },
//     ]
//   )}

//   8. The content property of each LAYOUTS TYPE should start with "column" and within the columns content property you can use any of the CONTENT TYPES I provided above. Resizable-column, column and other multi element contents should be an array because you can have more elements inside them nested. Static elements like title and paragraph should have content set to a string. Here is an example of what 1 layout with 1 column with 1 title inside would look like:
//   ${JSON.stringify([
//     {
//       slideName: "Blank card",
//       type: "blank-card",
//       className: "p-8 mx-auto flex justify-center items-center min-h-[200px]",
//       content: {
//         id: uuidv4(),
//         type: "column" as ContentType,
//         name: "Column",
//         content: [
//           {
//             id: uuidv4(),
//             type: "title" as ContentType,
//             name: "Title",
//             content: "",
//             placeholder: "Untitled Card",
//           },
//         ],
//       },
//     },
//   ])}

//   9. Here is a final example of an example output for you to get an idea
//   ${JSON.stringify([
//     {
//       id: uuidv4(),
//       slideName: "Blank card",
//       type: "blank-card",
//       className: "p-8 mx-auto flex justify-center items-center min-h-[200px]",
//       content: {
//         id: uuidv4(),
//         type: "column" as ContentType,
//         name: "Column",
//         content: [
//           {
//             id: uuidv4(),
//             type: "title" as ContentType,
//             name: "Title",
//             content: "",
//             placeholder: "Untitled Card",
//           },
//         ],
//       },
//     },
//     {
//       id: uuidv4(),
//       slideName: "Accent left",
//       type: "accentLeft",
//       className: "min-h-[300px]",
//       content: {
//         id: uuidv4(),
//         type: "column" as ContentType,
//         name: "Column",
//         restrictDropTo: true,
//         content: [
//           {
//             id: uuidv4(),
//             type: "resizable-column" as ContentType,
//             name: "Resizable column",
//             restrictToDrop: true,
//             content: [
//               {
//                 id: uuidv4(),
//                 type: "image" as ContentType,
//                 name: "Image",
//                 content:
//                   "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3FDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//                 alt: "Title",
//               },
//               {
//                 id: uuidv4(),
//                 type: "column" as ContentType,
//                 name: "Column",
//                 content: [
//                   {
//                     id: uuidv4(),
//                     type: "heading1" as ContentType,
//                     name: "Heading1",
//                     content: "",
//                     placeholder: "Heading1",
//                   },
//                   {
//                     id: uuidv4(),
//                     type: "paragraph" as ContentType,
//                     name: "Paragraph",
//                     content: "",
//                     placeholder: "start typing here...",
//                   },
//                 ],
//                 className: "w-full h-full p-8 flex justify-center items-center",
//                 placeholder: "Heading1",
//               },
//             ],
//           },
//         ],
//       },
//     },
//   ])}

//   For Images
// - The alt text should describe the image clearly and concisely.
// - Focus on the main subject(s) of the image and any relevant details such as colors, shapes, people, or objects.
// - Ensure the alt text aligns with the context of the presentation slide it will be used on (e.g., professional, educational, business-related).
// - Avoid using terms like "image of" or "picture of," and instead focus directly on the content and meaning.

// Output the layouts in JSON format. Ensure there are no duplicate layouts across the array.
// `;

//   try {
//     console.log("Generating layouts JSON ....");

//     if (!process.env.GEMINI_API_KEY) {
//       throw new Error("GEMINI_API_KEY is missing in environment variables.");
//     }

//     const model = google.getGenerativeModel({ model: "gemini-2.0-flash" });

//     const response = await model.generateContent({
//       contents: [{ role: "user", parts: [{ text: prompt }] }],
//     });

//     const responseContent =
//       response?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

//     if (responseContent) {
//       try {
//         // 🛠 Remove triple backticks if present
//         const cleanedResponse = responseContent
//           .replace(/```json|```/g, "")
//           .trim();

//         //  Parse cleaned JSON
//         const jsonResponse = JSON.parse(cleanedResponse);
//         // console.log(jsonResponse)

//         await Promise.all(jsonResponse.map(replaceImagePlaceholders));
//         // console.log("jsonResponse", jsonResponse);
//         return { status: 200, data: jsonResponse };
//       } catch (error) {
//         console.error(
//           "Invalid JSON layouts received from AI:",
//           responseContent,
//           error
//         );
//         return { status: 500, error: "Invalid JSON layouts received from AI" };
//       }
//     }

//     return { status: 400, error: "No response from AI" };
//   } catch (error) {
//     console.error("Error generating layouts JSON:", error);
//     return {
//       status: 500,
//       error: "Internal server error generating layouts JSON",
//     };
//   }
// };

// // Generate layouts for the project
// export const generateLayouts = async (ProjectId: string, theme: string) => {
//   try {
//     if (!ProjectId) {
//       return { status: 400, error: "ProjectId is required!" };
//     }
//     // console.log(ProjectId)

//     const user = await currentUser();
//     if (!user) {
//       return { status: 403, error: "User not authanticated" };
//     }

//     // Find the user
//     const userExists = await client.user.findUnique({
//       where: {
//         clerkId: user.id,
//       },
//     });
//     // If user doesn't exist or doesn't have subscription
//     if (!userExists || !userExists.subscription) {
//       return {
//         status: 403,
//         error: !userExists?.subscription
//           ? "User does not have an active subscription"
//           : "User not found in th database",
//       };
//     }

//     // Find the project
//     const project = await client.project.findUnique({
//       where: {
//         id: ProjectId,
//       },
//     });

//     console.log(project);
//     //cm7u32ath0003oxydebddu4tg
//     //cm7u5uay80001odntv50yjo1i

//     // If project doesn't exist
//     if (!project) {
//       return { status: 404, error: "Project not found" };
//     }

//     // If project doesn't have outlines
//     if (!project.outlines || project.outlines.length === 0) {
//       return { status: 400, error: "Project does not have any outlines" };
//     }

//     // Generate Loayout Json data
//     const layouts = await generateLayoutsJson(project.outlines);

//     if (layouts.status !== 200) {
//       return layouts;
//     }

//     //update project with layouts
//     await client.project.update({
//       where: {
//         id: ProjectId,
//       },
//       data: {
//         slides: layouts.data,
//         themeName: theme,
//       },
//     });

//     // Return the layouts if all successful
//     return { status: 200, data: layouts.data };
//   } catch (error) {
//     console.error("Error generating layouts:", error);

//     return { status: 500, error: "Internal server error", data: [] };
//   }
// };
