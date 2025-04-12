import { getAllTrips } from "~/appwrite/trips";
import { Header, TripCard } from "~/components";
import { parseTripData } from "~/lib/utils";
import type { Route } from "./+types/trips";

export function meta() {
  return [
    { title: "All Trips" },
    { name: "description", content: "Explore Your Favorite Trip" },
  ];
}

export async function loader() {
  return (await getAllTrips()).map(({ $id, tripDetail, imageUrls }) => ({
    id: $id,
    tripData: parseTripData(tripDetail),
    imageUrls: imageUrls ?? [],
  }));
}

const Trips = ({ loaderData }: Route.ComponentProps) => {
  const trips = loaderData;
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
          {trips.map(({ id, tripData, imageUrls }) => (
            <TripCard
              key={id}
              id={id}
              name={tripData?.name ?? ""}
              imageUrl={imageUrls[0]}
              location={tripData?.itinerary?.[0]?.location ?? ""}
              tags={[tripData?.interests ?? "", tripData?.travelStyle ?? ""]}
              price={tripData?.estimatedPrice ?? ""}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Trips;
