import { useState, useEffect, useMemo, startTransition, useRef } from "react";
import { useAtom } from "jotai";
import { Pokemon, PokemonList as PokemonListType } from "@/logic/pokemon/schemas";
import { favoritesAtom } from "@/logic/pokemon/state";

type Props = {
    initialPokemon: Pokemon[];
    page: number;
}

export const usePokemonList = ({ initialPokemon, page }: Props) => {
    const [favorites, setFavorites] = useAtom(favoritesAtom);
    const [displayList, setDisplayList] = useState<Pokemon[]>(initialPokemon.filter((p) => !favorites.some((fav) => fav.id === p.id)));

    const toggleFavorite = (e: React.MouseEvent, id: number) => {
        e.preventDefault();
        e.stopPropagation();
        startTransition(() => {
            const isFavorite = favorites.some((fav) => fav.id === id);
            const pokemon = displayList.find((p) => p.id === id);
            if (isFavorite) {
                // Remove from favorites
                const pokemonToRemove = favorites.find((p) => p.id === id);
                setFavorites((prev) => prev.filter((fav) => fav.id !== id));
                if (pokemonToRemove) {
                    setDisplayList((prev) => [...prev, pokemonToRemove].toSorted((a, b) => a.id - b.id));
                }
            } else {
                // Add to favorites
                const pokemonToAdd = displayList.find((p) => p.id === id);
                if (pokemonToAdd) {
                    setFavorites((prev) => [...prev, pokemonToAdd]);
                    setDisplayList((prev) => prev.filter((p) => p.id !== id));
                }
            }
        });
    };

    // Check if a pokemon is in favorites
    const isFavorite = (id: number) => favorites.some(p => p.id === id);

    return {
        favorites,
        displayList,
        page,
        toggleFavorite,
        isFavorite,
    };
};
