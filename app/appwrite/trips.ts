import { database } from "./client";
import { appwriteConfig } from "./config";

export const getAllTrips = async () => {
  const allTrips = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.itineraryCollectionId
  );
  if (allTrips.total === 0) {
    console.error("No trips found");
    return [];
  }
  return allTrips.documents;
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
