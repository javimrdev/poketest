import { renderHook } from "@testing-library/react";
import { useAtomValue } from "jotai";
import { beforeEach, describe, expect, it, type Mock, vi } from "vitest";
import { useIsFavorite } from "./useIsFavorite";

// Mock jotai useAtomValue
vi.mock("jotai", () => ({
  useAtomValue: vi.fn(),
  atom: vi.fn(),
}));

describe("useIsFavorite", () => {
  const mockFavorites = [
    { id: 1, name: "bulbasaur" },
    { id: 2, name: "ivysaur" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    (useAtomValue as Mock).mockReturnValue(mockFavorites);
  });

  it("returns true if pokemon is in favorites", () => {
    const { result } = renderHook(() => useIsFavorite(1));
    expect(result.current).toBe(true);
  });

  it("returns false if pokemon is not in favorites", () => {
    const { result } = renderHook(() => useIsFavorite(3));
    expect(result.current).toBe(false);
  });
});
