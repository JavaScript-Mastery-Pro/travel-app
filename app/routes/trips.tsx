import { getAllTrips } from "~/appwrite/trips";
import { Header, TripCard } from "~/components";
import type { Route } from "./+types/trips";
import { parseTripData } from "~/lib/utils";

export async function loader() {
  const allTrips = await getAllTrips();
  if (allTrips.length === 0) {
    return { trips: [] };
  }
  const trips = allTrips.map((trip) => ({
    tripDetail: parseTripData(trip.tripDetail),
    imageUrls: trip.imageUrls || [],
    interest: trip.interest,
    $id: trip.$id,
    travelStyle: trip.travelStyles,
    groupType: trip.groupType,
  }));
  return trips;
}

export default function Trips({ loaderData }: Route.ComponentProps) {
  const allTrips = Array.isArray(loaderData) ? loaderData : loaderData.trips;
  console.log(allTrips);
  return (
    <main className="flex flex-col gap-10 pb-20 wrapper">
      <Header
        title="Trips"
        description="View and edit AI-generated travel plans"
        ctaText="Create a trip"
        ctaUrl="/trips/create"
      />
      <section className="flex flex-col gap-5 mt-2.5">
        <h1 className="p-24-semibold text-dark-100">Manage Created Trips</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {allTrips.map((trip) => (
            <TripCard
              key={trip.$id}
              id={trip.$id}
              tripName={trip.tripDetail?.trip_name ?? ""}
              imageUrl={trip.imageUrls[0]}
              location={trip.tripDetail?.itinerary[0].location ?? ""}
              tags={[trip.interest, trip.travelStyle]}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
