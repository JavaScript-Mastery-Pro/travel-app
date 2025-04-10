import { Header } from "~/components";

export default function TripDetail() {
  return (
    <main className="flex flex-col gap-10 pb-20 wrapper">
      <Header
        title="Trips"
        description="View and edit AI-generated travel plans"
      />
      <section className="flex flex-col gap-5 mt-2.5 wrapper-md">
        <h1 className="p-24-semibold text-dark-100">
          5-Day Japan Highlights: Culture, Food and Adventure
        </h1>
      </section>
    </main>
  );
}
