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
// ------Perfect Run without image generation  --------------------------------------------------------------

const prompt = `### Guidelines
You are a highly creative AI that generates JSON-based layouts for presentations. I will provide you with a pattern and a format to follow, and for each outline, you must generate a unique layout and content, giving me the output in the JSON format expected.
Our final JSON output is a combination of layouts and elements. The available LAYOUT TYPES are as follows: "accentLeft", "accentRight", "twoColumns", "twoColumnsWithHeadings", "threeColumns", "threeColumnsWithHeadings", "fourColumns", "tableLayout".
The available CONTENT TYPES are: "heading1", "heading2", "heading3", "heading4", "title", "paragraph", "table", "resizable-column", "blockquote", "numberedList", "bulletList", "todoList", "calloutBox", "codeBlock", "tableOfContents", "divider", "column".

The output must be a single JSON object.
1. Write a layout based on the specific outline provided. Do not use types that are not mentioned in the example layouts.
2. Ensure the layout is unique.
3. Adhere to the structure of existing layouts.
4. Fill placeholder data into content fields where required. If the outline does not provide specific content, use meaningful placeholder text from the outline's context or the "placeholder" field, ensuring it is non-empty.
5. Ensure proper formatting and schema alignment for the output JSON.
6. The "content" property of the layout must strictly use only the "content" key. Do not use alternative names such as "content1", "content2", "content3", or any other variations—only "content" is permitted.

7. The "content" property of the layout must start with a "column", and within the column's content property, you can use any of the CONTENT TYPES provided above. 
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

8. Here is a final example output to ensure consistency and correctness:
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

9. Strictly ensure that the "content" property of all CONTENT TYPES ("heading1", "heading2", "heading3", "heading4", "title", "paragraph", "table", "resizable-column", "blockquote", "numberedList", "bulletList", "todoList", "calloutBox", "codeBlock", "tableOfContents", "divider", "column") is never empty. Populate the "content" field as follows, with no exceptions:
   - For "heading1", "heading2", "heading3", "heading4", "title": Use the "placeholder" value or a concise, contextually relevant string based on the outline (e.g., "Section Title").
   - For "paragraph", "blockquote", "calloutBox": Use the "placeholder" value or a brief sentence relevant to the outline (e.g., "Description goes here.").
   - For "codeBlock": Use a sample code snippet relevant to the outline or "console.log('Example');".
   - For "table": Use an array with at least one row (e.g., [["Header1", "Header2"], ["Data1", "Data2"]]).
   - For "resizable-column", "column": Use an array with at least one nested element (e.g., a "paragraph").
   - For "numberedList": Always populate with at least three plain strings, each contextually relevant to the outline (e.g., ["Step 1: Define goals.", "Step 2: Assign tasks.", "Step 3: Review progress."]).
   - For "bulletList": Always populate with at least three plain strings, each contextually relevant to the outline (e.g., ["Feature 1", "Feature 2", "Feature 3"]).
   - For "todoList": Always populate with at least three strings prefixed with "[ ]" or "[x]", each contextually relevant to the outline (e.g., ["[ ] Task 1", "[x] Task 2", "[ ] Task 3"]).
   - For "tableOfContents": Use a string like "TOC Placeholder".
   - For "divider": Use a string like "Divider Line".

10. Generate the JSON Output for the Following Outline:**  
   **Outline:** ${outline}  

11. Before finalizing the output, validate that the "content" arrays for "numberedList", "bulletList", and "todoList" are never empty and contain at least three items. If they are empty or have fewer than three items, populate them with contextually relevant defaults based on the outline or slideName.

Now generate the JSON output based on these rules.`;


  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is missing in environment variables.");
    }

    const model = google.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Rate limit: Wait 1 second before the request
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
                const slide: Slide | null = parseSlideJson(cleanedResponse);
                if (!slide) {
                  console.error("Failed to parse slide JSON.");
                  return null;
                }

        // Ensure unique IDs for all nested content items
        slide.id = uuidv4();
        slide.content = generateUniqueIds(slide.content);

        const populatedSlide = await populateListItems(slide, outline);
        if (!populatedSlide) {
          console.error("Failed to populate list items.");
          return slide; // Return the unpopulated slide as a fallback
        }

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
      
            await delay(500); // Wait 0.5 seconds before retrying
      return generateSlideJson(outline, slideOrder); // Recursive retry (limit retries in production)
    }
    console.error("Error generating slide JSON:", error);
    return null;
  }
};

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