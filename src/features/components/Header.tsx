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
      className="flex flex-row items-center relative md:flex md:justify-between  h-15 border-b border-border text-primary">
      <div className="flex items-center justify-between px-7 w-full text-xs">
        <Link to={"/"} className=" text-3xl text-primary">
          Pastimes
        </Link>
        <div className="hidden md:flex items-center gap-6 "></div>

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
            className="md:hidden flex flex-col items-center absolute top-full text-lg left-0 w-full z-50 shadow-lg  bg-white border-t border-b-5  border-border hover:cursor-pointer"></div>
        )}
      </div>
    </nav>
  );
}
