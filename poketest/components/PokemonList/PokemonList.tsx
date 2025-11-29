"use client";

import { GET_POKEMON_BY_IDS, GET_POKEMON_LIST } from "@/logic/graphql/queries";
import { Pokemon, PokemonList as PokemonListType } from "@/logic/pokemon/schemas";
import Link from "next/link";
import { Heart } from "lucide-react";
import clsx from "clsx";
import { ViewTransition } from "react";

import { usePokemonList } from "./usePokemonList";

interface PokemonListProps {
    initialPokemon: Pokemon[];
    page: number;
}

export const PokemonList = ({ initialPokemon, page }: PokemonListProps) => {
    const {
        favorites,
        displayList,
        toggleFavorite,
        isFavorite,
    } = usePokemonList({ initialPokemon, page });

    return (
        <ul className="flex flex-col border border-gray-200 rounded-lg overflow-hidden" style={{ viewTransitionName: 'pokemon-list' }}>
            {[...favorites, ...displayList].map((pokemon: Pokemon) => {
                return (
                    <ViewTransition key={pokemon.id}>
                        <li
                            key={pokemon.id}
                            style={{ viewTransitionName: `pokemon-${pokemon.id}` }}
                            className={clsx(
                                'group flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors duration-200 cursor-pointer border-b border-gray-200'
                            )}
                        >
                            <Link href={`/pokemon/${pokemon.id}`} className="flex-grow font-medium capitalize text-gray-700 group-hover:text-gray-900">
                                {pokemon.name}
                            </Link>
                            <button
                                onClick={(e) => toggleFavorite(e, pokemon.id)}
                                className="focus:outline-none"
                            >
                                <Heart
                                    className={clsx(
                                        "w-5 h-5 transition-colors duration-200",
                                        isFavorite(pokemon.id) ? "text-red-500 fill-red-500" : "text-gray-400 group-hover:text-red-500"
                                    )}
                                />
                            </button>
                        </li>
                    </ViewTransition>
                );
            })}
        </ul>
    );
};
