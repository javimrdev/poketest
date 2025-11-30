import { PokemonImage, PokemonStats, PokemonStatsBody, PokemonStatsHeader, PokemonMoves } from "@/components/PokemonStats/PokemonStats";
import { getClient } from "@/lib/apollo/apollo.client";
import { GET_POKEMON_BY_ID } from "@/logic/graphql/queries";
import { pokemonDataSchema, PokemonData } from "@/logic/pokemon/schemas";
import { ErrorPage } from "@/components/ErrorPage/ErrorPage";
import { notFound } from "next/navigation";

export default async function page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const isNaNId = isNaN(Number(id));

    if (isNaNId || Number(id) < 1) {
        notFound();
    }

    let data;
    try {
        const client = getClient();
        const result = await client.query<PokemonData>({
            query: GET_POKEMON_BY_ID,
            fetchPolicy: 'no-cache',
            variables: {
                id: Number(id),
            },
        });
        data = result.data;
    } catch (error) {
        console.error("Error fetching Pokemon details:", error);
        return <ErrorPage
            title="Failed to Load Pokemon"
            message={`We couldn't load the details for Pokemon #${id}. Please check your connection and try again.`}
        />;
    }

    const parsedData = pokemonDataSchema.safeParse(data);

    if (!parsedData.success) {
        console.error("Schema validation error:", parsedData.error);
        notFound();
    }

    return (
        <PokemonStats pokemonStats={parsedData.data}>
            <PokemonStatsHeader />
            <PokemonImage />
            <PokemonStatsBody />
            <PokemonMoves />
        </PokemonStats>
    );
}