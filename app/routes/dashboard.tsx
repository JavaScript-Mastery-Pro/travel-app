import type { Route } from "./+types/dashboard";
import { getUser } from "~/appwrite/auth";
import { Header, StatsCard, TripCard } from "~/components";
import { getUsersAndTripsStats } from "~/appwrite/dashboard";
import { getAllTrips } from "~/appwrite/trips";
import { parseTripData } from "~/lib/utils";

export async function clientLoader() {
  const [user, dashboardStats, trips] = await Promise.all([
    getUser(),
    getUsersAndTripsStats(),
    getAllTrips(),
  ]);

  // Flatten trip data and map legacy keys to our new model.
  const allTrips = trips.map((trip) => {
    const tripData = parseTripData(trip.tripDetail);
    return {
      id: trip.$id,
      ...tripData,
      imageUrls: trip.imageUrls ?? [],
    };
  });

  return {
    user,
    dashboardStats,
    allTrips,
  };
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Travel App" },
    { name: "description", content: "Welcome to Travel App" },
  ];
}

const Dashboard = ({ loaderData }: Route.ComponentProps) => {
  const user = loaderData.user as User | null;
  const dashboardStats = loaderData.dashboardStats as DashboardStats;
  const allTrips = loaderData.allTrips as Trip[];

  return (
    <main className="flex flex-col gap-10 w-full wrapper pb-20">
      <Header
        title={`Welcome ${user?.name ?? "Guest"} 👋`}
        description="Track activity, trends, and popular destinations in real time"
        ctaText="Create a trip"
        ctaUrl="/trips/create"
      />
      <section className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <StatsCard
            headerTitle="Total Users"
            total={dashboardStats.totalUsers}
            currentMonthCount={dashboardStats.usersJoined.currentMonth}
            lastMonthCount={dashboardStats.usersJoined.lastMonth}
          />
          <StatsCard
            headerTitle="Total Trips"
            total={dashboardStats.totalTrips}
            currentMonthCount={dashboardStats.tripsCreated.currentMonth}
            lastMonthCount={dashboardStats.tripsCreated.lastMonth}
          />
          <StatsCard
            headerTitle="Active Users Today"
            total={dashboardStats.userRole.total}
            currentMonthCount={dashboardStats.userRole.currentMonth}
            lastMonthCount={dashboardStats.userRole.lastMonth}
          />
        </div>
        <section className="flex flex-col gap-5 mt-2.5">
          <h1 className="text-xl font-semibold text-dark-100">
            Created Itineraries
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7">
            {allTrips.slice(0, 4).map((trip) => (
              <TripCard
                key={trip.id}
                id={trip.id}
                name={trip.name}
                imageUrl={trip.imageUrls[0]}
                location={trip.itinerary?.[0]?.location ?? ""}
                tags={[trip.interests, trip.travelStyle]}
                price={trip.estimatedPrice}
              />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
};

export default Dashboard;
