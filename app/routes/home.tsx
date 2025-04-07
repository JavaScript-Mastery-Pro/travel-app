import { getUser } from "~/appwrite/auth";
import type { Route } from "./+types/home";
import { Link } from "react-router";
import { Header } from "~/components";

// for loader reference link: https://reactrouter.com/start/framework/data-loading
export async function clientLoader() {
  const user = await getUser();
  return user;
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Travel App" },
    { name: "description", content: "Welcome to Travel App" },
  ];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const user = loaderData;
  return (
    <main className="flex flex-col gap-10 w-full wrapper pb-20">
      <Header
        title={`Welcome ${user?.name} 👋`}
        description="Track activity, trends, and popular destinations in real time"
        ctaText="Create an itinerary"
        ctaUrl="/itinerary"
      />
    </main>
  );
}
