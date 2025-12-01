import { useAtom } from "jotai";
import { favoritesAtom } from "./state";

export const useToggleFavorite = () => {
  const [favorites, setFavorites] = useAtom(favoritesAtom);

  const toggleFavorite = (id: number, name: string) => {
    const isFavorite = favorites.some((pokemon) => pokemon.id === id);
    if (isFavorite) {
      setFavorites(favorites.filter((pokemon) => pokemon.id !== id));
    } else {
      setFavorites([...favorites, { id, name }]);
    }
  };

  return {
    toggleFavorite,
  };
};
