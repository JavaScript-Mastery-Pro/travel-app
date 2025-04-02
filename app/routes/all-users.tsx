import { adminClient } from "~/appwrite/server";
import { UserTable } from "~/components";
import type { Route } from "./+types/all-users";

export async function loader() {
  const { users } = await adminClient();
  const allUsers = await users.list();
  return allUsers;
}

export default function AllUsers({ loaderData }: Route.ComponentProps) {
  console.log("All users", loaderData.users[0].prefs);
  return (
    <main className="w-full min-h-screen">
      <h1>All users</h1>
      <UserTable />
    </main>
  );
}
