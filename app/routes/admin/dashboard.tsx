import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Category,
  Tooltip,
  DataLabel,
  ColumnSeries,
  type AxisModel,
  SplineAreaSeries,
} from "@syncfusion/ej2-react-charts";
import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
} from "@syncfusion/ej2-react-grids";

import type { Route } from "../+types/dashboard";
import { getAllUsers, getUser } from "~/appwrite/auth";
import { Header, StatsCard, TripCard } from "~/components";
import {
  getTripsByTravelStyle,
  getUserGrowthPerDay,
  getUsersAndTripsStats,
} from "~/appwrite/dashboard";
import { getAllTrips } from "~/appwrite/trips";
import { parseTripData } from "~/lib/utils";

export async function clientLoader() {
  const [
    user,
    dashboardStats,
    trips,
    userGrowth,
    tripsByTravelStyle,
    allUsers,
  ] = await Promise.all([
    getUser(),
    getUsersAndTripsStats(),
    getAllTrips(4, 0),
    getUserGrowthPerDay(),
    getTripsByTravelStyle(),
    getAllUsers(4, 0),
  ]);

  const allTrips = trips.allTrips.map((trip) => {
    const tripData = parseTripData(trip.tripDetail);
    return {
      id: trip.$id,
      ...tripData,
      imageUrls: trip.imageUrls ?? [],
    };
  });
  const mappedUsers: UsersItineraryCount[] = allUsers.users.map((user) => ({
    imageUrl: user.imageUrl,
    name: user.name,
    count: user.itineraryCount,
  }));

  return {
    user,
    dashboardStats,
    allTrips,
    userGrowth,
    tripsByTravelStyle,
    allUsers: mappedUsers,
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
  const userGrowth = loaderData.userGrowth;
  const tripsByTravelStyle = loaderData.tripsByTravelStyle;
  const allUsers = loaderData.allUsers;
  const trips = allTrips.map((trip) => ({
    imageUrl: trip.imageUrls[0],
    name: trip.name,
    interest: trip.interests,
  }));

  const userXAxis: AxisModel = { valueType: "Category", title: "Day" };
  const useryAxis: AxisModel = {
    minimum: 0,
    maximum: 10,
    interval: 2,
    title: "Count",
  };
  const tripXAxis: AxisModel = {
    valueType: "Category",
    title: "Travel Styles",
    majorGridLines: { width: 0 },
  };
  const tripyAxis: AxisModel = {
    minimum: 0,
    maximum: 10,
    interval: 2,
    title: "Count",
  };

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
          <h1 className="text-xl font-semibold text-dark-100">Trips</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7">
            {allTrips.map((trip) => (
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
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <ChartComponent
            id="chart-1"
            primaryXAxis={userXAxis}
            primaryYAxis={useryAxis}
            title="User Growth"
            tooltip={{ enable: true }}
          >
            <Inject
              services={[
                ColumnSeries,
                SplineAreaSeries,
                Category,
                DataLabel,
                Tooltip,
              ]}
            />
            <SeriesCollectionDirective>
              <SeriesDirective
                dataSource={userGrowth}
                xName="day"
                yName="count"
                type="Column"
                name="Column"
                fill="#4784EE"
                columnWidth={0.3}
                cornerRadius={{ topLeft: 10, topRight: 10 }}
              ></SeriesDirective>
              <SeriesDirective
                dataSource={userGrowth}
                xName="day"
                yName="count"
                type="SplineArea"
                name="Wave"
                fill="rgba(71, 132, 238, 0.3)"
                border={{ width: 2, color: "#4784EE" }}
              ></SeriesDirective>
            </SeriesCollectionDirective>
          </ChartComponent>

          <ChartComponent
            id="chart-2"
            primaryXAxis={tripXAxis}
            primaryYAxis={tripyAxis}
            title="Trip Trends"
            tooltip={{ enable: true }}
          >
            <Inject services={[ColumnSeries, Category, DataLabel, Tooltip]} />
            <SeriesCollectionDirective>
              <SeriesDirective
                dataSource={tripsByTravelStyle}
                xName="travelStyle"
                yName="count"
                type="Column"
                name="day"
                fill="#4A3AFF"
                cornerRadius={{ topLeft: 10, topRight: 10 }}
                columnWidth={0.3}
              ></SeriesDirective>
            </SeriesCollectionDirective>
          </ChartComponent>
        </section>
        <section className="pb-20 flex flex-col lg:flex-row gap-5 justify-between wrapper">
          {[
            {
              title: "Latest user signups",
              dataSource: allUsers,
              field: "count",
              headerText: "Itinerary Created",
            },
            {
              title: "Trips based on interest",
              dataSource: trips,
              field: "interest",
              headerText: "Interests",
            },
          ].map(({ title, dataSource, field, headerText }, idx) => (
            <div key={idx} className="flex flex-col gap-5">
              <h1 className="p-20-semibold text-dark-100">{title}</h1>
              <GridComponent dataSource={dataSource} gridLines="None">
                <ColumnsDirective>
                  <ColumnDirective
                    field="name"
                    headerText="Name"
                    width="200"
                    textAlign="Left"
                    template={(props: { imageUrl: string; name: string }) => (
                      <div className="flex items-center gap-1.5 px-4">
                        <img
                          src={props.imageUrl}
                          alt="User"
                          className="rounded-full size-8 aspect-square"
                        />
                        <span>{props.name}</span>
                      </div>
                    )}
                  />
                  <ColumnDirective
                    field={field}
                    headerText={headerText}
                    width="150"
                    textAlign="Left"
                  />
                </ColumnsDirective>
              </GridComponent>
            </div>
          ))}
        </section>
      </section>
    </main>
  );
};

export default Dashboard;
