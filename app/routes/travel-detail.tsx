import { Link, redirect, type LoaderFunctionArgs } from "react-router";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";

import { getTripById } from "~/appwrite/trips";
import { Header, Pill } from "~/components";
import type { Route } from "./+types/trip-detail";
import { cn, parseTripData } from "~/lib/utils";

export function meta() {
  return [
    { title: "Trip Detail" },
    { name: "description", content: "Trip Details" },
  ];
}

export async function loader({ params }: LoaderFunctionArgs) {
  const tripId = params.tripId;
  if (!tripId) throw new Error("Trip ID is required");
  const trip = await getTripById(tripId);
  return trip?.$id ? trip : redirect("/trips");
}

const InfoPill = ({ text, image }: { text: string; image: string }) => (
  <figure className="flex items-center gap-1.5">
    <img src={image} alt="info icon" className="size-5" />
    <figcaption className="text-sm md:text-lg font-normal truncate text-gray-100">
      {text}
    </figcaption>
  </figure>
);

const TravelDetail = ({ loaderData }: Route.ComponentProps) => {
  const imageUrls = loaderData?.imageUrls || [];

  // Parse the stored trip detail and get the flattened model
  const tripData = parseTripData(loaderData?.tripDetail);

  const paymentLink = loaderData?.payment_link;
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

  const pillItems = [
    { text: travelStyle, bg: "bg-pink-50", textColor: "text-pink-500" },
    { text: groupType, bg: "bg-primary-50", textColor: "text-primary-500" },
    { text: budget },
    { text: interests, bg: "bg-navy-50", textColor: "text-navy-500" },
  ];

  const visitTimeAndWeatherInfo = [
    { title: "Best Time to Visit:", items: bestTimeToVisit },
    { title: "Weather Info:", items: weatherInfo },
  ];

  return (
    <main className="flex flex-col md:flex-row gap-10 pb-20 wrapper pt-40">
      <Link
        to="/"
        className="flex-center gap-2.5 py-3 px-[30px] boder-gray-200 rounded-lg shadow-500 bg-white h-[50px] w-[240px]"
      >
        <img
          src="/assets/icons/arrow-left.svg"
          alt="back icon"
          className="size-[17px]"
        />
        <span className="text-base font-semibold text-dark-100">Go back</span>
      </Link>
      <section className="flex flex-col gap-9 mt-2.5 wrapper-md">
        <header className="flex flex-col gap-6 overflow-hidden">
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
        <section className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-7 mt-1">
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
          {pillItems.map((pill, idx) => (
            <Pill
              key={idx}
              text={pill.text || ""}
              bgColor={pill.bg}
              textColor={pill.textColor}
            />
          ))}
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
              <Pill
                text="4.9/5.0"
                bgColor="bg-red-50"
                textColor="text-red-500"
              />
            </li>
          </ul>
        </section>
        <section className="flex justify-between gap-5">
          <article className="flex flex-col gap-4">
            <h1 className="text-xl md:text-3xl text-dark-100 font-semibold">
              {duration}-Day {country} {travelStyle} Trip
            </h1>
            <p className="text-base md:text-2xl text-gray-100 font-normal">
              {budget}, {groupType} and {interests}
            </p>
          </article>
          <h2 className="text-sm md:text-xl font-normal text-dark-100">
            {estimatedPrice}
          </h2>
        </section>
        <p className="text-sm md:text-lg font-normal text-dark-400">
          {description}
        </p>
        <ul className="flex flex-col gap-9">
          {itinerary?.map((dayPlan: DayPlan, index: number) => (
            <li key={index} className="flex flex-col gap-4">
              <h1 className="text-base md:text-xl font-semibold text-dark-400">
                Day {dayPlan.day}: {dayPlan.location}
              </h1>
              <ul className="flex flex-col gap-3">
                {dayPlan.activities.map((activity: any, idx: number) => (
                  <li
                    key={idx}
                    className="flex justify-between gap-7 text-sm md:text-lg font-normal text-dark-400 !list-disc"
                  >
                    <span className="flex-shrink-0">{activity.time}</span>
                    <p className="flex-grow">{activity.description}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        {visitTimeAndWeatherInfo.map((section, idx) => (
          <section key={idx} className="flex flex-col gap-5">
            <div className="flex flex-col gap-4">
              <h2 className="text-base md:text-xl text-dark-400 font-semibold">
                {section.title}
              </h2>
              <ul className="flex flex-col gap-3">
                {section.items?.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between gap-7 text-sm md:text-lg font-normal text-dark-400 !list-disc"
                  >
                    <p className="flex-grow">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
        <a href={paymentLink} className="flex wrapper-md">
          <ButtonComponent type="submit" className="buttonClass !h-12 !w-full">
            <span className="p-16-semibold text-white">Pay and join trip</span>
            <span className="price-pill">{estimatedPrice}</span>
          </ButtonComponent>
        </a>
      </section>
    </main>
  );
};

export default TravelDetail;
