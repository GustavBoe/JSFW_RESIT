import { useState, useMemo } from "react";
import type { SingleGame } from "./GameCard";

function GameSearch() {
  const [games] = useState(allGames);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedGames = useMemo(() => {
    if (!searchTerm.trim()) {
      return games;
    }
  });
}

export default GameSearch;
