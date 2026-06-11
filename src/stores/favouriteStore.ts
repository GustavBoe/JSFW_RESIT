import type { SingleGame } from "@/features/home/components/GameCard";
import { create } from "zustand";

interface FavouriteState {
  favouritedGames: SingleGame[];
  addGame: (game: SingleGame) => void;
  removeGame: (id: number) => void;
}
const useFavouriteStore = create<FavouriteState>((set) => ({
  favouritedGames: [],

  addGame: (game) =>
    set((state) => {
      const existingGame = state.favouritedGames.find(
        (favouriteGame) => favouriteGame.id === game.id,
      );
      if (existingGame) {
        return state;
      }

      const newFavouriteGame = { ...game };
      const updatedFavouritedGames = [
        ...state.favouritedGames,
        newFavouriteGame,
      ];

      return { favouritedGames: updatedFavouritedGames };
    }),

  removeGame: (id) =>
    set((state) => {
      const updatedFavouritedGames = state.favouritedGames.filter(
        (favouriteGame: SingleGame) => favouriteGame.id !== id,
      );

      return { favouritedGames: updatedFavouritedGames };
    }),
  clearCart: () => set({ favouritedGames: [] }),
}));

export default useFavouriteStore;
