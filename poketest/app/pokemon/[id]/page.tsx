import { PokemonImage, PokemonStats, PokemonStatsBody, PokemonStatsHeader } from "@/components/PokemonStats/PokemonStats";
import { getClient } from "@/lib/apollo/apollo.client";
import { GET_POKEMON_BY_ID } from "@/logic/graphql/queries";
import { pokemonDataSchema, PokemonData } from "@/logic/pokemon/schemas";

export default async function page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const client = getClient();

    const { data } = await client.query<PokemonData>({
        query: GET_POKEMON_BY_ID,
        fetchPolicy: 'no-cache',
        variables: {
            id: Number(id),
        },
    });

    const parsedData = pokemonDataSchema.safeParse(data);
    if (!parsedData.success) {
        return <div className="p-4 text-red-500">Pokemon {id} not found or data is invalid.</div>;
    }

    return (
        <PokemonStats pokemonStats={parsedData.data}>
            <PokemonStatsHeader />
            <PokemonImage />
            <PokemonStatsBody />
        </PokemonStats>
    );
}