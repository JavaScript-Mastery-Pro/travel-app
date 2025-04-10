import {
  Category,
  ChartComponent,
  Inject,
  SeriesCollectionDirective,
  SeriesDirective,
  StackingColumnSeries,
  type AxisModel,
} from "@syncfusion/ej2-react-charts";

import type { Route } from "./+types/home";
import { getUser } from "~/appwrite/auth";
import { Header } from "~/components";
// import { chartOneData } from "~/constants";

export const chartOneData: object[] = [
  {
    x: "Jan",
    y1: 0.5,
    y2: 1.5,
    y3: 0.7,
  },
  {
    x: "Feb",
    y1: 0.8,
    y2: 1.2,
    y3: 0.9,
  },
  {
    x: "Mar",
    y1: 1.2,
    y2: 1.8,
    y3: 1.5,
  },
  {
    x: "Apr",
    y1: 1.5,
    y2: 2.0,
    y3: 1.8,
  },
  {
    x: "May",
    y1: 1.8,
    y2: 2.5,
    y3: 2.0,
  },
  {
    x: "Jun",
    y1: 2.0,
    y2: 2.8,
    y3: 2.5,
  },
];

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
        ctaUrl="/trips/create"
      />
      {/* <section className="flex gap-6">
        <aside className="h-[340px]">
          <ChartComponent id="charts">
            <Inject services={[StackingColumnSeries, Category]} />
            <SeriesCollectionDirective>
              <SeriesDirective
                dataSource={chartOneData}
                xName="x"
                yName="y1"
                name="users1"
                type="StackingColumn"
              ></SeriesDirective>
              <SeriesDirective
                dataSource={chartOneData}
                xName="x"
                yName="y2"
                name="users2"
                type="StackingColumn"
              ></SeriesDirective>
              <SeriesDirective
                dataSource={chartOneData}
                xName="x"
                yName="y3"
                name="users3"
                type="StackingColumn"
              ></SeriesDirective>
            </SeriesCollectionDirective>
          </ChartComponent>
        </aside>
      </section> */}
    </main>
  );
}
