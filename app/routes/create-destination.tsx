import { Header } from "~/components";

export default function CreateDestination() {
  return (
    <section className="flex flex-col gap-10 w-full wrapper">
      <Header
        title="Create Destination"
        description="Add, edit, and categorize destinations"
      />
      <section className="flex flex-col gap-5 mt-2.5 wrapper-md">
        <h1 className="p-24-semibold text-dark-100">
          Add a New Travel Destination
        </h1>
        <form className="flex flex-col gap-6 p-6 bg-white border border-light-200 rounded-xl shadow-100">
          <div className="flex flex-col md:flex-row gap-3.5">
            <div className="flex flex-col gap-2.5 w-full">
              <label
                htmlFor="destination"
                className="text-sm font-regular text-gray-100"
              >
                Destination name
              </label>
              <input
                type="text"
                id="destination"
                placeholder="Shimla Himachal"
                className="p-3.5 border border-light-400 rounded-xl text-base text-dark-300 font-medium placeholder:text-dark-300"
              />
            </div>
            <div className="flex flex-col gap-2.5 w-full">
              <label
                htmlFor="theme-tag"
                className="text-sm font-regular text-gray-100"
              >
                Tag destinations by theme
              </label>
              <input
                type="text"
                id="theme-tag"
                placeholder="Mountains, Adventure"
                className="p-3.5 border border-light-400 rounded-xl text-base text-dark-300 font-medium placeholder:text-dark-300"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2.5 w-full">
            <label
              htmlFor="description"
              className="text-sm font-regular text-gray-100"
            >
              Destination description
            </label>
            <textarea
              id="description"
              placeholder="Provide a brief description of the destination"
              className="p-3.5 border border-light-400 rounded-xl text-base text-dark-300 font-medium placeholder:text-gray-100"
              rows={4}
            />
          </div>
        </form>
      </section>
    </section>
  );
}
