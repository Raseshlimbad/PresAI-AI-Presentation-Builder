"use server";

import { client } from "@/lib/prisma";
import { ContentItem, ContentType, Slide } from "@/lib/types";
import { currentUser } from "@clerk/nextjs/server";
import { placeholder } from "@cloudinary/react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { v4 as uuidv4 } from "uuid";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is missing in environment variables.");
}

const google = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateCreativePrompt = async (userPrompt: string) => {
  try {
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
          ]
      }

      Ensure that the JSON is valid and properly formatted. Do not include any other text or explanation outside the JSON.
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

const existingLayouts = [
  {
    id: uuidv4(),
    slideName: "Two Column with Header",
    type: "twoColumns",
    className: "p-6 mx-auto flex flex-col items-center",
    content: {
      id: uuidv4(),
      type: "row" as ContentType,
      name: "Header Row",
      content: [
        {
          id: uuidv4(),
          type: "title" as ContentType,
          name: "Main Header",
          content: "",
          placeholder: "Enter Slide Title...",
        },
      ],
    },
    body: {
      id: uuidv4(),
      type: "row" as ContentType,
      name: "Two Columns",
      content: [
        {
          id: uuidv4(),
          type: "column" as ContentType,
          name: "Left Column",
          className: "p-4 border-r",
          content: [
            {
              id: uuidv4(),
              type: "paragraph" as ContentType,
              name: "",
              content: "",
              placeholder: "Write something here...",
            },
          ],
        },
        {
          id: uuidv4(),
          type: "column" as ContentType,
          name: "Right Column",
          className: "p-4",
          content: [
            {
              id: uuidv4(),
              type: "image" as ContentType,
              name: "Image Block",
              content: "",
              placeholder: "Upload an image...",
            },
          ],
        },
      ],
    },
  },
  {
    id: uuidv4(),
    slideName: "Single Column Text",
    type: "singleColumn",
    className: "p-6 mx-auto flex flex-col items-center",
    content: {
      id: uuidv4(),
      type: "column" as ContentType,
      name: "Main Column",
      content: [
        {
          id: uuidv4(),
          type: "title" as ContentType,
          name: "Slide Title",
          content: "",
          placeholder: "Enter your title...",
        },
        {
          id: uuidv4(),
          type: "paragraph" as ContentType,
          name: "",
          content: "",
          placeholder: "Write detailed content here...",
        },
        {
          id: uuidv4(),
          type: "paragraph" as ContentType,
          name: "",
          content: "",
          placeholder: "Add more details...",
        },
      ],
    },
  },
  {
    id: uuidv4(),
    slideName: "Grid Layout",
    type: "grid",
    className: "p-6 mx-auto grid grid-cols-2 gap-4",
    content: [
      {
        id: uuidv4(),
        type: "column" as ContentType,
        name: "Top Left",
        content: [
          {
            id: uuidv4(),
            type: "title" as ContentType,
            name: "Subtitle",
            content: "",
            placeholder: "Enter subtitle...",
          },
        ],
      },
      {
        id: uuidv4(),
        type: "column" as ContentType,
        name: "Top Right",
        content: [
          {
            id: uuidv4(),
            type: "image" as ContentType,
            name: "Picture Block",
            content: "",
            placeholder: "Upload an image...",
          },
        ],
      },
      {
        id: uuidv4(),
        type: "column" as ContentType,
        name: "Bottom Left",
        content: [
          {
            id: uuidv4(),
            type: "paragraph" as ContentType,
            name: "",
            content: "",
            placeholder: "Write additional text...",
          },
        ],
      },
      {
        id: uuidv4(),
        type: "column" as ContentType,
        name: "Bottom Right",
        content: [
          {
            id: uuidv4(),
            type: "list" as ContentType,
            name: "Bullet Points",
            content: "",
            placeholder: "Add bullet points...",
          },
        ],
      },
    ],
  },
];

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

