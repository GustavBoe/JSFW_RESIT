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
    <div className="border flex flex-col items-center w-[70%]">
      <label htmlFor="gameSearch">Search games</label>
      <input
        type="text"
        id="gameSearch"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-1 pl-2 border rounded-lg w-40"
      />

      <div className="z-50  flex flex-col justify-items-center  mx-auto">
        {searchedGames.map((game) => (
          <SearchCard key={game.id} {...game} />
        ))}
      </div>
    </div>
  );
}

export default GameSearch;
