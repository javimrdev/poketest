import { useAtomValue } from "jotai"
import { favoritesAtom } from "./state"

export const useIsFavorite = (id: number) => {
    const favorites = useAtomValue(favoritesAtom)
    const favoriteIds = favorites.map((favorite) => favorite.id)
    const isFavorite = favoriteIds.includes(id)
    return isFavorite
}