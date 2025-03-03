"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateCreativePrompt = async (userPrompt: string) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is missing in environment variables.");
    }

    const google = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
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

    const responseContent = response?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (responseContent) {
      try {
        // 🛠 Remove triple backticks if present
        const cleanedResponse = responseContent.replace(/```json|```/g, "").trim();
        
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
