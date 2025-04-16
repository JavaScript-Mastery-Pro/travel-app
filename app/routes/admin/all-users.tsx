import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
} from "@syncfusion/ej2-react-grids";

import { Header } from "~/components";
import type { Route } from "./+types/all-users";
import { getAllUsers } from "~/appwrite/auth";
import { cn, formatDate } from "~/lib/utils";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "All Users" },
    { name: "description", content: "See all users info." },
  ];
}

export async function loader() {
  const { users, total } = await getAllUsers(10, 0);

  const mappedUsers: UserData[] = users.map((user) => ({
    id: user.accountId,
    name: user.name,
    email: user.email,
    imageUrl: user.imageUrl,
    dateJoined: formatDate(user.joinedAt),
    itineraryCreated:
      user.itineraryCount === 0 ? "not available" : user.itineraryCount,
    status: user.status,
  }));

  return { users: mappedUsers, total };
}

const AllUsers = ({ loaderData }: Route.ComponentProps) => {
  const { users } = loaderData;

  return (
    <main className="all-users wrapper">
      <Header
        title="Manage Users"
        description="Filter, sort, and access detailed user profiles"
      />

      <GridComponent dataSource={users} gridLines="None">
        <ColumnsDirective>
          <ColumnDirective
            field="name"
            headerText="Name"
            width="200"
            textAlign="Left"
            template={(props: UserData) => {
              return (
                <div className="flex items-center gap-1.5 px-4">
                  <img
                    src={props.imageUrl}
                    alt="User"
                    className="rounded-full size-8 aspect-square"
                  />
                  <span>{props.name}</span>
                </div>
              );
            }}
          />

          <ColumnDirective
            field="email"
            headerText="Email Address"
            width="150"
            textAlign="Left"
          />

          <ColumnDirective
            field="dateJoined"
            headerText="Date Joined"
            width="120"
            textAlign="Left"
          />

          <ColumnDirective
            field="itineraryCreated"
            headerText="Itinerary Created"
            width="130"
            textAlign="Left"
          />

          <ColumnDirective
            field="status"
            headerText="Status"
            width="100"
            textAlign="Left"
            template={(props: UserData) => {
              return (
                <article
                  className={cn(
                    "status-column",
                    props.status === "user" ? " bg-success-50" : "bg-light-300"
                  )}
                >
                  <div
                    className={cn(
                      "size-1.5 rounded-full",
                      props.status === "user" ? "bg-success-500" : "bg-gray-500"
                    )}
                  />
                  <h3
                    className={cn(
                      "font-inter text-xs font-medium",
                      props.status === "user"
                        ? "text-success-700"
                        : "text-gray-500"
                    )}
                  >
                    {props.status}
                  </h3>
                </article>
              );
            }}
          />
        </ColumnsDirective>
      </GridComponent>
    </main>
  );
};

export default AllUsers;
