import { Link } from "react-router";
import { GenrePill } from "./GenrePill";

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
  const genreList = game.genre.map((genre) => <GenrePill genre={genre} />);
  return (
    <Link to={`/game/${game.id}`}>
      <div className="flex flex-col items-center rounded-md w-50 h-60  bg-[#4d9bdf] hover:bg-[#60abec] shadow-[#345c80] hover:drop-shadow-lg group">
        <h3 className="border-b-2 w-full text-center text-white font-medium">
          {game.name}
        </h3>
        <div className="relative w-full h-full overflow-hidden ">
          {/*Image, genre and release container*/}
          <img
            src={game.image.url}
            alt={game.image.alt}
            className="w-full h-full object-cover rounded-b-md"
          />
          <div className="absolute bottom-0 rounded-b-md flex flex-row justify-between text-white w-full bg-[#4d9bdf] group-hover:bg-[#60abec] border-t-2">
            <div className=" pl-1 flex flex-row items-center gap-2">
              {genreList}
            </div>

            <p className="pr-1">{game.released}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
