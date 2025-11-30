"use client"

import { Pagination } from "@/components/Pagination/Pagination";
import { PokemonListWrapper } from "@/components/PokemonList/PokemonListWrapper";
import { PokemonListItem } from "@/components/PokemonList/PokemonListItem/PokemonListItem";
import { useFavoritesPagination } from "@/components/PokemonList/useFavoritesPagination";
import { useParams } from "next/navigation";

const OFFSET = 20;

export default function FavoritesPage() {
    const params = useParams();
    const page = Number(params.page);
    const isNaNPage = isNaN(page);

    const {
        list,
        toggleFavorite,
        isFavorite,
        totalFavorites,
        totalPages,
    } = useFavoritesPagination({ page, offset: OFFSET });

    if (isNaNPage) {
        return <div className="flex flex-col gap-4 w-full max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
        </div>;
    }

    if (totalFavorites === 0) {
        return <div className="flex flex-col gap-4 w-full max-w-md mx-auto p-4">
            <h1 id="favorites-list" className="text-2xl font-bold mb-2">Favorite Pokémon</h1>
            <p className="text-muted-foreground">No favorite Pokémon yet. Start adding some from the main list!</p>
        </div>;
    }

    return <div className="flex flex-col gap-4 w-full max-w-md mx-auto p-4">
        <h1 id="favorites-list" className="text-2xl font-bold mb-2">
            Favorite Pokémon ({totalFavorites})
        </h1>
        <PokemonListWrapper>
            {list.map((pokemon) => (
                <PokemonListItem
                    key={pokemon.id}
                    pokemon={pokemon}
                    toggleFavorite={toggleFavorite}
                    isFavorite={isFavorite}
                />
            ))}
        </PokemonListWrapper>
        {totalPages > 1 && (
            <Pagination page={page} basePath="/favorites" totalPages={totalPages} />
        )}
    </div>
}

