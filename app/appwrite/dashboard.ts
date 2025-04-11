import { Query } from "appwrite";
import { database } from "./client";
import { appwriteConfig } from "./config";

export const getUsersAndTripsStats = async () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const previousMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  const startOfCurrentMonth = new Date(
    currentYear,
    currentMonth,
    1
  ).toISOString();
  const startOfPreviousMonth = new Date(
    previousMonthYear,
    previousMonth,
    1
  ).toISOString();
  const endOfPreviousMonth = new Date(
    currentYear,
    currentMonth,
    0
  ).toISOString();

  // Fetch all users
  const users = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId
  );

  // Total users count
  const totalUsers = users.total;

  // Users joined this month count
  const usersJoinedThisMonth = users.documents.filter(
    (user) => user.joinedAt >= startOfCurrentMonth
  ).length;

  // Users joined last month count
  const usersJoinedLastMonth = users.documents.filter(
    (user) =>
      user.joinedAt >= startOfPreviousMonth &&
      user.joinedAt <= endOfPreviousMonth
  ).length;

  // Users with role "user" count
  const usersWithRoleUser = users.documents.filter(
    (user) => user.status === "user"
  ).length;

  // Users with role "user" joined this month
  const usersWithRoleUserThisMonth = users.documents.filter(
    (user) => user.status === "user" && user.joinedAt >= startOfCurrentMonth
  ).length;

  // Users with role "user" joined last month
  const usersWithRoleUserLastMonth = users.documents.filter(
    (user) =>
      user.status === "user" &&
      user.joinedAt >= startOfPreviousMonth &&
      user.joinedAt <= endOfPreviousMonth
  ).length;

  // Fetch all trips
  const trips = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.itineraryCollectionId
  );

  // Total trips count
  const totalTrips = trips.total;

  // Trips created this month count
  const tripsCreatedThisMonth = trips.documents.filter(
    (trip) => trip.createdAt >= startOfCurrentMonth
  ).length;

  // Trips created last month count
  const tripsCreatedLastMonth = trips.documents.filter(
    (trip) =>
      trip.createdAt >= startOfPreviousMonth &&
      trip.createdAt <= endOfPreviousMonth
  ).length;

  return {
    totalUsers,
    usersJoinedThisMonth,
    usersJoinedLastMonth,
    usersWithRoleUser,
    usersWithRoleUserThisMonth,
    usersWithRoleUserLastMonth,
    totalTrips,
    tripsCreatedThisMonth,
    tripsCreatedLastMonth,
  };
};

// export const recentUsersWithItineraryCount = async () => {
//   // Fetch all users sorted by creation date in descending order
//   const users = await database.listDocuments(
//     appwriteConfig.databaseId,
//     appwriteConfig.userCollectionId,
//     [Query.orderDesc("joinedAt"), Query.limit(4)]
//   );

//   // Fetch itineraries for each user and count them
//   const usersWithItineraryCount = await Promise.all(
//     users.documents.map(async (user) => {
//       const itineraries = await database.listDocuments(
//         appwriteConfig.databaseId,
//         appwriteConfig.itineraryCollectionId,
//         [Query.equal("userId", user.$id)]
//       );

//       return {
//         user,
//         itineraryCount: itineraries.total,
//       };
//     })
//   );

//   return usersWithItineraryCount;
// };
