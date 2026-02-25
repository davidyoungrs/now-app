import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
    try {
        // Initialize Gemini SDK here to avoid errors during static generation
        // Note: Requires GEMINI_API_KEY to be set in .env.local
        const ai = new GoogleGenAI({});

        const body = await req.json();
        const { image, inventory } = body; // expecting image base64 and inventory array

        if (!image) {
            return NextResponse.json({ error: "No image provided" }, { status: 400 });
        }

        if (!inventory || !Array.isArray(inventory)) {
            return NextResponse.json({ error: "Inventory array is required" }, { status: 400 });
        }

        // Extract base64 payload
        const base64Data = image.split(",")[1] || image;

        // Strip the image property from the inventory to reduce payload size to Gemini
        const lightweightInventory = inventory.map(item => ({
            id: item.id,
            name: item.name,
            category: item.category,
            color: item.color,
            formality: item.formality
        }));

        const inventoryJson = JSON.stringify(lightweightInventory);

        // Construct the prompt instructing Gemini
        const prompt = `
      You are an expert fashion AI and personal stylist.
      Analyze the provided image of a person (a "selfie") and determine which clothing items they are wearing.
      
      You must select the items ONLY from this list of their digital wardrobe inventory:
      ${inventoryJson}
      
      Look for visual matches in color, style, and category. 
      Only select items you are reasonably confident they are wearing (e.g. at most 1 top, 1 bottom, 1 outerwear). Do not select duplicate categories.
      If you do not see any matching items from the inventory, return an empty array.

      Respond strictly in the following JSON format. Your entire response must be a valid JSON object. Do not wrap it in markdown block quotes (like \`\`\`json).
      
      {
        "detectedIds": ["string_id_1", "string_id_2"]
      }
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
                temperature: 0.1, // Very low temperature for maximum adherence to the provided JSON list
            },
        });

        const aiText = response.text || "{}";

        // Attempt to parse the resulting text to JSON
        const cleanedText = aiText.replace(/```json/gi, "").replace(/```/g, "").trim();

        let parsedResult;
        try {
            parsedResult = JSON.parse(cleanedText);
        } catch (parseError) {
            console.error("Failed to parse Gemini output as JSON:", cleanedText);
            return NextResponse.json({ error: "Failed to parse AI response into IDs", raw: aiText }, { status: 500 });
        }

        const detectedIds = parsedResult.detectedIds || [];

        return NextResponse.json({ detectedIds });

    } catch (error: any) {
        console.error("Error in wardrobe scan route:", error);
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
}