// Generate layouts in Json format for the project
export const generateLayoutsJson = async (outlineArray: string[]) => {
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

  // Test Prompt---------------------------------------------------
  const prompt = `### Guidelines
You are a highly creative AI that generates JSON-based layouts for presentations. I will provide you with a pattern and a format to follow, and for each outline, you must generate unique layouts and contents and give me the output in the JSON format expected.
Our final JSON output is a combination of layouts and elements. The available LAYOUTS TYPES are as follows: "accentLeft", "accentRight", "imageAndText", "textAndImage", "twoColumns", "twoColumnsWithHeadings", "threeColumns", "threeColumnsWithHeadings", "fourColumns", "twoImageColumns", "threeImageColumns", "fourImageColumns", "tableLayout".
The available CONTENT TYPES are "heading1", "heading2", "heading3", "heading4", "title", "paragraph", "table", "resizable-column", "image", 
"blockquote", "numberedList", "bulletList", "todoList", "calloutBox", "codeBlock", "tableOfContents", "divider", "column"

Use these outlines as a starting point for the 
content of the presentations
${JSON.stringify(outlineArray)}

The output must be an array of JSON objects.
1. Write layouts based on the specific outline provided. Do not use types that are not mentioned in the example layouts.
2. Ensuring each layout is unique.
3. Adhere to the structure of existing layouts.
4. Fill placeholder data into content fields where required.
5. Generate unique image placeholders for the 'content' property of image components and also alt text according to the outline.
6. Ensure proper formatting and schema alignment for the output JSON.
7. First create LAYOUTS TYPES at the top most level of the JSON output as follows ${JSON.stringify(
    [
      {
        slideName: "Blank card",
        type: "blank-card",
        className: "p-8 mx-auto flex justify-center items-center min-h-[200px]",
        content: {},
      },
    ]
  )}

  8. The content property of each LAYOUTS TYPE should start with "column" and within the columns content property you can use any of the CONTENT TYPES I provided above. Resizable-column, column and other multi element contents should be an array because you can have more elements inside them nested. Static elements like title and paragraph should have content set to a string. Here is an example of what 1 layout with 1 column with 1 title inside would look like:
  ${JSON.stringify([
    {
      slideName: "Blank card",
      type: "blank-card",
      className: "p-8 mx-auto flex justify-center items-center min-h-[200px]",
      content: {
        id: uuidv4(),
        type: "column" as ContentType,
        name: "Column",
        content: [
          {
            id: uuidv4(),
            type: "title" as ContentType,
            name: "Title",
            content: "",
            placeholder: "Untitled Card",
          },
        ],
      },
    },
  ])}

  9. Here is a final example of an example output for you to get an idea
  ${JSON.stringify([
    {
      id: uuidv4(),
      slideName: "Blank card",
      type: "blank-card",
      className: "p-8 mx-auto flex justify-center items-center min-h-[200px]",
      content: {
        id: uuidv4(),
        type: "column" as ContentType,
        name: "Column",
        content: [
          {
            id: uuidv4(),
            type: "title" as ContentType,
            name: "Title",
            content: "",
            placeholder: "Untitled Card",
          },
        ],
      },
    },
    {
      id: uuidv4(),
      slideName: "Accent left",
      type: "accentLeft",
      className: "min-h-[300px]",
      content: {
        id: uuidv4(),
        type: "column" as ContentType,
        name: "Column",
        restrictDropTo: true,
        content: [
          {
            id: uuidv4(),
            type: "resizable-column" as ContentType,
            name: "Resizable column",
            restrictToDrop: true,
            content: [
              {
                id: uuidv4(),
                type: "image" as ContentType,
                name: "Image",
                content:
                  "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3FDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                alt: "Title",
              },
              {
                id: uuidv4(),
                type: "column" as ContentType,
                name: "Column",
                content: [
                  {
                    id: uuidv4(),
                    type: "heading1" as ContentType,
                    name: "Heading1",
                    content: "",
                    placeholder: "Heading1",
                  },
                  {
                    id: uuidv4(),
                    type: "paragraph" as ContentType,
                    name: "Paragraph",
                    content: "",
                    placeholder: "start typing here...",
                  },
                ],
                className: "w-full h-full p-8 flex justify-center items-center",
                placeholder: "Heading1",
              },
            ],
          },
        ],
      },
    },
  ])}

  For Images
- The alt text should describe the image clearly and concisely.
- Focus on the main subject(s) of the image and any relevant details such as colors, shapes, people, or objects.
- Ensure the alt text aligns with the context of the presentation slide it will be used on (e.g., professional, educational, business-related).
- Avoid using terms like "image of" or "picture of," and instead focus directly on the content and meaning.

Output the layouts in JSON format. Ensure there are no duplicate layouts across the array.
`;

  try {
    console.log("Generating layouts JSON ....");

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is missing in environment variables.");
    }

    const model = google.getGenerativeModel({ model: "gemini-2.0-flash" });

    const response = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
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

        await Promise.all(jsonResponse.map(replaceImagePlaceholders));
        console.log("jsonResponse", jsonResponse);
        return { status: 200, data: jsonResponse };
      } catch (error) {
        console.error(
          "Invalid JSON layouts received from AI:",
          responseContent,
          error
        );
        return { status: 500, error: "Invalid JSON layouts received from AI" };
      }
    }

    return { status: 400, error: "No response from AI" };
  } catch (error) {
    console.error("Error generating layouts JSON:", error);
    return {
      status: 500,
      error: "Internal server error generating layouts JSON",
    };
  }
};

// Generate layouts for the project
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

    console.log(project);
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
        slides: layouts.data,
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




// ChatGPT generated file -------------------------------------------------------------------------

