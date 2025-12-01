import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { PokemonListItem } from "./PokemonListItem";

describe("PokemonListItem", () => {
  const mockPokemon = { id: 1, name: "bulbasaur" };
  const mockToggleFavorite = vi.fn();
  const mockIsFavorite = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders pokemon name correctly", () => {
    render(<PokemonListItem pokemon={mockPokemon} toggleFavorite={mockToggleFavorite} isFavorite={mockIsFavorite} />);

    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
  });

  it("renders link to pokemon details", () => {
    render(<PokemonListItem pokemon={mockPokemon} toggleFavorite={mockToggleFavorite} isFavorite={mockIsFavorite} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/pokemon/1");
  });

  it("calls toggleFavorite when like button is clicked", () => {
    render(<PokemonListItem pokemon={mockPokemon} toggleFavorite={mockToggleFavorite} isFavorite={mockIsFavorite} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    // Assuming the first argument is the event, and the second is the ID
    expect(mockToggleFavorite).toHaveBeenCalledWith(expect.anything(), 1);
  });
});
