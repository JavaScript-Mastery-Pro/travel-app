import { Header, UserTable } from "~/components";
import type { Route } from "./+types/all-users";
import { getAllUsers } from "~/appwrite/auth";
import { formatDate } from "~/lib/utils";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "All Users" },
    { name: "description", content: "See all users info." },
  ];
}

export async function loader() {
  const users = await getAllUsers();
  const mappedUsers: UserData[] = users.map((user) => ({
    id: user.accountId,
    name: user.name,
    email: user.email,
    img: user.imageUrl,
    dateJoined: formatDate(user.joinedAt),
    itineraryCreated:
      user.itineraryCount === 0 ? "not available" : user.itineraryCount,
    status: user.status,
  }));
  return mappedUsers;
}

const AllUsers = ({ loaderData }: Route.ComponentProps) => {
  return (
    <main className="w-full min-h-screen wrapper flex flex-col gap-10">
      <Header
        title="Manage Users"
        description="Filter, sort, and access detailed user profiles"
      />
      <UserTable data={loaderData} />
    </main>
  );
};

export default AllUsers;
