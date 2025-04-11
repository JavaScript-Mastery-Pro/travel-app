import { database } from "./client";
import { appwriteConfig } from "./config";

interface Document {
  [key: string]: any;
}

type FilterByDate = (
  items: Document[],
  key: string,
  start: string,
  end?: string
) => number;

export const getUsersAndTripsStats = async (): Promise<DashboardStats> => {
  const now = new Date(),
    [currentMonth, currentYear] = [now.getMonth(), now.getFullYear()],
    [prevMonth, prevYear] =
      currentMonth === 0
        ? [11, currentYear - 1]
        : [currentMonth - 1, currentYear],
    [startCurr, startPrev, endPrev] = [
      new Date(currentYear, currentMonth, 1),
      new Date(prevYear, prevMonth, 1),
      new Date(currentYear, currentMonth, 0),
    ].map((d) => d.toISOString());

  const [users, trips] = await Promise.all([
    database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId
    ),
    database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.itineraryCollectionId
    ),
  ]);

  const filterByDate: FilterByDate = (items, key, start, end) =>
    items.filter(
      (item: Document) => item[key] >= start && (!end || item[key] <= end)
    ).length;

  const filterUsersByRole = (role: string) =>
    users.documents.filter((u: Document) => u.status === role);

  return {
    totalUsers: users.total,
    usersJoined: {
      currentMonth: filterByDate(
        users.documents,
        "joinedAt",
        startCurr,
        undefined
      ),
      lastMonth: filterByDate(users.documents, "joinedAt", startPrev, endPrev),
    },
    userRole: {
      total: filterUsersByRole("user").length,
      currentMonth: filterByDate(
        filterUsersByRole("user"),
        "joinedAt",
        startCurr,
        undefined
      ),
      lastMonth: filterByDate(
        filterUsersByRole("user"),
        "joinedAt",
        startPrev,
        endPrev
      ),
    },
    totalTrips: trips.total,
    tripsCreated: {
      currentMonth: filterByDate(
        trips.documents,
        "createdAt",
        startCurr,
        undefined
      ),
      lastMonth: filterByDate(trips.documents, "createdAt", startPrev, endPrev),
    },
  };
};
