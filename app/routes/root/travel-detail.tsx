import { Link, type LoaderFunctionArgs } from "react-router";
import {
  ButtonComponent,
  ChipDirective,
  ChipListComponent,
  ChipsDirective,
} from "@syncfusion/ej2-react-buttons";

import { getAllTrips, getTripById } from "~/appwrite/trips";
import type { Route } from "./+types/travel-detail";
import { cn, getFirstWord, parseTripData } from "~/lib/utils";
import { InfoPill, TripCard } from "~/components";

export function meta() {
  return [
    { title: "Travel Detail" },
    { name: "description", content: "Trip Details" },
  ];
}

export async function loader({ params }: LoaderFunctionArgs) {
  const tripId = params.tripId;
  if (!tripId) throw new Error("Trip ID is required");

  const [trip, trips] = await Promise.all([
    getTripById(tripId),
    getAllTrips(4, 0),
  ]);

  return {
    trip,
    allTrips: trips.allTrips.map(({ $id, tripDetail, imageUrls }) => ({
      id: $id,
      ...parseTripData(tripDetail),
      imageUrls: imageUrls ?? [],
    })),
  };
}

const TravelDetail = ({ loaderData }: Route.ComponentProps) => {
  const imageUrls = loaderData?.trip?.imageUrls || [];

  const tripData = parseTripData(loaderData?.trip?.tripDetail);

  const paymentLink = loaderData?.trip?.payment_link;
  const {
    name,
    duration,
    itinerary,
    travelStyle,
    groupType,
    budget,
    interests,
    estimatedPrice,
    description,
    bestTimeToVisit,
    weatherInfo,
    country,
  } = tripData || {};
  const allTrips = loaderData.allTrips as Trip[] | [];

  const pillItems = [
    { text: travelStyle, bg: "!bg-pink-50 !text-pink-500" },
    { text: groupType, bg: "!bg-primary-50 !text-primary-500" },
    { text: budget, bg: "!bg-success-50 !text-success-700" },
    { text: interests, bg: "!bg-navy-50 !text-navy-500" },
  ];

  const visitTimeAndWeatherInfo = [
    { title: "Best Time to Visit:", items: bestTimeToVisit },
    { title: "Weather Info:", items: weatherInfo },
  ];

  return (
    <main className="travel-detail pt-40 wrapper">
      <div className="travel-div">
        <Link to="/" className="back-link">
          <img src="/assets/icons/arrow-left.svg" alt="back icon" />
          <span>Go back</span>
        </Link>

        <section className="container wrapper-md">
          <header>
            <h1 className="p-40-semibold text-dark-100">{name}</h1>

            <div className="flex items-center gap-5">
              <InfoPill
                text={`${duration} day plan`}
                image="/assets/icons/calendar.svg"
              />

              <InfoPill
                text={
                  itinerary
                    ?.slice(0, 2)
                    .map((item) => item.location)
                    .join(", ") || ""
                }
                image="/assets/icons/location-mark.svg"
              />
            </div>
          </header>

          <section className="gallery">
            {imageUrls.map((url: string, idx: number) => (
              <img
                key={idx}
                src={url}
                alt="trip"
                className={cn(
                  "w-full rounded-xl object-cover",
                  idx === 0
                    ? "md:col-span-2 md:row-span-2 h-[330px]"
                    : "md:row-span-1 h-[150px]"
                )}
              />
            ))}
          </section>

          <section className="flex gap-3 md:gap-5 items-center flex-wrap">
            <ChipListComponent id="travel-chip">
              <ChipsDirective>
                {pillItems.map((pill, index) => (
                  <ChipDirective
                    key={index}
                    text={getFirstWord(pill.text)}
                    cssClass={`${pill.bg} !text-base !font-medium !px-4`}
                  />
                ))}
              </ChipsDirective>
            </ChipListComponent>

            <ul className="flex gap-1 items-center">
              {Array(5)
                .fill(null)
                .map((_, idx) => (
                  <li key={idx}>
                    <img
                      src="/assets/icons/star.svg"
                      alt="star"
                      className="size-[18px]"
                    />
                  </li>
                ))}

              <li className="ml-1">
                <ChipListComponent id="travel-chip">
                  <ChipsDirective>
                    <ChipDirective
                      text="4.9/5.0"
                      cssClass="!bg-red-50 !text-red-500"
                    />
                  </ChipsDirective>
                </ChipListComponent>
              </li>
            </ul>
          </section>

          <section className="title">
            <article>
              <h3>
                {duration}-Day {country} {travelStyle} Trip
              </h3>

              <p>
                {budget}, {groupType} and {interests}
              </p>
            </article>

            <h2>{estimatedPrice}</h2>
          </section>

          <p className="text-sm md:text-lg font-normal text-dark-400">
            {description}
          </p>

          <ul className="itinerary">
            {itinerary?.map((dayPlan: DayPlan, index: number) => (
              <li key={index}>
                <h3>
                  Day {dayPlan.day}: {dayPlan.location}
                </h3>

                <ul>
                  {dayPlan.activities.map((activity: any, idx: number) => (
                    <li key={idx}>
                      <span className="flex-shrink-0">{activity.time}</span>
                      <p className="flex-grow">{activity.description}</p>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          {visitTimeAndWeatherInfo.map((section, idx) => (
            <section key={idx} className="visit">
              <div>
                <h3>{section.title}</h3>

                <ul>
                  {section.items?.map((item, idx) => (
                    <li key={idx}>
                      <p className="flex-grow">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}

          <a href={paymentLink} className="flex">
            <ButtonComponent
              type="submit"
              className="button-class !h-12 !w-full"
            >
              <span className="p-16-semibold text-white">
                Pay and join trip
              </span>
              <span className="price-pill">{estimatedPrice}</span>
            </ButtonComponent>
          </a>
        </section>
      </div>

      <section className="flex flex-col gap-6">
        <h2 className="p-24-semibold text-dark-100">Popular Trips</h2>

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
      </section>
    </main>
  );
};

export default TravelDetail;
