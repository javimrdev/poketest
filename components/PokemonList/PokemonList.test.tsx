import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, type Mock, vi } from "vitest";
import { PokemonList } from "./PokemonList";
import { usePokemonList } from "./usePokemonList";

// Mock usePokemonList hook
vi.mock("./usePokemonList");

// Mock PokemonListItem component
vi.mock("./PokemonListItem/PokemonListItem", () => ({
  PokemonListItem: ({ pokemon }: { pokemon: { id: number; name: string } }) => (
    <div data-testid="pokemon-item">{pokemon.name}</div>
  ),
}));

describe("PokemonList", () => {
  const mockPokemonList = [
    { id: 1, name: "bulbasaur" },
    { id: 2, name: "ivysaur" },
  ];

  beforeEach(() => {
    (usePokemonList as Mock).mockReturnValue({
      list: mockPokemonList,
      toggleFavorite: vi.fn(),
      isFavorite: vi.fn(),
    });
  });

  it("renders list of pokemon items", () => {
    render(<PokemonList pokemonList={mockPokemonList} page={1} />);

    const items = screen.getAllByTestId("pokemon-item");
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent("bulbasaur");
    expect(items[1]).toHaveTextContent("ivysaur");
  });

  it("calls usePokemonList with correct arguments", () => {
    render(<PokemonList pokemonList={mockPokemonList} page={2} />);

    expect(usePokemonList).toHaveBeenCalledWith({
      initialPokemon: mockPokemonList,
      page: 2,
      offset: 20,
    });
  });
});
