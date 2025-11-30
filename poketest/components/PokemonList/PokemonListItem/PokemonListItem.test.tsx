import { render, screen, fireEvent } from '@testing-library/react';
import { PokemonListItem } from './PokemonListItem';

describe('PokemonListItem', () => {
    const mockPokemon = { id: 1, name: 'bulbasaur' };
    const mockToggleFavorite = jest.fn();
    const mockIsFavorite = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders pokemon name correctly', () => {
        render(
            <PokemonListItem
                pokemon={mockPokemon}
                toggleFavorite={mockToggleFavorite}
                isFavorite={mockIsFavorite}
            />
        );

        expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    });

    it('renders link to pokemon details', () => {
        render(
            <PokemonListItem
                pokemon={mockPokemon}
                toggleFavorite={mockToggleFavorite}
                isFavorite={mockIsFavorite}
            />
        );

        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/pokemon/1');
    });

    it('calls toggleFavorite when like button is clicked', () => {
        render(
            <PokemonListItem
                pokemon={mockPokemon}
                toggleFavorite={mockToggleFavorite}
                isFavorite={mockIsFavorite}
            />
        );

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(mockToggleFavorite).toHaveBeenCalledWith(expect.any(mockPokemon), 1);
    });
});
