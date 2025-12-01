"use client";

import type { Pokemon } from "@/logic/pokemon/schemas";
import { DEFAULT_OFFSET } from "../Pagination/config";
import { PokemonListItem } from "./PokemonListItem/PokemonListItem";
import { usePokemonList } from "./usePokemonList";

type PokemonListItemsProps = {
  pokemonList: Pokemon[];
  page: number;
};

export const PokemonList = ({ pokemonList, page }: PokemonListItemsProps) => {
  const { toggleFavorite, isFavorite, list } = usePokemonList({
    initialPokemon: pokemonList,
    page,
    offset: DEFAULT_OFFSET,
  });
  return list.map((pokemon: Pokemon) => (
    <PokemonListItem key={pokemon.id} pokemon={pokemon} toggleFavorite={toggleFavorite} isFavorite={isFavorite} />
  ));
};
