import { GoogleGenerativeAI } from "@google/generative-ai";
import { parseMarkdownToJson } from "./utils";
import { database } from "~/appwrite/client";
import { appwriteConfig } from "~/appwrite/config";
import { ID } from "appwrite";

export const generateTravelPlan = async (
  country: string,
  numberOfDays: number,
  travelStyle: string,
  interests: string,
  budget: string,
  groupType: string
) => {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  try {
    const textModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `Generate a ${numberOfDays}-day travel itinerary for ${country} based on the following user information:
Budget: '${budget}'
Interests: '${interests}'
Travel Style: '${travelStyle}'
Group Type: '${groupType}'
Return the itinerary in a clean, non-markdown JSON format with the following structure:
{
  "trip_name": "A descriptive title for the trip",
  "duration": ${numberOfDays},
  "budget": "${budget}",
  "travel_style": "${travelStyle}",
  "interests": ["interest1", "interest2", ...],
  "itinerary": [
    {
      "day": 1,
      "location": "City/Region Name",
      "activities": [
        {"time": "Morning", "description": "Detailed activity description"},
        {"time": "Afternoon", "description": "Detailed activity description"},
        {"time": "Evening", "description": "Detailed activity description"}
      ]
    },
    ...
  ]
}`;

    const textResult = await textModel.generateContent([prompt]);
    const textResponse = textResult.response.text();
    const itinerary = parseMarkdownToJson(textResponse);

    // Fetch images from Unsplash
    const unsplashApiKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
    const unsplashUrl = `https://api.unsplash.com/search/photos?query=${country} ${interests} ${travelStyle}&client_id=${unsplashApiKey}`;

    const imageResponse = await fetch(unsplashUrl);
    const imageData = await imageResponse.json();
    const imageUrls = imageData.results
      .slice(0, 3)
      .map((result: any) => result.urls?.regular || null);

    const result = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.itineraryCollectionId,
      ID.unique(),
      {
        interest: interests,
        budget: budget,
        travelStyles: travelStyle,
        groupType: groupType,
        imageUrls: imageUrls,
        tripDetail: JSON.stringify(itinerary),
      }
    );

    return {
      id: result.$id,
    };
  } catch (error) {
    console.error("Error generating travel plan:", error);
    return null;
  }
};
