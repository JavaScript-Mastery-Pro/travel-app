import { useState } from "react";
import { useNavigate } from "react-router";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import {
  LayerDirective,
  LayersDirective,
  MapsComponent,
} from "@syncfusion/ej2-react-maps";
import { Header, SelectDropdown } from "~/components";
import {
  budgetOptions,
  groupTypes,
  interests,
  travelStyles,
} from "~/constants";
import { world_map } from "~/constants/world_map";
import type { Route } from "./+types/create-trip";

export function meta() {
  return [
    { title: "Create Trip" },
    { name: "description", content: "Create a Personalized Trip" },
  ];
}

export async function loader() {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const data = await response.json();
  return data.map((country: any) => ({
    name: country.name.common,
    coordinates: country.latlng,
    flag: country.flag,
    openStreetMap: country.maps?.openStreetMaps,
  })) as Country[];
}

interface TripFormData {
  country: string;
  travelStyle: string;
  interest: string;
  budget: string;
  duration: number;
  groupType: string;
}

const CreateTrip = ({ loaderData }: Route.ComponentProps) => {
  const navigate = useNavigate();
  const countries = loaderData as Country[];
  const [formData, setFormData] = useState<TripFormData>({
    country: countries[0]?.name || "",
    travelStyle: "Adventure",
    interest: "Historical Sites",
    budget: "Budget",
    duration: 5,
    groupType: "Solo",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (key: keyof TripFormData, value: string | number) =>
    setFormData({ ...formData, [key]: value });

  interface CreateTripResponse {
    id?: string;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/create-trip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          country: formData.country,
          numberOfDays: formData.duration,
          travelStyle: formData.travelStyle,
          interests: formData.interest,
          budget: formData.budget,
          groupType: formData.groupType,
        }),
      });
      const result: CreateTripResponse = await response.json();
      if (result?.id) {
        navigate(`/trips/${result.id}`);
      } else {
        console.error("Failed to generate itinerary");
      }
    } catch (error) {
      console.error("Error generating itinerary:", error);
    } finally {
      setLoading(false);
    }
  };

  const mapData = [
    {
      country: formData.country,
      color: "#EA382E",
      coordinates:
        countries.find((c: Country) => c.name === formData.country)
          ?.coordinates || [],
    },
  ];

  return (
    <main className="flex flex-col gap-10 pb-20 wrapper">
      <Header
        title="Add a New Trip"
        description="View and edit AI-generated travel plans"
      />
      <section className="mt-2.5 wrapper-md">
        <form
          className="flex flex-col gap-6 py-6 bg-white border border-light-200 rounded-xl shadow-100"
          onSubmit={handleSubmit}
        >
          <SelectDropdown
            data={countries}
            onValueChange={(value) => handleChange("country", value)}
            id="country"
            label="Country"
            placeholder="Select a Country"
          />
          <div className="flex flex-col gap-2.5 w-full px-6">
            <label htmlFor="duration" className="formLabel">
              Duration
            </label>
            <input
              id="duration"
              name="duration"
              type="number"
              value={formData.duration}
              onChange={(e) => handleChange("duration", Number(e.target.value))}
              placeholder="Enter number of days (e.g., 5, 12)"
              className="formInput placeholder:text-gray-100"
            />
          </div>
          {(
            [
              "groupType",
              "travelStyle",
              "interest",
              "budget",
            ] as (keyof TripFormData)[]
          ).map((key) => (
            <SelectDropdown
              key={key}
              id={key}
              label={key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
              placeholder={`Select ${key}`}
              data={
                (
                  {
                    groupType: groupTypes,
                    travelStyle: travelStyles,
                    interest: interests,
                    budget: budgetOptions,
                  } as Record<keyof TripFormData, DropdownItem[]>
                )[key] || []
              }
              onValueChange={(value) => handleChange(key, value)}
            />
          ))}
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
                  shapeSettings={{ colorValuePath: "color", fill: "#E5E5E5" }}
                />
              </LayersDirective>
            </MapsComponent>
          </div>
          <div className="bg-gray-200 h-px w-full" />
          <footer className="px-6 w-full">
            <ButtonComponent
              type="submit"
              className="buttonClass !h-12 !w-full"
              disabled={loading}
            >
              <img
                src={`/assets/icons/${loading ? "loader.svg" : "magic-star.svg"}`}
                alt="magic star"
                className={`size-5 ${loading ? "animate-spin" : ""}`}
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
};

export default CreateTrip;
