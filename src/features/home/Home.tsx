import { useEffect, useState } from "react";
import getAllGames from "@/features/home/services/allGamesAPI";
import { Loader } from "lucide-react";
import GameSearch from "./components/GameSearch";
import { GameCard } from "@/features/home/components/GameCard";
import type { SingleGame } from "@/features/home/components/GameCard";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [games, setGames] = useState<SingleGame[]>([]);

  const [sort, setSort] = useState<"all" | "year" | "name">("all");

  const sortedByYear = [...games].sort(
    (a, b) => parseInt(a.released) - parseInt(b.released),
  );
  const sortedByName = [...games].sort((a, b) => a.name.localeCompare(b.name));
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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

  return (
    <section id="top" className="min-h-screen mx-auto">
      {isLoading ?
        <div className="flex flex-col items-center mx-auto pt-50">
          <p className="animate-bounce text-xl text-primary font-medium">
            Loading games
          </p>
          <Loader size={48} />
        </div>
      : <div>
          <div className="flex flex-col items-center mb-10 relative ">
            <GameSearch games={games} />
            <div className="w-50 flex flex-row justify-around">
              <button onClick={() => setSort("all")}>All</button>
              <button onClick={() => setSort("year")}>Released</button>
              <button onClick={() => setSort("name")}>Name</button>
            </div>
          </div>
          <section className="max-w-120 md:max-w-170 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 justify-items-center mx-auto ">
            {sort === "all" ?
              games.map((game) => <GameCard key={game.id} {...game} />)
            : null}
            {sort === "year" ?
              sortedByYear.map((game) => <GameCard key={game.id} {...game} />)
            : null}
            {sort === "name" ?
              sortedByName.map((game) => <GameCard key={game.id} {...game} />)
            : null}
            <div
              onClick={() => scrollToSection("top")}
              className="flex flex-col items-center rounded-md w-50 h-60  bg-[#4d9bdf] hover:bg-[#60abec] shadow-[#345c80] shadow-sm hover:shadow-md transition-shadow duration-200 group">
              <h3 className="border-b-2 w-full text-center text-white font-medium">
                Coming soon
              </h3>
              <div className="relative w-full h-full overflow-hidden ">
                {/*Image, genre and release container*/}
                <div className="w-full h-full object-cover rounded-b-md" />
                <div className="absolute bottom-0 rounded-b-md flex flex-row justify-between text-white w-full bg-[#4d9bdf] group-hover:bg-[#60abec] border-t-2">
                  <div className=" pl-1 flex flex-row items-center gap-2">
                    More games
                  </div>

                  <p className="pr-1">2027</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      }
    </section>
  );
}
