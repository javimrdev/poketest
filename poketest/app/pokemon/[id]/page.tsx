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
    const pokemon = parsedData.data;

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold capitalize mb-4">{pokemon.name}</h1>
            <p className="text-lg mb-2">ID: {pokemon.id}</p>
            <div className="flex flex-wrap gap-4">
                {pokemon.pokemonsprites && (
                    <img
                        src={pokemon.pokemonsprites}
                        alt={`${pokemon.name} front default sprite`}
                        className="w-32 h-32 object-contain bg-gray-100 rounded-lg p-2"
                    />
                )}
            </div>
            <div className="mt-4">
                <h2 className="text-2xl font-semibold mb-2">Types</h2>
                <div className="flex flex-wrap gap-2">
                    {pokemon.pokemontypes?.map((typeInfo) => (
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
                    {pokemon.pokemonstats?.map((statInfo) => (
                        <li key={statInfo.stat.name} className="text-md capitalize">
                            {statInfo.stat.name}: {statInfo.base_stat}
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );
}