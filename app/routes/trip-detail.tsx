import { redirect, type LoaderFunctionArgs } from "react-router";
import { getTripById } from "~/appwrite/trips";
import { Header, Pill } from "~/components";
import type { Route } from "./+types/trip-detail";
import { parseTripData } from "~/lib/utils";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";

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
  if (!trip?.$id) {
    return redirect("/trips");
  }
  return trip;
}

export default function TripDetail({ loaderData }: Route.ComponentProps) {
  const trip = loaderData;
  const tripDetail = parseTripData(trip?.tripDetail);

  return (
    <main className="flex flex-col gap-10 pb-20 wrapper">
      <Header
        title="Trips"
        description="View and edit AI-generated travel plans"
      />
      <section className="flex flex-col gap-9 mt-2.5 wrapper-md">
        <header className="flex flex-col gap-6 overflow-hidden">
          <h1 className="p-40-semibold text-dark-100">
            {tripDetail?.trip_name}
          </h1>
          <div className="flex items-center gap-5">
            <InfoPill
              text={`${tripDetail?.duration} day plan`}
              image="/assets/icons/calendar.svg"
            />
            <InfoPill
              text={`${tripDetail?.itinerary
                .slice(0, 2)
                .map((item) => item.location)
                .join(", ")}`}
              image="/assets/icons/location-mark.svg"
            />
          </div>
        </header>
        <section className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-7 mt-1">
          {trip?.imageUrls.map((imageUrl: string, index: number) => (
            <img
              key={index}
              src={imageUrl}
              alt="trip"
              className={`w-full rounded-xl object-cover ${
                index === 0
                  ? "md:col-span-2 md:row-span-2 h-[330px]"
                  : "md:row-span-1 h-[150px]"
              }`}
            />
          ))}
        </section>
        <section className="flex gap-3 md:gap-5 items-center flex-wrap">
          <Pill
            text={tripDetail?.travel_style!}
            bgColor="bg-pink-50"
            textColor="text-pink-500"
          />
          <Pill
            text={tripDetail?.group_type!}
            bgColor="bg-primary-50"
            textColor="text-primary-500"
          />
          <Pill text={tripDetail?.budget!} />
          <Pill
            text={tripDetail?.interests!}
            bgColor="bg-navy-50"
            textColor="text-navy-500"
          />
          <ul className="flex gap-1 items-center">
            {Array.from({ length: 5 }).map((_, index) => (
              <li key={index}>
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
              {tripDetail?.duration}-Day {tripDetail?.country}&nbsp;
              {tripDetail?.travel_style} Trip
            </h1>
            <p className="text-base md:text-2xl text-gray-100 font-normal">
              {tripDetail?.budget}, {tripDetail?.group_type} and{" "}
              {tripDetail?.interests}
            </p>
          </article>
          <h2 className="text-sm md:text-xl font-normal text-dark-100">
            {tripDetail?.estimated_price}
          </h2>
        </section>
        <p className="text-sm md:text-lg font-normal text-dark-400">
          {tripDetail?.trip_description}
        </p>
        <ul className="flex flex-col gap-9">
          {tripDetail?.itinerary.map((dayPlan: DayPlan, index: number) => (
            <li key={index} className="flex flex-col gap-4">
              <h1 className="text-base md:text-xl font-semibold text-dark-400">
                Day {dayPlan.day}: {dayPlan.location}
              </h1>
              <ul className="flex flex-col gap-3">
                {dayPlan.activities.map((activity: any, index: number) => (
                  <li
                    key={index}
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
        <div className="h-px bg-light-500 w-full" />
        <section className="flex flex-col gap-5">
          <div className="flex flex-col gap-4">
            <h2 className="text-base md:text-xl text-dark-400 font-semibold">
              Best Time to Visit:
            </h2>
            <ul className="flex flex-col gap-3">
              {tripDetail?.best_time_to_visit.map(
                (item: string, index: number) => (
                  <li
                    key={index}
                    className="flex justify-between gap-7 text-sm md:text-lg font-normal text-dark-400 !list-disc"
                  >
                    <p className="flex-grow">{item}</p>
                  </li>
                )
              )}
            </ul>
          </div>
          <div className="h-px bg-light-500 w-full" />
          <div className="flex flex-col gap-4">
            <h2 className="text-base md:text-xl text-dark-400 font-semibold">
              Weather Info:
            </h2>
            <ul className="flex flex-col gap-3">
              {tripDetail?.weather_info.map((item: string, index: number) => (
                <li
                  key={index}
                  className="flex justify-between gap-7 text-sm md:text-lg font-normal text-dark-400 !list-disc"
                >
                  <p className="flex-grow">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </section>
      <article className="flex wrapper-md">
        <ButtonComponent type="submit" className="buttonClass !h-12 !w-full">
          <span className="p-16-semibold text-white">Pay and join trip</span>
          <span className="price-pill">{tripDetail?.estimated_price}</span>
        </ButtonComponent>
      </article>
    </main>
  );
}

const InfoPill = ({ text, image }: { text: string; image: string }) => (
  <figure className="flex items-center gap-1.5">
    <img src={image} alt="infoImage" className="size-5" />
    <figcaption className="text-sm md:text-lg font-normal truncate text-gray-100">
      {text}
    </figcaption>
  </figure>
);
