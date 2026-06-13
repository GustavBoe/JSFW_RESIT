import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { toast } from "react-hot-toast";
import { Heart } from "lucide-react";
import getSpecificGame from "./services/specificGameAPI";
import useFavouriteStore from "@/stores/favouriteStore";
import type { SingleGame } from "../home/components/GameCard";
import { GenrePill } from "@/features/home/components/GenrePill";
import AddedToast from "@/features/components/toasts/AddedToast";
import RemovedToast from "@/features/components/toasts/RemovedToast";
import ShowLoader from "../components/ShowLoader";

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
    <section className="">
      {isLoading ?
        <ShowLoader />
      : <section className="flex flex-col items-center ">
          <div className="flex flex-col items-center h-fit w-[80%] mt-10 mb-10 pt-10 gap-5 bg-white rounded-lg drop-shadow-white drop-shadow-sm">
            <img src={game?.image.url} alt={game?.image.alt} className="w-80" />

            <div className="flex flex-row items-center gap-5">
              <h1 className="font-heading font-medium text-3xl">
                {game?.name}
              </h1>
              <div
                title="Set as favourite"
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

            <div className="flex flex-col items-center p-5 w-[80%]">
              <h3 className="font-heading text-xl">Description</h3>
              <article className="border p-5 rounded-md shadow-xl font-paragraph">
                {game?.description}
              </article>
            </div>

            <div className="flex flex-row w-[90%] justify-around  text-black">
              <div className=" border-white flex flex-col items-center">
                <h2 className="font-heading">Genres</h2>
                <div className=" pl-1 flex flex-row items-center justify-around gap-2 ">
                  {game?.genre.map((genre, index) => (
                    <GenrePill key={index} genre={genre} />
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center">
                <h2 className="font-heading">Released</h2>
                <p className="font-paragraph">{game?.released}</p>
              </div>
            </div>
            <div className="flex flex-row w-full justify-around mb-10">
              <Link to={"/"} className="border rounded-md px-5 font-heading">
                Back to home
              </Link>
              <Link
                to={"/genres"}
                className="border rounded-md px-5 font-heading">
                Browse genres
              </Link>
            </div>
          </div>
        </section>
      }
    </section>
  );
}
