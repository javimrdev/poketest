import clsx from "clsx";
import { Heart } from "lucide-react";

export const PokemonListItemButton = ({
    pokemonId,
    onClick,
    isFavorite,
}: {
    pokemonId: number;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    isFavorite: (id: number) => boolean;
}) => {
    return (
        <button
            onClick={(e) => onClick(e)}
            className="focus:outline-none"
        >
            <Heart
                className={clsx(
                    "w-5 h-5 transition-colors duration-200",
                    isFavorite(pokemonId) ? "text-red-500 fill-red-500" : "text-gray-400 group-hover:text-red-500"
                )}
            />
        </button>
    );
};