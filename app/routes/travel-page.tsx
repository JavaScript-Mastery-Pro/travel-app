import { Link } from "react-router";
import { getUser } from "~/appwrite/auth";
import type { Route } from "./+types/travel-page";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { Header, TripCard } from "~/components";
import { getAllTrips } from "~/appwrite/trips";
import { parseTripData } from "~/lib/utils";

export async function clientLoader() {
  const [user, trips] = await Promise.all([getUser(), getAllTrips()]);
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
    allTrips,
  };
}

const TravelPage = ({ loaderData }: Route.ComponentProps) => {
  const trips = loaderData.allTrips as Trip[];
  return (
    <main className="flex flex-col ">
      <section className="bg-hero bg-origin-content bg-cover">
        <div className="flex flex-col bg-linear100 bg-cover">
          <section className="wrapper pt-44 pb-36 justify-center items-start flex flex-col gap-6 ">
            <article className="flex flex-col w-full md:max-w-[520px] gap-3.5">
              <h1 className="p-72-bold text-dark-100">
                Plan Your Trip with Ease
              </h1>
              <p className="text-lg font-normal text-dark-400">
                Customize your travel itinerary in minutes—pick your
                destination, set your preferences, and explore with confidence.
              </p>
            </article>
            <Link to="#trips">
              <ButtonComponent
                type="button"
                className="buttonClass !h-11 !w-full md:!w-[240px]"
              >
                <span className="p-16-semibold text-white ">Get Started</span>
              </ButtonComponent>
            </Link>
          </section>
        </div>
      </section>
      <section className="pt-20 wrapper flex flex-col gap-10">
        <Header
          title="Featured Travel Destinations"
          description="Check out some of the best places you can visit around the world."
        />
      </section>
      <section id="trips" className="py-20 wrapper flex flex-col gap-10">
        <Header
          title="Handpicked Trips"
          description="Browse well-planned trips designed for different travel styles and interests"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7">
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
      </section>
    </main>
  );
};

export default TravelPage;
