import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/dashboard.tsx", [
    index("routes/home.tsx"),
    route("travel-match", "routes/travel-match.tsx"),
    route("all-users", "routes/all-users.tsx"),
    route("destinations", "routes/destinations.tsx"),
    route("destinations/create", "routes/create-destination.tsx"),
    route("itinerary", "routes/ai-itinerary.tsx"),
  ]),
  route("sign-in", "routes/sign-in.tsx"),
] satisfies RouteConfig;
