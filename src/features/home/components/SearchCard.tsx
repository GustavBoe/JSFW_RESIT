import { Link } from "react-router";
import type { SingleGame } from "./GameCard";

export function SearchCard(game: SingleGame) {
  return (
    <div className="flex flex-row h-20 border bg-white">
      <div className="overflow-hidden w-60">
        <img
          src={game.image.url}
          alt={game.image.alt}
          className="object-center"
        />
      </div>
      <div className=" z-50 w-full flex justify-between ">
        <h2>{game.name}</h2>
        <Link to={`/game/${game.id}`} className="self-center">
          View
        </Link>
      </div>
    </div>
  );
}
