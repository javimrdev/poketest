import { act, renderHook } from "@testing-library/react";
import { useAtom } from "jotai";
import { beforeEach, describe, expect, it, type Mock, vi } from "vitest";
import { usePokemonList } from "./usePokemonList";

// Mock jotai useAtom
vi.mock("jotai", () => ({
  useAtom: vi.fn(),
  atom: vi.fn(),
}));

describe("usePokemonList", () => {
  const mockInitialPokemon = [
    { id: 1, name: "bulbasaur" },
    { id: 2, name: "ivysaur" },
    { id: 3, name: "venusaur" },
  ];
  const mockSetFavorites = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useAtom as Mock).mockReturnValue([[], mockSetFavorites]);
  });

  it("returns initial list correctly", () => {
    const { result } = renderHook(() =>
      usePokemonList({
        initialPokemon: mockInitialPokemon,
        page: 1,
        offset: 20,
      }),
    );

    expect(result.current.list).toHaveLength(3);
    expect(result.current.list).toEqual(mockInitialPokemon);
  });

  it("identifies favorite pokemon correctly", () => {
    (useAtom as Mock).mockReturnValue([[{ id: 1, name: "bulbasaur" }], mockSetFavorites]);

    const { result } = renderHook(() =>
      usePokemonList({
        initialPokemon: mockInitialPokemon,
        page: 1,
        offset: 20,
      }),
    );

    expect(result.current.isFavorite(1)).toBe(true);
    expect(result.current.isFavorite(2)).toBe(false);
  });

  it("adds pokemon to favorites", () => {
    const { result } = renderHook(() =>
      usePokemonList({
        initialPokemon: mockInitialPokemon,
        page: 1,
        offset: 20,
      }),
    );

    const mockEvent = {
      preventDefault: vi.fn(),
      stopPropagation: vi.fn(),
    } as unknown as React.MouseEvent;

    act(() => {
      result.current.toggleFavorite(mockEvent, 1);
    });

    expect(mockSetFavorites).toHaveBeenCalledWith([{ id: 1, name: "bulbasaur" }]);
  });
});
