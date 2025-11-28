import z from "zod";

export const pokemonSchema = z.object({
    name: z.string(),
    id: z.coerce.number(),
});

export const pokemonListSchema = z.object({
    pokemon: z.array(pokemonSchema),
});

export type PokemonList = z.infer<typeof pokemonListSchema>;
export type Pokemon = z.infer<typeof pokemonSchema>;