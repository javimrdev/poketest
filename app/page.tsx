
import { Pagination } from "@/components/Pagination/Pagination";
import { PokemonList } from "@/components/PokemonList/PokemonList";
import { PokemonListWrapper } from "@/components/PokemonList/PokemonListWrapper";
import { getClient } from "@/lib/apollo/apollo.client";
import { GET_POKEMON_LIST } from "@/logic/graphql/queries";
import { PokemonList as PokemonListType, pokemonListSchema } from "@/logic/pokemon/schemas";

export default async function Home() {
  const page = 1;
  const pokemonClient = getClient();
  const { data } = await pokemonClient.query<PokemonListType>({
    query: GET_POKEMON_LIST,
    fetchPolicy: "no-cache",
    variables: {
      limit: 20,
      offset: 0,
    },
  });

  const pokemonList = pokemonListSchema.safeParse(data);
  if (!pokemonList.success) {
    return <div>Something went wrong</div>;
  }

  return <div className="flex flex-col gap-4 w-full max-w-md mx-auto p-4">
    <h1 id="pokemon-list" className="text-2xl font-bold mb-2">Pokemons list</h1>
    <PokemonListWrapper>
      <PokemonList pokemonList={pokemonList.data.pokemon} page={page} />
    </PokemonListWrapper>
    <Pagination page={page} totalPages={pokemonList.data.totalCount / 20} />
  </div>
}
