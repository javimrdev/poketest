import { useAtom } from "jotai";
import { useMemo } from "react";
import { favoritesAtom } from "@/logic/pokemon/state";

type Props = {
  page: number;
  offset: number;
};

export const useFavoritesPagination = ({ page, offset }: Props) => {
  const [favorites, setFavorites] = useAtom(favoritesAtom);

  const toggleFavorite = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();

    const isFavorite = favorites.some((fav) => fav.id === id);

    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav.id !== id));
    }
  };

  const isFavorite = useMemo(() => {
    return (id: number) => favorites.some((p) => p.id === id);
  }, [favorites]);

  const paginatedFavorites = useMemo(() => {
    const start = (page - 1) * offset;
    const end = start + offset;
    return favorites.slice(start, end);
  }, [favorites, page, offset]);

  const totalPages = Math.ceil(favorites.length / offset);

  return {
    list: paginatedFavorites,
    page,
    toggleFavorite,
    isFavorite,
    totalPages,
    totalFavorites: favorites.length,
  };
};
