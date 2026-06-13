import { Link } from "react-router";
import toast from "react-hot-toast";
import useFavouriteStore from "@/stores/favouriteStore";
import { GameCard } from "../home/components/GameCard";

import RemovedToast from "@/features/components/toasts/RemovedToast";
export default function Favourites() {
  const { favouritedGames, removeGame } = useFavouriteStore();

  return (
    <section className="flex flex-col items-center gap-5 mt-10 text-white">
      <h1 className="text-2xl font-heading font-semibold">My favourites</h1>
      {favouritedGames.length === 0 && (
        <div className="flex flex-col items-center gap-2 mx-auto">
          <h2 className="font-paragraph">No favourites yet!</h2>
          <div className="flex w-full justify-between gap-5">
            <Link
              to={"/"}
              className="px-7 py-2 border rounded-md hover:bg-linear-to-r hover:from-logo hover:to-game">
              Browse games
            </Link>
            <Link
              to={"/genres"}
              className="px-7 py-2 border rounded-md hover:bg-linear-to-r hover:from-blue-500 hover:via-green-500 hover:to-red-500">
              Browse genres
            </Link>
          </div>
        </div>
      )}
      <div className="max-w-120  md:max-w-170 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-10 justify-items-center mx-auto ">
        {favouritedGames.map((game) => (
          <div className="flex flex-col">
            <GameCard key={game.id} {...game} />
            <button
              onClick={() => {
                removeGame(game.id);
                toast.custom(() => <RemovedToast name={game.name} />);
              }}
              className="cursor-pointer font-heading hover:font-semibold">
              Remove from favourites
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
