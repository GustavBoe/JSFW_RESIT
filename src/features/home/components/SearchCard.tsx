import { Link } from "react-router";
import type { SingleGame } from "./GameCard";

export function SearchCard(game: SingleGame) {
  return (
    <div className="flex flex-row h-20 w-120 border-b  bg-white ">
      <div className="text-black flex flex-row h-20 w-full border-b">
        <div className="overflow-hidden w-40 h-auto border justify-items-center">
          <img
            src={game.image.url}
            alt={game.image.alt}
            className="object-cover"
          />
        </div>
        <div className=" z-50 w-[80%] flex flex-col items-center text-center gap-2 py-2    ">
          <h2 className="font-heading">{game.name}</h2>
          <Link
            to={`/game/${game.id}`}
            className="font-paragraph cursor-pointer underline hover:font-semibold">
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
