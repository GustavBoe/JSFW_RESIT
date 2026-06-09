import { Link } from "react-router";
export function GenrePill({ genre }: { genre: string }) {
  return (
    <Link
      to={"/genres"}
      state={genre}
      className="pl-1 pr-1 border rounded-xl text-[8px] text-[#3e3e3e] hover:border-white hover:text-white">
      {genre}
    </Link>
  );
}
