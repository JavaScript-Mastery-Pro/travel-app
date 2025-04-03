import type { Route } from "./+types/home";
import { Link } from "react-router";
import Logout from "~/components/Logout";

// for loader reference link: https://reactrouter.com/start/framework/data-loading

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Travel App" },
    { name: "description", content: "Welcome to Travel App" },
  ];
}

export default function Home() {
  return (
    <div className="flex flex-col gap-10 wrapper">
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
