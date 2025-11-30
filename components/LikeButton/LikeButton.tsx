"use client";

import { useIsFavorite } from "@/logic/pokemon/useIsFavorite";
import clsx from "clsx";
import { Heart } from "lucide-react";

type Props = {
    id: number;
    toggleFavorite: () => void;
}

export const LikeButton = ({ id, toggleFavorite }: Props) => {
    const isFavorite = useIsFavorite(id)
    return (<button
        onClick={toggleFavorite}
        className="focus:outline-none"
    >
        <Heart
            className={clsx(
                "w-5 h-5 transition-colors duration-200",
                isFavorite ? "text-red-500 fill-red-500" : "text-gray-400 group-hover:text-red-500"
            )}
        />
    </button>
    );
};