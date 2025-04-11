import { GoogleGenerativeAI } from "@google/generative-ai";
import { database } from "~/appwrite/client";
import { appwriteConfig } from "~/appwrite/config";
import { ID } from "appwrite";
import { parseMarkdownToJson } from "~/lib/utils";
import { data, type ActionFunctionArgs } from "react-router";
import { createProduct } from "~/lib/stripe";
import { parseTripData } from "~/lib/utils";

export async function action({ request }: ActionFunctionArgs) {
  const { country, numberOfDays, travelStyle, interests, budget, groupType } =
    await request.json();

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const unsplashApiKey = process.env.UNSPLASH_ACCESS_KEY!;

  try {
    const prompt = `Generate a ${numberOfDays}-day travel itinerary for ${country} based on the following user information:
    Budget: '${budget}'
    Interests: '${interests}'
    Travel Style: '${travelStyle}'
    Group Type: '${groupType}'
    Return the itinerary and lowest estimated price in a clean, non-markdown JSON format with the following structure:
    {
    "trip_name": "A descriptive title for the trip",
    "trip_description": "A brief description of the trip and its highlights not exceeding 100 words",
    "estimated_price": "Lowest average price for the trip in USD, e.g.$price",
    "duration": ${numberOfDays},
    "budget": "${budget}",
    "travel_style": "${travelStyle}",
    "country": "${country}",
    "interests": ${interests},
    "group_type": "${groupType}",
    "best_time_to_visit": [
      '🌸 Season (from month to month): reason to visit',
      '☀️ Season (from month to month): reason to visit',
      '🍁 Season (from month to month): reason to visit',
      '❄️ Season (from month to month): reason to visit'
    ],
    "weather_info": [
      '☀️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
      '🌦️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
      '🌧️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
      '❄️ Season: temperature range in Celsius (temperature range in Fahrenheit)'
    ],
    "location": {
      "city": "name of the city or region",
      "coordinates": [latitude, longitude],
      "openStreetMap": "link to open street map"
    },
    "itinerary": [
    {
      "day": 1,
      "location": "City/Region Name",
      "activities": [
        {"time": "Morning", "description": "🏰 Visit the local historic castle and enjoy a scenic walk"},
        {"time": "Afternoon", "description": "🖼️ Explore a famous art museum with a guided tour"},
        {"time": "Evening", "description": "🍷 Dine at a rooftop restaurant with local wine"}
      ]
    },
    ...
    ]
    }`;

    const textResult = await genAI
      .getGenerativeModel({ model: "gemini-2.0-flash" })
      .generateContent([prompt]);

    const itinerary = parseMarkdownToJson(textResult.response.text());

    const imageResponse = await fetch(
      `https://api.unsplash.com/search/photos?query=${country} ${interests} ${travelStyle}&client_id=${unsplashApiKey}`
    );

    const imageUrls = (await imageResponse.json()).results
      .slice(0, 3)
      .map((result: any) => result.urls?.regular || null);

    const result = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.itineraryCollectionId,
      ID.unique(),
      {
        tripDetail: JSON.stringify(itinerary),
        createdAt: new Date().toISOString(),
        imageUrls,
      }
    );

    const tripData = parseTripData(result.tripDetail) as TripData;
    const tripPrice = parseInt(tripData.estimated_price.replace("$", ""), 10);
    const paymentLink = await createProduct(
      tripData.trip_name,
      tripData.trip_description,
      imageUrls,
      tripPrice,
      result.$id
    );

    // await database.updateDocument(
    //   appwriteConfig.databaseId,
    //   appwriteConfig.itineraryCollectionId,
    //   result.$id,
    //   {
    //     stripePaymentLink: paymentLink.url,
    //   }
    // );

    console.log(paymentLink);
    return data({ id: result.$id });
  } catch (error) {
    console.error("Error generating travel plan:", error);
    return null;
  }
}
