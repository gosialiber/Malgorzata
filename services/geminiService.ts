
import { GoogleGenAI, Type } from "@google/genai";
import { Recipe } from "../types";

export const generateRecipe = async (dishName: string): Promise<Recipe> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate a detailed, delicious recipe for: ${dishName}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          recipeName: { type: Type.STRING },
          description: { type: Type.STRING },
          prepTime: { type: Type.STRING },
          cookTime: { type: Type.STRING },
          servings: { type: Type.NUMBER },
          difficulty: { type: Type.STRING, enum: ['Easy', 'Medium', 'Hard'] },
          ingredients: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                item: { type: Type.STRING },
                amount: { type: Type.STRING },
                unit: { type: Type.STRING },
              },
              required: ['item', 'amount', 'unit']
            }
          },
          instructions: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          nutritionalInfo: {
            type: Type.OBJECT,
            properties: {
              calories: { type: Type.STRING },
              protein: { type: Type.STRING },
              carbs: { type: Type.STRING },
              fat: { type: Type.STRING },
            },
            required: ['calories', 'protein', 'carbs', 'fat']
          }
        },
        required: ['recipeName', 'description', 'prepTime', 'cookTime', 'servings', 'ingredients', 'instructions', 'nutritionalInfo', 'difficulty']
      }
    }
  });

  const jsonStr = response.text || '{}';
  return JSON.parse(jsonStr) as Recipe;
};
