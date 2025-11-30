import { renderHook, act } from '@testing-library/react';
import { useToggleFavorite } from './useToggleFavorite';
import { useAtom } from 'jotai';

// Mock jotai useAtom
jest.mock('jotai', () => ({
    useAtom: jest.fn(),
    atom: jest.fn(),
}));

describe('useToggleFavorite', () => {
    const mockSetFavorites = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('adds pokemon to favorites if not already favorite', () => {
        (useAtom as jest.Mock).mockReturnValue([[], mockSetFavorites]);

        const { result } = renderHook(() => useToggleFavorite());

        act(() => {
            result.current.toggleFavorite(1, 'bulbasaur');
        });

        expect(mockSetFavorites).toHaveBeenCalledWith([{ id: 1, name: 'bulbasaur' }]);
    });

    it('removes pokemon from favorites if already favorite', () => {
        const mockFavorites = [{ id: 1, name: 'bulbasaur' }];
        (useAtom as jest.Mock).mockReturnValue([mockFavorites, mockSetFavorites]);

        const { result } = renderHook(() => useToggleFavorite());

        act(() => {
            result.current.toggleFavorite(1, 'bulbasaur');
        });

        expect(mockSetFavorites).toHaveBeenCalledWith([]);
    });
});
