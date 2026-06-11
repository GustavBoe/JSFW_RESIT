import { useState, useEffect, useMemo } from "react";
import getAllGames from "@/features/home/services/allGamesAPI";
import { Loader } from "lucide-react";
import type { SingleGame } from "@/features/home/components/GameCard";
import { GameCard } from "@/features/home/components/GameCard";
export default function Genres() {
  const [isLoading, setIsLoading] = useState(false);
  const [games, setGames] = useState<SingleGame[]>([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    const loadGames = async () => {
      setIsLoading(true);

      try {
        const gameData = await getAllGames();

        setGames(gameData.data ?? []);
      } catch (error) {
        alert("Could not get games, see console for details");
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadGames();
  }, []);
  {
    /*const uniqueGenres = useMemo(() => {
    if (games.length === 0) return [""];
    const genresSet = new Set();
    games.forEach((game) => {
      if (Array.isArray(game.genre))
        game.genre.forEach((g) => genresSet.add(g));
      else if (game.genre) genresSet.add(game.genre);
    });
    return ["", ...Array.from(genresSet).sort()];
  }, [games]);*/
  }
  const processedGames = useMemo(() => {
    let gamesToProcess = [...games];

    // 1. Filter by selected genre
    if (selectedGenre !== "All") {
      gamesToProcess = gamesToProcess.filter((game) =>
        Array.isArray(game.genre) ?
          game.genre.includes(selectedGenre)
        : game.genre === selectedGenre,
      );
    }

    return gamesToProcess;
  }, [games, selectedGenre]);
  return (
    <section className="w-full">
      {isLoading ?
        <div className="flex flex-col items-center mx-auto pt-50">
          <p className="animate-bounce text-xl text-primary font-medium">
            Loading games
          </p>
          <Loader size={48} />
        </div>
      : <div className="w-full">
          <section className="grid grid-cols-4 gap-0  md:grid-cols-4 md:w-full mx-auto justify-items-center">
            <button
              onClick={() => setSelectedGenre("All")}
              className="rounded-lg w-30 h-10 md:w-50 md:h-15 bg-[#607D8B] hover:bg-[#607D8B]/70 active:bg-[#607D8B] hover:cursor-pointer text-white text-sm md:text-lg font-semibold  text-center flex flex-col justify-center">
              <p>All</p>
            </button>
            <button
              onClick={() => setSelectedGenre("Action")}
              className="rounded-lg w-30 h-10 md:w-50 md:h-15 bg-[#E53935] hover:bg-[#E53935]/70 active:bg-[#a62523] hover:cursor-pointer text-white text-sm md:text-lg font-semibold text-center flex flex-col justify-center">
              Action
            </button>
            <button
              onClick={() => setSelectedGenre("Racing / Driving")}
              className="rounded-lg w-30 h-10 md:w-50 md:h-15 bg-[#f17705] hover:bg-[#f17705]/70 active:bg-[#cc6503] hover:cursor-pointer text-white text-sm md:text-lg font-semibold  text-center flex flex-col justify-center">
              Racing / Driving
            </button>
            <button
              onClick={() => setSelectedGenre("Puzzle")}
              className="rounded-lg w-30 h-10 md:w-50 md:h-15 bg-[#43A047] hover:bg-[#43A047]/70 active:bg-[#327835] hover:cursor-pointer text-white text-sm md:text-lg font-semibold text-center flex flex-col justify-center">
              Puzzle
            </button>
            <button
              onClick={() => setSelectedGenre("Role-Playing (RPG)")}
              className="rounded-lg w-30 h-10 md:w-50 md:h-15 bg-[#8E24AA] hover:bg-[#8E24AA]/70 active:bg-[#721d88] hover:cursor-pointer text-white text-sm md:text-lg font-semibold text-center flex flex-col justify-center">
              Role Playing (RPG)
            </button>

            <button
              onClick={() => setSelectedGenre("Strategy")}
              className="rounded-lg w-30 h-10 md:w-50 md:h-15 bg-[#3949AB] hover:bg-[#3949AB]/70 active:bg-[#2d3a89] hover:cursor-pointer text-white text-sm md:text-lg font-semibold text-center flex flex-col justify-center">
              Strategy
            </button>

            <button
              onClick={() => setSelectedGenre("Simulation")}
              className="rounded-lg w-30 h-10 md:w-50 md:h-15 bg-[#00897B] hover:bg-[#00897B]/70 active:bg-[#006d62] hover:cursor-pointer text-white text-sm md:text-lg font-semibold text-center flex flex-col justify-center">
              Simulation
            </button>

            <button
              onClick={() => setSelectedGenre("Educational")}
              className="rounded-lg w-30 h-10 md:w-50 md:h-15 bg-[#0370c9] hover:bg-[#0370c9]/70 active:bg-[#024b86] hover:cursor-pointer text-white text-sm md:text-lg font-semibold text-center flex flex-col justify-center">
              Educational
            </button>
          </section>
          <section className="flex flex-col items-center">
            <h1>{selectedGenre}</h1>
            <div className="max-w-120 md:max-w-170 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 justify-items-center mx-auto ">
              {processedGames.map((game) => (
                <GameCard key={game.id} {...game} />
              ))}
            </div>
          </section>
        </div>
      }
    </section>
  );
}
