import { Header } from "~/components";
import {
  LayerDirective,
  LayersDirective,
  MapsComponent,
} from "@syncfusion/ej2-react-maps";
import { world_map } from "~/world_map";
import type { Route } from "./+types/create-destination";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";

let mapData: object[] = [
  {
    country: "India",
    city: "Shimla",
    color: "#EA382E",
    coordinates: [[81.999987420584958, 27.925479234319987]],
  },
];

export default function CreateDestination({
  loaderData,
}: Route.ComponentProps) {
  return (
    <main className="flex flex-col gap-10 w-full wrapper pb-20">
      <Header
        title="Create Destination"
        description="Add, edit, and categorize destinations"
      />
      <section className="flex flex-col gap-5 mt-2.5 wrapper-md">
        <h1 className="p-24-semibold text-dark-100">
          Add a New Travel Destination
        </h1>
        <form className="flex flex-col gap-6 py-6 bg-white border border-light-200 rounded-xl shadow-100">
          <div className="flex flex-col md:flex-row gap-3.5 px-6">
            <div className="flex flex-col gap-2.5 w-full">
              <label htmlFor="destination" className="formLabel">
                Destination name
              </label>
              <input
                type="text"
                id="destination"
                placeholder="Shimla Himachal"
                className="formInput placeholder:text-dark-300"
              />
            </div>
            <div className="flex flex-col gap-2.5 w-full">
              <label htmlFor="theme-tag" className="formLabel">
                Tag destinations by theme
              </label>
              <input
                type="text"
                id="theme-tag"
                placeholder="Mountains, Adventure"
                className="formInput placeholder:text-dark-300"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2.5 w-full px-6">
            <label htmlFor="description" className="formLabel">
              Destination description
            </label>
            <textarea
              id="description"
              placeholder="Provide a brief description of the destination"
              className="formInput placeholder:text-gray-100"
              rows={4}
            />
          </div>
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
