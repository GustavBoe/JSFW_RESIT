import { Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Home from "@/features/home/Home";
import Specific from "./features/specific/Specific";
import Genres from "./features/genres/Genres";
import Favourites from "./features/favourites/Favourites";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="game/:gameId" element={<Specific />} />
          <Route path="genres" element={<Genres />} />
          <Route path="favourites" element={<Favourites />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
