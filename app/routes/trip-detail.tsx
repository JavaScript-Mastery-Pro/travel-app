import type { LoaderFunctionArgs } from "react-router";
import { getTripById } from "~/appwrite/trips";
import { Header } from "~/components";
import type { Route } from "./+types/trip-detail";
import { parseTripData } from "~/lib/utils";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Trip Detail" },
    { name: "description", content: "Trip Details" },
  ];
}
export async function loader({ params }: LoaderFunctionArgs) {
  const tripId = params.tripId;
  if (!tripId) {
    throw new Error("Trip ID is required");
  }
  const trip = await getTripById(tripId);
  return trip;
}

export default function TripDetail({ loaderData }: Route.ComponentProps) {
  const trip = loaderData;
  const tripDetail = parseTripData(trip?.tripDetail);
  console.log("tripDetail", tripDetail);
  return (
    <main className="flex flex-col gap-10 pb-20 wrapper">
      <Header
        title="Trips"
        description="View and edit AI-generated travel plans"
      />
      <section className="flex flex-col gap-5 mt-2.5 wrapper-md">
        <h1 className="p-40-semibold text-dark-100">{tripDetail?.trip_name}</h1>
      </section>
    </main>
  );
}
