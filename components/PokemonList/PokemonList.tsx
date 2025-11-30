"use client"

import { Pokemon } from "@/logic/pokemon/schemas";
import { usePokemonList } from "./usePokemonList";
import { PokemonListItem } from "./PokemonListItem/PokemonListItem";
import { DEFAULT_OFFSET } from "../Pagination/config";

type PokemonListItemsProps = {
    pokemonList: Pokemon[];
    page: number;
}

export const PokemonList = ({ pokemonList, page }: PokemonListItemsProps) => {
    const {
        toggleFavorite,
        isFavorite,
        list,
    } = usePokemonList({ initialPokemon: pokemonList, page, offset: DEFAULT_OFFSET });
    return (
        list.map((pokemon: Pokemon) =>
            <PokemonListItem
                key={pokemon.id}
                pokemon={pokemon}
                toggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
            />
        )
    );
};
