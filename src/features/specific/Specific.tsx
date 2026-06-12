import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { toast } from "react-hot-toast";
import { Loader, Heart } from "lucide-react";
import getSpecificGame from "./services/specificGameAPI";
import useFavouriteStore from "@/stores/favouriteStore";
import type { SingleGame } from "../home/components/GameCard";
import { GenrePill } from "@/features/home/components/GenrePill";
import AddedToast from "@/features/components/toasts/AddedToast";
import RemovedToast from "@/features/components/toasts/RemovedToast";

export default function Specific() {
  const params = useParams();
  const gameId = params.gameId;
  const [isLoading, setIsLoading] = useState(false);
  const [game, setGame] = useState<SingleGame>();
  const { favouritedGames, addGame, removeGame } = useFavouriteStore();

  const isFavourite = favouritedGames.some(
    (favouriteGame) => favouriteGame.id === game?.id,
  );

  useEffect(() => {
    const loadSpecific = async () => {
      try {
        setIsLoading(true);
        const gameData = await getSpecificGame(gameId);
        setGame(gameData?.data);
      } catch (error) {
        alert(error);
      } finally {
        setIsLoading(false);
      }
      return () => {
        console.log("Specific unmounted");
      };
    };
    loadSpecific();
  }, [gameId]);

  return (
    <section>
      {isLoading ?
        <div className="flex flex-col items-center mx-auto pt-50">
          <p className="animate-pulse text-xl text-primary font-medium">
            Loading game
          </p>
          <Loader size={48} className="animate-spin" />
        </div>
      : <section className="flex flex-col items-center">
          <div className="flex flex-col items-center border h-screen min-h-fit w-[80%] mt-10 pt-10">
            <img src={game?.image.url} alt={game?.image.alt} className="w-80" />
            <div className="flex flex-col items-center text-center">
              <h1>{game?.name}</h1>
              <div className="flex items-center">
                <h2>
                  {!isFavourite ? "Set as favourite" : "Remove from favourites"}
                </h2>
                <div
                  onClick={() => {
                    if (!isFavourite) {
                      addGame(game!);
                      toast.custom(() => <AddedToast name={game!.name} />);
                    } else {
                      removeGame(game!.id);
                      toast.custom(() => <RemovedToast name={game!.name} />);
                    }
                  }}
                  className={
                    !isFavourite ?
                      "bg-white/70 p-1 rounded-md"
                    : "bg-[#d54848] text-white p-1 rounded-md"
                  }>
                  <Heart />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center p-5 w-[80%]">
              <h3>Description</h3>
              <article className="border p-5 rounded-md shadow-xl">
                {game?.description}
              </article>
            </div>
            <div className="flex flex-row w-[90%] justify-around bg-black text-white">
              <div className=" border-white flex flex-col items-center">
                <h2>Genres</h2>
                <div className=" pl-1 flex flex-row items-center justify-around gap-2">
                  {game?.genre.map((genre, index) => (
                    <GenrePill key={index} genre={genre} />
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center">
                <h2>Released</h2>
                <p>{game?.released}</p>
              </div>
            </div>
            <div className="flex flex-row w-full justify-around">
              <Link to={"/"}>Back to home</Link>
              <Link to={"/genres"}>Browse genres</Link>
            </div>
          </div>
        </section>
      }
    </section>
  );
}
