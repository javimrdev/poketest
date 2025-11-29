"use client"

import { PokemonData } from "@/logic/pokemon/schemas";
import { StatsContext } from "@/logic/pokemon/statsContext";
import { useContext } from "react";
import { LikeButton } from "../LikeButton/LikeButton";
import { useToggleFavorite } from "@/logic/pokemon/useToggleFavorite";
import Image from "next/image";


type PokemonStatsProps = {
    children: React.ReactNode;
    pokemonStats: PokemonData;
}

export const PokemonStats = ({ children, pokemonStats }: PokemonStatsProps) => {
    return (
        <StatsContext.Provider value={{ pokemonStats }}>
            <div className="w-full max-w-md mx-auto p-4">
                {children}
            </div>
        </StatsContext.Provider>
    );
};

export const PokemonStatsHeader = () => {
    const { pokemonStats: { name, id } } = useContext(StatsContext);
    const { toggleFavorite } = useToggleFavorite();
    return (
        <div className="flex w-full justify-between">
            <h1 className="text-3xl font-bold capitalize mb-4">{name}</h1>
            <div className="flex items-center gap-4 mb-4">
                <LikeButton id={id} toggleFavorite={() => toggleFavorite(id, name)} />
            </div>
        </div>
    );
};

export const PokemonImage = () => {
    const { pokemonStats: { name, pokemonsprites } } = useContext(StatsContext);
    return (
        <div className="flex w-full justify-center flex-wrap gap-4">
            {pokemonsprites && (
                <Image
                    src={pokemonsprites}
                    alt={`${name} front default sprite`}
                    className="w-32 h-32 object-contain bg-gray-100 rounded-lg p-2"
                    width={128}
                    height={128}
                />
            )}
        </div>
    );
}

export const PokemonStatsBody = () => {
    const { pokemonStats: { pokemontypes, pokemonstats } } = useContext(StatsContext);
    return (
        <>
            <div className="mt-4">
                <h2 className="text-2xl font-semibold mb-2">Types</h2>
                <div className="flex flex-wrap gap-2">
                    {pokemontypes?.map((typeInfo) => (
                        <span
                            key={typeInfo.type.name}
                            className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm capitalize"
                        >
                            {typeInfo.type.name}
                        </span>
                    ))}
                </div>
            </div>

            <div className="mt-4">
                <h2 className="text-2xl font-semibold mb-2">Stats</h2>
                <ul className="list-disc list-inside">
                    {pokemonstats?.map((statInfo) => (
                        <li key={statInfo.stat.name} className="text-md capitalize">
                            {statInfo.stat.name}: {statInfo.base_stat}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}