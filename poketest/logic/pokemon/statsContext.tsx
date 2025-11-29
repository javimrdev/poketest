import { createContext } from "react";
import { PokemonData } from "./schemas";

type StatsContextType = {
    pokemonStats: PokemonData;
}

export const StatsContext = createContext<StatsContextType>({} as StatsContextType)