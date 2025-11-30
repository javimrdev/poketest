import { renderHook } from '@testing-library/react';
import { useIsFavorite } from './useIsFavorite';
import { useAtomValue } from 'jotai';

// Mock jotai useAtomValue
jest.mock('jotai', () => ({
    useAtomValue: jest.fn(),
    atom: jest.fn(),
}));

describe('useIsFavorite', () => {
    const mockFavorites = [
        { id: 1, name: 'bulbasaur' },
        { id: 2, name: 'ivysaur' },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
        (useAtomValue as jest.Mock).mockReturnValue(mockFavorites);
    });

    it('returns true if pokemon is in favorites', () => {
        const { result } = renderHook(() => useIsFavorite(1));
        expect(result.current).toBe(true);
    });

    it('returns false if pokemon is not in favorites', () => {
        const { result } = renderHook(() => useIsFavorite(3));
        expect(result.current).toBe(false);
    });
});
