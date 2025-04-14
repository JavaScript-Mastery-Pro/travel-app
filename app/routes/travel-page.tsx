import { Link } from "react-router";
import { getUser } from "~/appwrite/auth";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { Header, TripCard } from "~/components";
import { getAllTrips } from "~/appwrite/trips";
import { cn, parseTripData } from "~/lib/utils";
import type { Route } from "./+types/travel-page";

export async function clientLoader() {
  const [user, trips] = await Promise.all([getUser(), getAllTrips()]);
  return {
    user,
    allTrips: trips.map(({ $id, tripDetail, imageUrls }) => ({
      id: $id,
      ...parseTripData(tripDetail),
      imageUrls: imageUrls ?? [],
    })),
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
      "rounded-[14px]  bg-cover bg-center size-full min-w-[280px]",
      containerClass,
      bgImage
    )}
  >
    <div className="linear-gradient(39deg, rgba(3, 3, 3, 0.54) -3.66%, rgba(6, 6, 6, 0.00) 45.57%) h-full">
      <article className="flex flex-col justify-between gap-3.5 p-[30px] min-h-[230px] h-full">
        <div
          className={`bg-white rounded-20 font-bold text-red-100 w-fit ${bigCard ? "px-5 py-[2px] text-base" : "py-px px-3 text-sm"}`}
        >
          {rating}
        </div>
        <article className="flex flex-col gap-3.5">
          <h2
            className={`${bigCard && "p-30-bold"} text-lg font-semibold text-white`}
          >
            {title}
          </h2>
          <figure className="flex gap-2 items-center">
            <img
              src="/assets/images/david.webp"
              alt="user"
              className={`${bigCard && "size-11"} size-4 rounded-full`}
            />
            <p
              className={`${bigCard ? "text-lg" : "text-xs"} font-normal text-white`}
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
  return (
    <main className="flex flex-col">
      <section className="bg-hero bg-origin-content bg-cover">
        <div className="flex flex-col bg-linear100 bg-cover">
          <section className="wrapper py-48 justify-center items-start flex flex-col gap-6">
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
        <div className="flex flex-col md:flex-row gap-[30px]">
          <article className="flex flex-col gap-[30px] w-full">
            <FeaturedDestination
              bgImage="bg-[url('/assets/images/card-img-1.png')]"
              containerClass="h-1/3 lg:h-1/2"
              bigCard
              title="Barcelona Tour"
              rating={3.5}
              activityCount={196}
            />
            <div className="flex flex-col lg:flex-row gap-[30px] h-2/3 lg:h-1/2">
              <FeaturedDestination
                bigCard
                bgImage="bg-[url('/assets/images/card-img-2.png')]"
                title="London, United States"
                rating={4.5}
                activityCount={310}
              />
              <FeaturedDestination
                bigCard
                bgImage="bg-[url('/assets/images/card-img-3.png')]"
                title="Australia Tour"
                rating={4.0}
                activityCount={250}
              />
            </div>
          </article>
          <div className="flex flex-col gap-[30px]">
            <FeaturedDestination
              containerClass="w-full h-[240px]"
              bgImage={`bg-[url('/assets/images/card-img-4.png')]`}
              title="Spain Tour"
              rating={3.8}
              activityCount={150}
            />
            <FeaturedDestination
              containerClass="w-full h-[240px]"
              bgImage={`bg-[url('/assets/images/card-img-5.png')]`}
              title="Japan Tour"
              rating={4.0}
              activityCount={200}
            />
            <FeaturedDestination
              containerClass="w-full h-[240px]"
              bgImage={`bg-[url('/assets/images/card-img-6.png')]`}
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
    </main>
  );
};

export default TravelPage;
