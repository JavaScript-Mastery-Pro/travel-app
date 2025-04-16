import { useState } from "react";
import { Link, useSearchParams, type LoaderFunctionArgs } from "react-router";
import { getAllUsers, getUser } from "~/appwrite/auth";
import { PagerComponent } from "@syncfusion/ej2-react-grids";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";

import { Header, TripCard } from "~/components";
import { getAllTrips } from "~/appwrite/trips";
import { cn, parseTripData } from "~/lib/utils";
import type { Route } from "./+types/travel-page";
import { footers } from "~/constants";

export async function clientLoader({ request }: LoaderFunctionArgs) {
  const limit = 8;

  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const offset = (page - 1) * limit;

  const [user, trips] = await Promise.all([
    getUser(),
    getAllTrips(limit, offset),
    getAllUsers(4, 0),
  ]);

  return {
    user,
    allTrips: trips.allTrips.map(({ $id, tripDetail, imageUrls }) => ({
      id: $id,
      ...parseTripData(tripDetail),
      imageUrls: imageUrls ?? [],
    })),
    total: trips.total,
  };
}

const FeaturedDestination = ({
  containerClass = "",
  bigCard = false,
  rating,
  title,
  activityCount,
  bgImage,
}: DestinationProps) => (
  <section
    className={cn(
      "rounded-[14px] overflow-hidden bg-cover bg-center size-full min-w-[280px]",
      containerClass,
      bgImage
    )}
  >
    <div className="bg-linear200 h-full">
      <article className="featured-card">
        <div
          className={cn(
            "bg-white rounded-20 font-bold text-red-100 w-fit py-px px-3 text-sm ",
            {
              "px-5 py-[2px] text-base": bigCard,
            }
          )}
        >
          {rating}
        </div>

        <article className="flex flex-col gap-3.5">
          <h2
            className={cn("text-lg font-semibold text-white", {
              "p-30-bold": bigCard,
            })}
          >
            {title}
          </h2>

          <figure className="flex gap-2 items-center">
            <img
              src="/assets/images/david.webp"
              alt="user"
              className={cn("size-4 rounded-full aspect-square", {
                "size-11": bigCard,
              })}
            />
            <p
              className={cn("text-xs font-normal text-white", {
                "text-lg": bigCard,
              })}
            >
              {activityCount} activities
            </p>
          </figure>
        </article>
      </article>
    </div>
  </section>
);

const TravelPage = ({ loaderData }: Route.ComponentProps) => {
  const allTrips = loaderData.allTrips as Trip[];

  const [searchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get("page") || "1", 10);

  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.location.search = `?page=${page}`;
  };

  return (
    <main className="flex flex-col">
      <section className="travel-hero">
        <div>
          <section className="wrapper">
            <article>
              <h1 className="p-72-bold text-dark-100">
                Plan Your Trip with Ease
              </h1>

              <p>
                Customize your travel itinerary in minutes—pick your
                destination, set your preferences, and explore with confidence.
              </p>
            </article>

            <Link to="#trips">
              <ButtonComponent
                type="button"
                className="button-class !h-11 !w-full md:!w-[240px]"
              >
                <span className="p-16-semibold text-white">Get Started</span>
              </ButtonComponent>
            </Link>
          </section>
        </div>
      </section>

      <section className="pt-20 wrapper flex flex-col gap-10 h-full">
        <Header
          title="Featured Travel Destinations"
          description="Check out some of the best places you can visit around the world."
        />

        <div className="featured">
          <article>
            <FeaturedDestination
              bgImage="bg-card-1"
              containerClass="h-1/3 lg:h-1/2"
              bigCard
              title="Barcelona Tour"
              rating={3.5}
              activityCount={196}
            />

            <div className="travel-featured">
              <FeaturedDestination
                bigCard
                bgImage="bg-card-2"
                title="London, United States"
                rating={4.5}
                activityCount={310}
              />
              <FeaturedDestination
                bigCard
                bgImage="bg-card-3"
                title="Australia Tour"
                rating={4.0}
                activityCount={250}
              />
            </div>
          </article>

          <div className="flex flex-col gap-[30px]">
            <FeaturedDestination
              containerClass="w-full h-[240px]"
              bgImage={`bg-card-4`}
              title="Spain Tour"
              rating={3.8}
              activityCount={150}
            />

            <FeaturedDestination
              containerClass="w-full h-[240px]"
              bgImage={`bg-card-5`}
              title="Japan Tour"
              rating={4.0}
              activityCount={200}
            />

            <FeaturedDestination
              containerClass="w-full h-[240px]"
              bgImage={`bg-card-6`}
              title="Italy Tour"
              rating={3.2}
              activityCount={130}
            />
          </div>
        </div>
      </section>

      <section id="trips" className="py-20 wrapper flex flex-col gap-10">
        <Header
          title="Handpicked Trips"
          description="Browse well-planned trips designed for different travel styles and interests"
        />

        <div className="trip-grid">
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

        <PagerComponent
          totalRecordsCount={loaderData.total}
          pageSize={8}
          currentPage={currentPage}
          click={(args) => handlePageChange(args.currentPage)}
        />
      </section>

      <footer className="h-28 bg-white">
        <div className="wrapper footer-container">
          <Link to="/">
            <img
              src="/assets/icons/logo.svg"
              alt="Logo"
              className="size-[30px]"
            />
            <h1>Tourvisto</h1>
          </Link>

          <div>
            {footers.map((item) => (
              <Link to="/" key={item}>
                {item}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
};

export default TravelPage;
