import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/admin/admin-layout.tsx", [
    route("dashboard", "routes/admin/dashboard.tsx"),
    route("all-users", "routes/admin/all-users.tsx"),
    route("trips", "routes/admin/trips.tsx"),
    route("trips/create", "routes/admin/create-trip.tsx"),
    route("trips/:tripId", "routes/admin/trip-detail.tsx"),
  ]),
  route("sign-in", "routes/root/sign-in.tsx"),
  route("api/create-trip", "routes/api/create-trip.ts"),
  layout("routes/root/page-layout.tsx", [
    index("routes/root/travel-page.tsx"),
    route("travel/:tripId", "routes/root/travel-detail.tsx"),
    route("travel/:tripId/success", "routes/root/payment-success.tsx"),
  ]),
] satisfies RouteConfig;
