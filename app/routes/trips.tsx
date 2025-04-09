import { Header } from "~/components";

export default function Trips() {
  return (
    <main className="flex flex-col gap-10 pb-20 wrapper">
      <Header
        title="Trips"
        description="View and edit AI-generated travel plans"
        ctaText="Create a trip"
        ctaUrl="/trips/create"
      />
      <section className="flex flex-col gap-5 mt-2.5">
        <h1 className="p-24-semibold text-dark-100">Manage Created Trips</h1>
        <div className="flex flex-col gap-6 py-6 bg-white border border-light-200 rounded-xl shadow-100">
          {/* Trip cards will go here */}
        </div>
      </section>
    </main>
  );
}
