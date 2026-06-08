import { Routes, Route } from "react-router-dom";
import Home from "@/features/home/Home";
import Specific from "./features/specific/Specific";
import Genres from "./features/genres/Genres";
import Favourites from "./features/favourites/Favourites";
function App() {
  return (
    <div>
      <Routes>
        <Route index element={<Home />} />
        <Route path="game" element={<Specific />} />
        <Route path="genres" element={<Genres />} />
        <Route path="favourites" element={<Favourites />} />
      </Routes>
    </div>
  );
}

export default App;
