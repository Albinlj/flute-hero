import { FingeringsPage } from "~/pages/fingerings/FingeringsPage";

export function meta() {
  return [
    { title: "Flute Fingerings" },
    { name: "description", content: "Complete flute fingering chart" },
  ];
}

export default function Fingerings() {
  return <FingeringsPage />;
}
