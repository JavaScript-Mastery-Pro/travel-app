import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/dashboard.tsx", [
    index("routes/home.tsx"),
    route("all-users", "routes/all-users.tsx"),
    route("trips", "routes/trips.tsx"),
    route("trips/create", "routes/create-trip.tsx"),
    route("trips/:tripId", "routes/trip-detail.tsx"),
  ]),
  route("sign-in", "routes/sign-in.tsx"),
  route("api/create-trip", "routes/ai.ts"),
] satisfies RouteConfig;
