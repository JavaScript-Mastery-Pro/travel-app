import type { Route } from "./+types/home";
import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
} from "@syncfusion/ej2-react-grids";
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
  const data = [
    {
      OrderID: 10248,
      CustomerID: "VINET",
      EmployeeID: 5,
      OrderDate: new Date(8364186e5),
      ShipName: "Vins et alcools Chevalier",
      ShipCity: "Reims",
      ShipAddress: "59 rue de l Abbaye",
      ShipRegion: "CJ",
      ShipPostalCode: "51100",
      ShipCountry: "France",
      Freight: 32.38,
      Verified: !0,
    },
    {
      OrderID: 10249,
      CustomerID: "TOMSP",
      EmployeeID: 6,
      OrderDate: new Date(836505e6),
      ShipName: "Toms Spezialitäten",
      ShipCity: "Münster",
      ShipAddress: "Luisenstr. 48",
      ShipRegion: "CJ",
      ShipPostalCode: "44087",
      ShipCountry: "Germany",
      Freight: 11.61,
      Verified: !1,
    },
    {
      OrderID: 10250,
      CustomerID: "HANAR",
      EmployeeID: 4,
      OrderDate: new Date(8367642e5),
      ShipName: "Hanari Carnes",
      ShipCity: "Rio de Janeiro",
      ShipAddress: "Rua do Paço, 67",
      ShipRegion: "RJ",
      ShipPostalCode: "05454-876",
      ShipCountry: "Brazil",
      Freight: 65.83,
      Verified: !0,
    },
  ];
  return (
    <div className="flex flex-col gap-10">
      <GridComponent dataSource={data}>
        <ColumnsDirective>
          <ColumnDirective field="OrderID" width="100" textAlign="Right" />
          <ColumnDirective field="CustomerID" width="100" />
          <ColumnDirective field="EmployeeID" width="100" textAlign="Right" />
          <ColumnDirective
            field="Freight"
            width="100"
            format="C2"
            textAlign="Right"
          />
          <ColumnDirective field="ShipCountry" width="100" />
        </ColumnsDirective>
      </GridComponent>
      <Logout />
      <Link to="/travel-match">
        <button className="bg-cyan-300 text-black px-4 py-2 rounded-lg cursor-pointer">
          Travel Match
        </button>
      </Link>
    </div>
  );
}
