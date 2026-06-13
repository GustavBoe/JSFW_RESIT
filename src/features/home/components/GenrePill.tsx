import { Link } from "react-router";
import { useLocation } from "react-router";

export function GenrePill({ genre }: { genre: string }) {
  const location = useLocation();

  return (
    <Link
      id={genre}
      to={"/genres"}
      state={genre}
      className={
        !location.pathname.startsWith("/game") ?
          "pl-1 pr-1 border rounded-xl text-[8px] border-white text-white hover:border-2 font-paragraph hover:font-medium"
        : "pl-1 pr-1 border rounded-xl text-[8px] border-black text-black hover:border-2 font-paragraph hover:font-medium"
      }>
      {genre}
    </Link>
  );
}
