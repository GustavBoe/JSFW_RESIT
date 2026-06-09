import { Link } from "react-router";
export function GenrePill({ genre }: { genre: string }) {
  return (
    <Link
      to={"/genres"}
      state={genre}
      className="pl-1 pr-1 border rounded-xl text-[8px] border-white text-white hover:border-2 hover:font-medium">
      {genre}
    </Link>
  );
}
