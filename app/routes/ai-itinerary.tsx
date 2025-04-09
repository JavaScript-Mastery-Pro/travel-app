import { useState } from "react";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import {
  LayerDirective,
  LayersDirective,
  MapsComponent,
} from "@syncfusion/ej2-react-maps";

import { Header, SelectDropdown } from "~/components";
import type { Route } from "./+types/ai-itinerary";
import {
  budgetOptions,
  groupTypes,
  interests,
  travelStyles,
} from "~/constants";
import { generateTravelPlan } from "~/lib/ai";
import { world_map } from "~/world_map";

export async function loader() {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const data = await response.json();

  const countriesList: CountryListItem[] = data.map((country: any) => ({
    name: country.name.common,
    coordinates: country.latlng,
    flag: country.flag,
    openStreetMap: country.maps?.openStreetMaps,
  }));
  return countriesList;
}

export default function AiItinerary({ loaderData }: Route.ComponentProps) {
  const countries: CountryListItem[] = loaderData;
  const [country, setcountry] = useState(countries[0].name);
  const [travelStyle, setTravelStyle] = useState("Adventure");
  const [interest, setInterest] = useState("Historical Sites");
  const [budget, setBudget] = useState("Budget");
  const [duration, setDuration] = useState(5);
  const [groupType, setGroupType] = useState("Solo");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await generateTravelPlan(
        country,
        duration,
        travelStyle,
        interest,
        budget,
        groupType
      );
      console.log("return data", JSON.stringify(response?.id, null, 2));
    } catch (error) {
      console.error("Error generating itinerary:", error);
    } finally {
      setLoading(false);
    }
  };

  const mapData: object[] = [
    {
      country: country,
      color: "#EA382E",
      coordinates: [
        countries.find((c) => c.name === country)?.coordinates || [],
      ],
    },
  ];

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
        <form
          className="flex flex-col gap-6 py-6 bg-white border border-light-200 rounded-xl shadow-100"
          onSubmit={handleSubmit}
        >
          <SelectDropdown
            data={countries}
            onValueChange={setcountry}
            id="country"
            label="Country"
            placeholder={countries[0].flag + " " + countries[0].name}
          />
          <div className="flex flex-col gap-2.5 w-full px-6">
            <label htmlFor="duration" className="formLabel">
              Duration
            </label>
            <input
              id="duration"
              name="duration"
              onChange={(e) => setDuration(Number(e.target.value))}
              placeholder="Enter number of days (e.g., 5, 12)"
              className="formInput placeholder:text-gray-100"
            />
          </div>
          <SelectDropdown
            id="groupType"
            label="Group Type"
            placeholder="Select s group type"
            data={groupTypes}
            onValueChange={setGroupType}
            className="!text-gray-100"
          />
          <SelectDropdown
            id="travelStyle"
            label="Travel Style"
            placeholder="Select travel style"
            data={travelStyles}
            onValueChange={setTravelStyle}
            className="!text-gray-100"
          />
          <SelectDropdown
            id="interest"
            label="Interests"
            placeholder="Select your travel style"
            data={interests}
            onValueChange={setInterest}
            className="!text-gray-100"
          />
          <SelectDropdown
            id="budget"
            label="Budget Estimate"
            placeholder="Select your budget preference"
            data={budgetOptions}
            onValueChange={setBudget}
            className="!text-gray-100"
          />
          <div className="w-full flex flex-col gap-2.5 px-6">
            <label htmlFor="location" className="formLabel">
              Location on map
            </label>
            <MapsComponent>
              <LayersDirective>
                <LayerDirective
                  shapeData={world_map}
                  dataSource={mapData}
                  shapePropertyPath="name"
                  shapeDataPath="country"
                  shapeSettings={{
                    colorValuePath: "color",
                    fill: "#E5E5E5",
                  }}
                ></LayerDirective>
              </LayersDirective>
            </MapsComponent>
          </div>
          <div className="bg-gray-200 h-px w-full" />
          <footer className="px-6 w-full">
            <ButtonComponent
              type="submit"
              className="buttonClass !h-12 !w-full"
            >
              <img
                src="/assets/icons/magic-star.svg"
                alt="magic star"
                className="size-5"
              />
              <span className="p-16-semibold text-white">
                {loading ? "Generating..." : "Generate Itinerary"}
              </span>
            </ButtonComponent>
          </footer>
        </form>
      </section>
    </main>
  );
}
