import { Pokemon } from "@/logic/pokemon/schemas";
import clsx from "clsx";
import Link from "next/link";
import { PokemonListItemButton } from "./PokemonListItemButton";

type PokemonListItemProps = {
    pokemon: Pokemon;
    toggleFavorite: (e: React.MouseEvent, id: number) => void;
    isFavorite: (id: number) => boolean;
}

export const PokemonListItem = ({ pokemon, toggleFavorite, isFavorite }: PokemonListItemProps) => {
    const { name, id } = pokemon;
    return (
        <li
            key={id}
            className={clsx(
                'group flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors duration-200 cursor-pointer border-b border-gray-200'
            )}
        >
            <Link href={`/pokemon/${id}`} className="flex-grow font-medium capitalize text-gray-700 group-hover:text-gray-900">
                {name}
            </Link>
            <PokemonListItemButton
                pokemonId={id}
                onClick={(e) => toggleFavorite(e, id)}
                isFavorite={(id) => isFavorite(id)}
            />
        </li>
    );
};