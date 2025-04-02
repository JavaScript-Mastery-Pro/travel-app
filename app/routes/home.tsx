import type { Route } from "./+types/home";
import { Link, redirect } from "react-router";
import Logout from "~/components/Logout";
import { getUser } from "~/lib/auth";

// for loader reference link: https://reactrouter.com/start/framework/data-loading
export async function clientLoader() {
  try {
    const user = await getUser();

    if (!user) {
      console.log("User not logged in, redirecting to sign-in.");
      return redirect("/sign-in");
    }
    return user;
  } catch (error) {
    console.error("Error in clientLoader:", error);
    return redirect("/sign-in");
  }
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Travel App" },
    { name: "description", content: "Welcome to Travel App" },
  ];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-3xl font-bold">Welcome to Travel App</h1>
      <Logout />
      <Link to="/travel-match">
        <button className="bg-cyan-300 text-black px-4 py-2 rounded-lg cursor-pointer">
          Travel Match
        </button>
      </Link>
      <Link to="/all-users">
        <button className="bg-cyan-300 text-black px-4 py-2 rounded-lg cursor-pointer">
          All Users
        </button>
      </Link>
    </div>
  );
}
