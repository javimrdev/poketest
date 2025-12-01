import { atom } from "jotai";
import type { Pokemon } from "./schemas";

export const favoritesAtom = atom<Pokemon[]>([]);
