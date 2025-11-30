import { Pokemon } from "@/logic/pokemon/schemas";
import clsx from "clsx";
import Link from "next/link";
import { ViewTransition } from "react";
import { Heart } from "lucide-react";

type PokemonListItemProps = {
    pokemon: Pokemon;
    toggleFavorite: (e: React.MouseEvent, id: number) => void;
    isFavorite: (id: number) => boolean;
}

export const PokemonListItem = ({ pokemon, toggleFavorite, isFavorite }: PokemonListItemProps) => {
    return (
        <li
            key={pokemon.id}
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
    );
};