import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { Header } from "~/components";

export default function AiItinerary() {
  return (
    <main className="flex flex-col gap-10 pb-20 wrapper">
      <Header
        title="Itineraries"
        description="View and edit AI-generated travel plans"
      />
      <section className="flex flex-col gap-5 mt-2.5 wrapper-md">
        <h1 className="p-24-semibold text-dark-100">
          Add a New Travel Destination
        </h1>
        <form className="flex flex-col gap-6 py-6 bg-white border border-light-200 rounded-xl shadow-100">
          <div className="flex flex-col gap-2.5 w-full relative px-6">
            <label htmlFor="destination" className="formLabel">
              Destination or region
            </label>
            <input
              type="text"
              id="destination"
              placeholder="Penida Island, Bali, Indonesia"
              className="formInput placeholder:text-dark-300 !px-8"
            />
            <img
              src="/assets/icons/location-mark.svg"
              alt="location"
              className="size-[18px] absolute top-12 left-9"
            />
            <button className="absolute top-12 right-9">
              <img
                src="/assets/icons/refresh.svg"
                alt="refresh"
                className="size-[18px]"
              />
            </button>
          </div>
          <div className="flex flex-col gap-2.5 w-full px-6">
            <label htmlFor="preferences" className="formLabel">
              Preferences
            </label>
            <input
              id="preferences"
              placeholder="Enter your preferences (e.g., museums, beaches)"
              className="formInput placeholder:text-gray-100"
            />
          </div>
          <div className="flex flex-col gap-2.5 w-full px-6">
            <label htmlFor="travelStyle" className="formLabel">
              Travel style
            </label>
            <input
              id="travelStyle"
              placeholder="Select your travel style (e.g., Relaxing, luxury)"
              className="formInput placeholder:text-gray-100"
            />
          </div>
          <div className="flex flex-col gap-2.5 w-full px-6 pb-6">
            <label htmlFor="budget" className="formLabel">
              Budget Estimate
            </label>
            <input
              id="budget"
              placeholder="Select your budget preference"
              className="formInput placeholder:text-gray-100"
            />
          </div>
          <div className="bg-gray-200 h-px w-full" />
          <footer className="px-6 w-full">
            <ButtonComponent
              type="button"
              className="buttonClass !h-12 !w-full"
            >
              <img
                src="/assets/icons/magic-star.svg"
                alt="magic star"
                className="size-5"
              />
              <span className="p-16-semibold text-white">
                Generate itinerary
              </span>
            </ButtonComponent>
          </footer>
        </form>
      </section>
    </main>
  );
}
