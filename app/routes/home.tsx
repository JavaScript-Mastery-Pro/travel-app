import type { Route } from "./+types/home";
import { getUser } from "~/appwrite/auth";
import { Header, StatsCard, TripCard } from "~/components";
import { getUsersAndTripsStats } from "~/appwrite/dashboard";
import { getAllTrips } from "~/appwrite/trips";
import { parseTripData } from "~/lib/utils";

// for loader reference link: https://reactrouter.com/start/framework/data-loading
export async function clientLoader() {
  const [user, dashboardStats, trips] = await Promise.all([
    getUser(),
    getUsersAndTripsStats(),
    getAllTrips(),
  ]);
  const allTrips = trips.map((trip) => ({
    tripDetail: parseTripData(trip.tripDetail),
    imageUrls: trip.imageUrls || [],
    $id: trip.$id,
  }));
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

const Home = ({ loaderData }: Route.ComponentProps) => {
  const user = loaderData.user as User | null;
  const dashboardStats = loaderData.dashboardStats as DashboardStats;
  const allTrips = Array.isArray(loaderData) ? loaderData : loaderData.allTrips;

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
            total={dashboardStats?.totalUsers}
            thisMonthCount={dashboardStats.usersJoinedThisMonth}
            lastMonthCount={dashboardStats.usersJoinedLastMonth}
          />
          <StatsCard
            headerTitle="Total Trips"
            total={dashboardStats?.totalTrips}
            thisMonthCount={dashboardStats.tripsCreatedThisMonth}
            lastMonthCount={dashboardStats.tripsCreatedLastMonth}
          />
          <StatsCard
            headerTitle="Active Users Today"
            total={dashboardStats?.usersWithRoleUser}
            thisMonthCount={dashboardStats.usersWithRoleUserThisMonth}
            lastMonthCount={dashboardStats.usersWithRoleUserLastMonth}
          />
        </div>
        <section className="flex flex-col gap-5 mt-2.5">
          <h1 className="text-xl font-semibold text-dark-100">
            Created Itineraries
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7">
            {allTrips.slice(0, 4).map((trip) => (
              <TripCard
                key={trip.$id}
                id={trip.$id}
                tripName={trip.tripDetail?.trip_name ?? ""}
                imageUrl={trip.imageUrls[0]}
                location={trip.tripDetail?.itinerary[0].location ?? ""}
                tags={[
                  trip.tripDetail?.interests ?? "",
                  trip.tripDetail?.travel_style ?? "",
                ]}
                price={trip.tripDetail?.estimated_price ?? ""}
              />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
};

export default Home;
