import { GamePage } from "~/pages/game/GamePage";

export function meta() {
  return [
    { title: "Note Game - Flute Hero" },
    { name: "description", content: "Practice playing notes on your flute" },
  ];
}

export default function Game() {
  return <GamePage />;
}

