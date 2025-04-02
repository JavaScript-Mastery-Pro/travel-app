import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("sign-in", "routes/sign-in.tsx"),
  route("travel-match", "routes/travel-match.tsx"),
  route("all-users", "routes/all-users.tsx"),
] satisfies RouteConfig;
