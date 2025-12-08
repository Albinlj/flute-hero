import type { Route } from "./+types/home";
import { HomePage } from "~/pages/HomePage";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Flute Hero" },
    { name: "description", content: "Flute learning and practice tools" },
  ];
}

export default function Home() {
  return <HomePage />;
}
