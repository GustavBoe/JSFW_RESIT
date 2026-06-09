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
      <div className="flex flex-col items-center rounded-md p-2 w-50 h-60 border">
        <h3>{game.name}</h3>
        <div className="relative w-full h-full overflow-hidden ">
          {/*Image, genre and release container*/}
          <img
            src={game.image.url}
            alt={game.image.alt}
            className="w-full h-full object-cover rounded-tl-lg rounded-tr-lg"
          />
          <div className="absolute bottom-0 flex flex-row justify-between text-white w-full bg-[#4d9bdf]">
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
