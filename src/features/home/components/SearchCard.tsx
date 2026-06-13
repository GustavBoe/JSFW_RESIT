import { Link } from "react-router";
import type { SingleGame } from "./GameCard";

export function SearchCard(game: SingleGame) {
  return (
    <div className="flex flex-row h-20 w-120 border-b  bg-white text-black">
      <div className="overflow-hidden w-60">
        <img
          src={game.image.url}
          alt={game.image.alt}
          className="object-center"
        />
      </div>
      <div className=" z-50 w-full flex flex-col items-center text-center gap-2 py-2    ">
        <h2 className="font-heading">{game.name}</h2>
        <Link to={`/game/${game.id}`} className="font-paragraph cursor-pointer">
          View
        </Link>
      </div>
    </div>
  );
}
