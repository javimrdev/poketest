
import { Pagination } from "@/components/Pagination/Pagination";
import { PokemonList } from "@/components/PokemonList/PokemonList";
import { PokemonListWrapper } from "@/components/PokemonList/PokemonListWrapper";
import { getClient } from "@/lib/apollo/apollo.client";
import { GET_POKEMON_LIST } from "@/logic/graphql/queries";
import { PokemonList as PokemonListType, pokemonListSchema } from "@/logic/pokemon/schemas";
import { ErrorPage } from "@/components/ErrorPage/ErrorPage";
import { notFound } from "next/navigation";


export default async function Page({ params }: { params: Promise<{ page: string }> }) {
    const { page } = await params;
    const isNaNPage = isNaN(Number(page));

    if (isNaNPage || Number(page) < 1) {
        notFound();
    }

    let data;
    try {
        const pokemonClient = getClient();
        const result = await pokemonClient.query<PokemonListType>({
            query: GET_POKEMON_LIST,
            fetchPolicy: "no-cache",
            variables: {
                limit: 20,
                offset: (Number(page) - 1) * 20,
            },
        });
        data = result.data;
    } catch (error) {
        console.error("Error fetching Pokemon list:", error);
        return <ErrorPage
            title="Failed to Load Pokemon"
            message="We couldn't load the Pokemon list. Please check your connection and try again."
        />;
    }

    const pokemonList = pokemonListSchema.safeParse(data);

    if (!pokemonList.success) {
        console.error("Schema validation error:", pokemonList.error);
        return <ErrorPage
            title="Data Error"
            message="The Pokemon data received is invalid. Please try again later."
        />;
    }

    if (pokemonList.data.pokemon.length === 0) {
        notFound();
    }

    return <div className="flex flex-col gap-4 w-full max-w-md mx-auto p-4">
        <h1 id="pokemon-list" className="text-2xl font-bold mb-2">Pokemons list</h1>
        <PokemonListWrapper>
            <PokemonList pokemonList={pokemonList.data.pokemon} page={Number(page)} />
        </PokemonListWrapper>
        <Pagination page={Number(page)} />
    </div>
}
