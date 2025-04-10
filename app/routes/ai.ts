import { GoogleGenerativeAI } from "@google/generative-ai";
import { database } from "~/appwrite/client";
import { appwriteConfig } from "~/appwrite/config";
import { ID } from "appwrite";
import { parseMarkdownToJson } from "~/lib/utils";
import { data, type ActionFunctionArgs } from "react-router";

export async function action({ request }: ActionFunctionArgs) {
  const { country, numberOfDays, travelStyle, interests, budget, groupType } =
    await request.json();
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

  try {
    const textModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `Generate a ${numberOfDays}-day travel itinerary for ${country} based on the following user information:
    Budget: '${budget}'
    Interests: '${interests}'
    Travel Style: '${travelStyle}'
    Group Type: '${groupType}'
    Return the itinerary and lowest estimated price in a clean, non-markdown JSON format with the following structure:
    {
    "trip_name": "A descriptive title for the trip",
    "estimated_price": "Lowest average price for the trip in USD, e.g.$price",
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

    const unsplashApiKey = process.env.UNSPLASH_ACCESS_KEY!;
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

    return data({ id: result.$id });
  } catch (error) {
    console.error("Error generating travel plan:", error);
    return null;
  }
}
