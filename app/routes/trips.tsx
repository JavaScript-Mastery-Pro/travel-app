import { getAllTrips } from "~/appwrite/trips";
import { Header, TripCard } from "~/components";
import type { Route } from "./+types/trips";
import { parseTripData } from "~/lib/utils";
import { useLoaderData } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "All Trips" },
    { name: "description", content: "Explore Your Favorite Trip" },
  ];
}

export async function loader() {
  const allTrips = await getAllTrips();

  const trips = allTrips.map((trip) => {
    const tripData = parseTripData(trip.tripDetail);

    return {
      id: trip.$id,
      ...tripData,
      imageUrls: trip.imageUrls ?? [],
    };
  });
  return { trips };
}

const Trips = () => {
  const { trips } = useLoaderData();

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
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-7">
          {trips.map((trip: Trip) => (
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
    </main>
  );
};

export default Trips;
