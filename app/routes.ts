import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("tuner", "routes/tuner.tsx"),
  route("fingerings", "routes/fingerings.tsx"),
  route("game", "routes/game.tsx"),
] satisfies RouteConfig;
