import { useState, useMemo } from "react";
import type { SingleGame } from "./GameCard";
import { SearchCard } from "./SearchCard";

type GameSearchProps = {
  games: SingleGame[];
};

function GameSearch({ games }: GameSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const searchedGames = useMemo(() => {
    let gamesToSearch = [...games];
    if (!searchTerm.trim()) {
      return [];
    } else {
      const lowerSearchTerm = searchTerm.toLowerCase();
      gamesToSearch = gamesToSearch.filter(
        (game) =>
          game.name.toLowerCase().includes(lowerSearchTerm) ||
          (game.description &&
            game.description.toLowerCase().includes(lowerSearchTerm)),
      );
    }
    return gamesToSearch;
  }, [games, searchTerm]);
  return (
    <div className=" flex flex-col justify-items-center ">
      <label htmlFor="gameSearch">Search games</label>
      <input
        type="text"
        id="gameSearch"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-1 pl-2 border border-olive-400 rounded-lg w-40 bg-white text-black inset-2"
      />

      <div className="z-50 flex flex-col absolute top-40 inset-x-0 items-center justify-items-center">
        {searchedGames.map((game) => (
          <SearchCard key={game.id} {...game} />
        ))}
      </div>
    </div>
  );
}

export default GameSearch;
