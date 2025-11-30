import { render, screen } from '@testing-library/react';
import { PokemonList } from './PokemonList';
import { usePokemonList } from './usePokemonList';

// Mock usePokemonList hook
jest.mock('./usePokemonList');

// Mock PokemonListItem component
jest.mock('./PokemonListItem/PokemonListItem', () => ({
    PokemonListItem: ({ pokemon }: any) => (
        <div data-testid="pokemon-item">{pokemon.name}</div>
    ),
}));

describe('PokemonList', () => {
    const mockPokemonList = [
        { id: 1, name: 'bulbasaur' },
        { id: 2, name: 'ivysaur' },
    ];

    beforeEach(() => {
        (usePokemonList as jest.Mock).mockReturnValue({
            list: mockPokemonList,
            toggleFavorite: jest.fn(),
            isFavorite: jest.fn(),
        });
    });

    it('renders list of pokemon items', () => {
        render(<PokemonList pokemonList={mockPokemonList} page={1} />);

        const items = screen.getAllByTestId('pokemon-item');
        expect(items).toHaveLength(2);
        expect(items[0]).toHaveTextContent('bulbasaur');
        expect(items[1]).toHaveTextContent('ivysaur');
    });

    it('calls usePokemonList with correct arguments', () => {
        render(<PokemonList pokemonList={mockPokemonList} page={2} />);

        expect(usePokemonList).toHaveBeenCalledWith({
            initialPokemon: mockPokemonList,
            page: 2,
            offset: 20,
        });
    });
});
