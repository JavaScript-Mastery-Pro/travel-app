import { Query } from "appwrite";
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
// [
//     Query.select([
//       "interest",
//       "$id",
//       "travelStyles",
//       "budget",
//       "groupType",
//       "tripDetail",
//       "imageUrls",
//       "owner",
//     ]),
// ]
