import { Query } from "appwrite";
import { database, appwriteConfig } from "./client";

export const getAllTrips = async (
  limit: number,
  offset: number
): Promise<GetAllTripsResponse> => {
  const allTrips = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.itineraryCollectionId,
    [Query.limit(limit), Query.offset(offset), Query.orderDesc("createdAt")]
  );
  if (allTrips.total === 0) {
    console.error("No trips found");
    return { allTrips: [], total: 0 };
  }
  return {
    allTrips: allTrips.documents,
    total: allTrips.total,
  };
};

export const getTripById = async (tripId: string) => {
  const trip = await database.getDocument(
    appwriteConfig.databaseId,
    appwriteConfig.itineraryCollectionId,
    tripId
  );
  if (!trip.$id) {
    console.error("Trip not found");
    return null;
  }
  return trip;
};
