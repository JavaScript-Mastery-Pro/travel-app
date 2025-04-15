import { getAllTrips } from "~/appwrite/trips";
import { Header, TripCard } from "~/components";
import { parseTripData } from "~/lib/utils";
import type { Route } from "../+types/trips";
import { PagerComponent } from "@syncfusion/ej2-react-grids";
import { useState } from "react";
import type { LoaderFunctionArgs } from "react-router";

export function meta() {
  return [
    { title: "All Trips" },
    { name: "description", content: "Explore Your Favorite Trip" },
  ];
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = 8;
  const offset = (page - 1) * limit;

  const { allTrips, total } = await getAllTrips(limit, offset);

  return {
    trips: allTrips.map(({ $id, tripDetail, imageUrls }) => ({
      id: $id,
      ...parseTripData(tripDetail),
      imageUrls: imageUrls ?? [],
    })),
    total,
  };
}

const Trips = ({ loaderData }: Route.ComponentProps) => {
  const trips = loaderData.trips as Trip[] | [];
  const url = new URL(window.location.href);
  const initialPage = parseInt(url.searchParams.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.location.search = `?page=${page}`;
  };

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
          {trips.map((trip) => (
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
        <PagerComponent
          totalRecordsCount={loaderData.total}
          pageSize={8}
          currentPage={currentPage}
          click={(args) => handlePageChange(args.currentPage)}
        />
      </section>
    </main>
  );
};

export default Trips;
