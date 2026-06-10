import { Link } from "react-router";
import type { SingleGame } from "./GameCard";

export function SearchCard({ ...game }: SingleGame) {
  return (
    <div>
      <h2>{game.name}</h2>
      <Link to={`/games/${game.id}`}>View</Link>
    </div>
  );
}
