import z from "zod";

export const pokemonSchema = z.object({
    name: z.string(),
    id: z.coerce.number(),
});

export const pokemonListSchema = z.object({
    pokemon: z.array(pokemonSchema),
});

const SpriteUrlSchema = z.string().url().nullable();

const StatNameSchema = z.object({
    name: z.string(),
});

const PokemonStatSchema = z.object({
    base_stat: z.number().int(),
    stat: StatNameSchema,
});
const TypeNameSchema = z.object({
    name: z.string(),
});

const PokemonTypeSchema = z.object({
    type: TypeNameSchema,
});

const HomeSpritesSchema = z.object({
    front_default: SpriteUrlSchema,
});

const OtherSpritesSchema = z.object({
    home: HomeSpritesSchema,
});
const SpritesObjectSchema = z.object({
    other: OtherSpritesSchema,
});

const PokemonSpritesSchema = z.object({
    sprites: SpritesObjectSchema,
});

const MoveNameSchema = z.object({
    name: z.string(),
});

const PokemonMoveSchema = z.object({
    pokemon_id: z.number().int(),
    move: MoveNameSchema,
});

export const pokemonInfoSchema = z.object({
    name: z.string(),
    id: z.number().int(),
    pokemonstats: z.array(PokemonStatSchema),
    pokemontypes: z.array(PokemonTypeSchema),
    pokemonsprites: z.array(PokemonSpritesSchema), // Es un array
    pokemonmoves: z.array(PokemonMoveSchema),
}).transform(({ pokemonsprites, ...rest }) => ({
    ...rest,
    pokemonsprites: pokemonsprites[0].sprites.other.home.front_default,
}));

export const pokemonDataSchema = z.object({
    pokemon: z.array(pokemonInfoSchema), // Es un array de Pokémon
}).transform((data) => data.pokemon[0]);

export type PokemonList = z.infer<typeof pokemonListSchema>;
export type Pokemon = z.infer<typeof pokemonSchema>;
export type PokemonData = z.infer<typeof pokemonDataSchema>;
