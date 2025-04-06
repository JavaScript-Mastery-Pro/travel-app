import { Header } from "~/components";

export default function Destinations() {
  return (
    <section className="flex flex-col gap-10 w-full wrapper">
      <Header
        title="Destinations"
        description="Add, edit , and categorize destinations"
        ctaText="Add new destination"
        ctaUrl="/destinations/create"
      />
      <div className="flex flex-col gap-6">
        <h1 className="p-24-semibold text-dark-100">Manage Destinations</h1>
      </div>
    </section>
  );
}
