import { useState, useMemo, startTransition } from "react";
import { useAtom } from "jotai";
import { Pokemon } from "@/logic/pokemon/schemas";
import { favoritesAtom } from "@/logic/pokemon/state";

type Props = {
    initialPokemon: Pokemon[];
    page: number;
    offset: number;
}

const isPokemonOfCurrentPage = (id: number, page: number, offset: number) => {
    const start = page * offset - offset;
    const end = page * offset;
    return id >= start && id < end;
};

export const usePokemonList = ({ initialPokemon, page, offset }: Props) => {
    const [favorites, setFavorites] = useAtom(favoritesAtom);
    const [nonFavorites, setNonFavorites] = useState<Pokemon[]>(initialPokemon);

    const toggleFavorite = (e: React.MouseEvent, id: number) => {
        e.preventDefault();
        e.stopPropagation();

        startTransition(() => {
            const isFavorite = favorites.some((fav) => fav.id === id);

            if (isFavorite) {
                const pokemonToRemove = favorites.find((p) => p.id === id);
                setFavorites(favorites.filter((fav) => fav.id !== id));
                setNonFavorites(nonFavorites.filter((p) => p.id !== id));

                if (pokemonToRemove && isPokemonOfCurrentPage(pokemonToRemove.id, page, offset)) {
                    setNonFavorites(nonFavorites.filter((p) => p.id !== id).toSorted((a, b) => a.id - b.id));
                }
            } else {
                const pokemonToAdd = nonFavorites.find((p) => p.id === id);
                if (pokemonToAdd) {
                    setFavorites([...favorites, pokemonToAdd]);
                    setNonFavorites(nonFavorites.filter((p) => p.id !== id).toSorted((a, b) => a.id - b.id));
                }
            }
        });
    };

    const isFavorite = useMemo(() => {
        return (id: number) => favorites.some(p => p.id === id);
    }, [favorites]);

    return {
        list: [...favorites, ...nonFavorites],
        page,
        toggleFavorite,
        isFavorite,
    };
};