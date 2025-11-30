import { atom } from "jotai";
import { Pokemon } from "./schemas";

export const favoritesAtom = atom<Pokemon[]>([]);