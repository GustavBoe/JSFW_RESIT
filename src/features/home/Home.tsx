import { useEffect, useState } from "react";
import getAllGames from "./services/allGamesAPI";
import { Loader } from "lucide-react";
import { GameCard } from "./components/GameCard";
import type { SingleGame } from "./components/GameCard";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [games, setGames] = useState<SingleGame[]>([]);
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
        //setMeta(gameData.meta ?? {});
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
    <section id="top" className="min-h-screen">
      {isLoading ?
        <div className="flex flex-col items-center mx-auto pt-50">
          <p className="animate-bounce text-xl text-primary font-medium">
            Loading games
          </p>
          <Loader size={48} />
        </div>
      : <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 justify-items-center">
          {games.map((game) => (
            <GameCard key={game.id} {...game} />
          ))}
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
      }
    </section>
  );
}
