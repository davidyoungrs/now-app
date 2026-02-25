import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini SDK
// Note: Requires GEMINI_API_KEY to be set in .env.local
const ai = new GoogleGenAI({});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { image } = body; // expecting a base64 string: "data:image/jpeg;base64,..."

        if (!image) {
            return NextResponse.json({ error: "No image provided" }, { status: 400 });
        }

        // Extract base64 payload
        const base64Data = image.split(",")[1] || image;

        // Construct the prompt instructing Gemini on how to format the output
        const prompt = `
      You are an expert fashion cataloging AI. 
      Analyze the provided image of clothing. 
      Identify the main item(s) of clothing visible. If the user is wearing an outfit, identify the key pieces (e.g., top, bottom, outerwear).
      
      Respond strictly in the following JSON format. Your entire response must be a valid JSON array of objects. Do not wrap it in markdown block quotes (like \`\`\`json). Just return the raw JSON array.
      
      [
        {
          "name": "A short, descriptive name (e.g., 'Blue Denim Jacket', 'Black Graphic Tee')",
          "category": "Must be exactly one of: Tops, Bottoms, Outerwear, Shoes, Accessories",
          "color": "Primary color",
          "warmthLevel": "Must be exactly one of: light, medium, heavy",
          "formality": "Must be exactly one of: casual, business-casual, formal, lounge"
        }
      ]
    `;

        // Await the response from the gemini-2.5-flash model
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [
                prompt,
                {
                    inlineData: {
                        data: base64Data,
                        mimeType: "image/jpeg",
                    },
                },
            ],
            config: {
                temperature: 0.2, // Low temperature for more deterministic/formatting adherence
            },
        });

        const aiText = response.text || "[]";

        // Attempt to parse the resulting text to JSON
        // We try to clean it up in case the model wraps it in markdown despite instructions
        const cleanedText = aiText.replace(/```json/gi, "").replace(/```/g, "").trim();

        let parsedItems;
        try {
            parsedItems = JSON.parse(cleanedText);
        } catch (parseError) {
            console.error("Failed to parse Gemini output as JSON:", cleanedText);
            return NextResponse.json({ error: "Failed to parse AI response into items", raw: aiText }, { status: 500 });
        }

        // Ensure it's an array
        if (!Array.isArray(parsedItems)) {
            parsedItems = [parsedItems];
        }

        return NextResponse.json({ items: parsedItems });

    } catch (error: any) {
        console.error("Error in wardrobe analyze route:", error);
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
}
