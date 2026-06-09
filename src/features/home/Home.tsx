import { useEffect, useState } from "react";
import getAllGames from "./services/allGamesAPI";
import { Loader } from "lucide-react";
import { GameCard } from "./components/GameCard";
import type { SingleGame } from "./components/GameCard";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [games, setGames] = useState<SingleGame[]>([]);
  //onst [meta, setMeta] = useState({});
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
    <section className="min-h-screen">
      {isLoading ?
        <div className="flex flex-col items-center mx-auto pt-50">
          <p className="animate-bounce text-xl text-primary font-medium">
            Loading games
          </p>
          <Loader size={48} />
        </div>
      : <section className="grid grid-cols-2 md:grid-cols-3 gap-5 justify-items-center">
          {games.map((game) => (
            <GameCard key={game.id} {...game} />
          ))}
        </section>
      }
    </section>
  );
}
