import { act, renderHook } from "@testing-library/react";
import { useAtom } from "jotai";
import { beforeEach, describe, expect, it, type Mock, vi } from "vitest";
import { useToggleFavorite } from "./useToggleFavorite";

// Mock jotai useAtom
vi.mock("jotai", () => ({
  useAtom: vi.fn(),
  atom: vi.fn(),
}));

describe("useToggleFavorite", () => {
  const mockSetFavorites = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("adds pokemon to favorites if not already favorite", () => {
    (useAtom as Mock).mockReturnValue([[], mockSetFavorites]);

    const { result } = renderHook(() => useToggleFavorite());

    act(() => {
      result.current.toggleFavorite(1, "bulbasaur");
    });

    expect(mockSetFavorites).toHaveBeenCalledWith([{ id: 1, name: "bulbasaur" }]);
  });

  it("removes pokemon from favorites if already favorite", () => {
    const mockFavorites = [{ id: 1, name: "bulbasaur" }];
    (useAtom as Mock).mockReturnValue([mockFavorites, mockSetFavorites]);

    const { result } = renderHook(() => useToggleFavorite());

    act(() => {
      result.current.toggleFavorite(1, "bulbasaur");
    });

    expect(mockSetFavorites).toHaveBeenCalledWith([]);
  });
});
