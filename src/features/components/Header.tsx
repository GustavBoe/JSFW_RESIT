import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const wrapperRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    function handleClickOutside() {
      setIsOpen(false);
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav
      ref={wrapperRef}
      className="flex flex-row items-center relative md:flex md:justify-between w-full h-15 border-b border-border text-primary">
      <div className="flex items-center justify-between px-7 w-full text-xs">
        <Link to={"/"} className="font-logo text-logo text-3xl text-primary">
          Pastime
        </Link>
        <div className="hidden md:flex items-center gap-6 ">
          <Link to={"/favourites"}>My favourites</Link>
          <Link to={"/genres"}>Genres</Link>
        </div>

        <button
          className="md:hidden flex flex-col hover:cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen((prev) => !prev);
          }}>
          {!isOpen ?
            <Menu size={28} />
          : <X size={28} />}
        </button>

        {isOpen && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="md:hidden flex flex-col items-center  absolute top-full text-lg left-0 w-full z-50 shadow-lg  bg-white border-t border-b-5  border-border hover:cursor-pointer">
            <Link
              to={"/favourites"}
              className="py-5 w-full flex flex-col items-center cursor-pointer hover:font-semibold font-heading border-b hover:text-white hover:bg-linear-to-r hover:from-pink-500 hover:via-blue-500 hover:to-red-500">
              My favourites
            </Link>
            <Link
              to={"/genres"}
              className="py-5 w-full text-center cursor-pointer hover:font-semibold font-heading hover:text-white hover:bg-linear-to-r hover:from-blue-500 hover:via-green-500 hover:to-red-500">
              Genres
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
