import { UserTable } from "~/components";
import type { Route } from "./+types/all-users";
import { getAllUsers } from "~/appwrite/auth";
import { formatDate } from "~/lib/utils";

export async function loader() {
  const users = await getAllUsers();
  const mappedUsers: UserData[] = users.map((user) => ({
    id: user.$id,
    name: user.name,
    email: user.email,
    img: user.imageUrl,
    dateJoined: formatDate(user.joinedAt),
    itineryCreated: 21,
    status: "active",
  }));
  return mappedUsers;
}

export default function AllUsers({ loaderData }: Route.ComponentProps) {
  return (
    <main className="w-full min-h-screen wrapper ">
      <h1>All users</h1>
      <UserTable data={loaderData} />
    </main>
  );
}
