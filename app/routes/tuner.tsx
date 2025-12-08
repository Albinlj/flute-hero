import type { Route } from "./+types/tuner";
import { TunerPage } from "~/pages/TunerPage";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Tuner - Flute Hero" },
    { name: "description", content: "Real-time flute tuner" },
  ];
}

export default function Tuner() {
  return <TunerPage />;
}

