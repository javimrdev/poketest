
import { Pagination } from "@/components/Pagination/Pagination";
import { PokemonList } from "@/components/PokemonList/PokemonList";
import { getClient } from "@/lib/apollo/apollo.client";
import { GET_POKEMON_LIST } from "@/logic/graphql/queries";
import { PokemonList as PokemonListType, pokemonListSchema } from "@/logic/pokemon/schemas";


export default async function Page({ params }: { params: Promise<{ page: string }> }) {
    const { page } = await params;
    const pokemonClient = getClient();
    const isNaNPage = isNaN(Number(page));

    if (isNaNPage) {
        return <div>Something went wrong</div>;
    }

    const { data } = await pokemonClient.query<PokemonListType>({
        query: GET_POKEMON_LIST,
        fetchPolicy: "no-cache",
        variables: {
            limit: 20,
            offset: Number(page) * 20,
        },
    });
    const pokemonList = pokemonListSchema.safeParse(data);

    if (!pokemonList.success) {
        return <div>Something went wrong</div>;
    }

    return <div className="flex flex-col gap-4 w-full max-w-md mx-auto p-4">
        <h1 id="pokemon-list" className="text-2xl font-bold mb-2">Pokemons list</h1>
        <PokemonList initialPokemon={pokemonList.data.pokemon} page={1} />;
        <Pagination page={Number(page)} />
    </div>
}
