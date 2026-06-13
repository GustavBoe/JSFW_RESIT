import { Link } from "react-router";
import toast from "react-hot-toast";

import { Heart } from "lucide-react";
import useFavouriteStore from "@/stores/favouriteStore";
import { GenrePill } from "@/features/home/components/GenrePill";
import AddedToast from "@/features/components/toasts/AddedToast";
import RemovedToast from "@/features/components/toasts/RemovedToast";
type Image = {
  url: string;
  alt: string;
};
export type SingleGame = {
  id: number;
  slug: string;
  name: string;
  description: string;
  released: string;
  image: Image;
  genre: string[];
};
export function GameCard({ ...game }: SingleGame) {
  const { favouritedGames, addGame, removeGame } = useFavouriteStore();

  const isFavourite = favouritedGames.some(
    (favouriteGame) => favouriteGame.id === game?.id,
  );
  const genreList = game.genre.map((genre) => <GenrePill genre={genre} />);
  return (
    <div className="flex flex-col items-center rounded-md w-50 h-60  bg-[#4d9bdf] hover:bg-[#60abec] shadow-[#345c80] shadow-sm hover:shadow-md transition-shadow duration-200 group">
      <h3 className="border-b-2 w-full text-center text-white font-medium">
        {game.name}
      </h3>
      <div className="relative w-full h-full overflow-hidden ">
        {/*Image, genre and release container*/}
        <Link to={`/game/${game.id}`}>
          <img
            src={game.image.url}
            alt={game.image.alt}
            className="w-full h-full object-cover rounded-b-md group"
          />
        </Link>
        <button
          onClick={() => {
            if (!isFavourite) {
              addGame(game);
              toast.custom(() => <AddedToast name={game.name} />);
            } else {
              removeGame(game.id);
              toast.custom(() => <RemovedToast name={game.name} />);
            }
          }}
          className={
            !isFavourite ?
              "absolute top-2 right-2 bg-white/70 p-1 rounded-md"
            : "absolute top-2 right-2 bg-[#d54848] text-white p-1 rounded-md"
          }>
          <Heart />
        </button>
        <div className="absolute bottom-0 rounded-b-md flex flex-row justify-between text-white w-full bg-[#4d9bdf] group-hover:bg-[#60abec] border-t-2">
          <div className=" pl-1 flex flex-row items-center gap-2">
            {genreList}
          </div>

          <p className="pr-1">{game.released}</p>
        </div>
      </div>
    </div>
  );
}
