import { GET_POKEMON_LIST } from "@/logic/graphql/queries";
import { getClient } from "@/lib/apollo/apollo.client";
import { PokemonList, pokemonListSchema } from "../logic/pokemon/schemas";
import Link from "next/link";

export default async function Home() {
  const pokemonClient = getClient();
  const { data } = await pokemonClient.query<PokemonList>({
    query: GET_POKEMON_LIST,
    fetchPolicy: "no-cache",
    variables: {
      limit: 10,
      offset: 0,
    },
  });
  console.log(data);
  const pokemonList = pokemonListSchema.safeParse(data);
  console.log(pokemonList);
  if (!pokemonList.success) {
    return <div>Something went wrong</div>;
  }

  const pokemonListData = pokemonList.data.pokemon;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Pokemons list</h1>
      <ul>
        {pokemonListData.map((pokemon) => (
          <li key={pokemon.id}>
            <Link href={`/pokemon/${pokemon.id}`}>{pokemon.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
