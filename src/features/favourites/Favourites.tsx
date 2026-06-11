import useFavouriteStore from "@/stores/favouriteStore";
import { GameCard } from "../home/components/GameCard";

export default function Favourites() {
  const { favouritedGames, removeGame } = useFavouriteStore();

  return (
    <section>
      <h1>Favourites</h1>
      <div className="flex">
        {favouritedGames.map((game) => (
          <div>
            <GameCard key={game.id} {...game} />
            <button onClick={() => removeGame(game.id)}>
              Remove from favourites
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
