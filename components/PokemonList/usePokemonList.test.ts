import { renderHook, act } from '@testing-library/react';
import { usePokemonList } from './usePokemonList';
import { useAtom } from 'jotai';

// Mock jotai useAtom
jest.mock('jotai', () => ({
    useAtom: jest.fn(),
    atom: jest.fn(),
}));

describe('usePokemonList', () => {
    const mockInitialPokemon = [
        { id: 1, name: 'bulbasaur' },
        { id: 2, name: 'ivysaur' },
        { id: 3, name: 'venusaur' },
    ];
    const mockSetFavorites = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useAtom as jest.Mock).mockReturnValue([[], mockSetFavorites]);
    });

    it('returns initial list correctly', () => {
        const { result } = renderHook(() => usePokemonList({
            initialPokemon: mockInitialPokemon,
            page: 1,
            offset: 20
        }));

        expect(result.current.list).toHaveLength(3);
        expect(result.current.list).toEqual(mockInitialPokemon);
    });

    it('identifies favorite pokemon correctly', () => {
        (useAtom as jest.Mock).mockReturnValue([[{ id: 1, name: 'bulbasaur' }], mockSetFavorites]);

        const { result } = renderHook(() => usePokemonList({
            initialPokemon: mockInitialPokemon,
            page: 1,
            offset: 20
        }));

        expect(result.current.isFavorite(1)).toBe(true);
        expect(result.current.isFavorite(2)).toBe(false);
    });

    it('adds pokemon to favorites', () => {
        const { result } = renderHook(() => usePokemonList({
            initialPokemon: mockInitialPokemon,
            page: 1,
            offset: 20
        }));

        const mockEvent = {
            preventDefault: jest.fn(),
            stopPropagation: jest.fn(),
        } as unknown as React.MouseEvent;

        act(() => {
            result.current.toggleFavorite(mockEvent, 1);
        });

        expect(mockSetFavorites).toHaveBeenCalledWith([{ id: 1, name: 'bulbasaur' }]);
    });
});
