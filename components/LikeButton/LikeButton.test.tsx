import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, type Mock, vi } from "vitest";
import { useIsFavorite } from "@/logic/pokemon/useIsFavorite";
import { LikeButton } from "./LikeButton";

// Mock useIsFavorite hook

vi.mock("@/logic/pokemon/useIsFavorite", () => ({
  useIsFavorite: vi.fn(),
}));

describe("LikeButton", () => {
  const mockToggleFavorite = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly", () => {
    (useIsFavorite as Mock).mockReturnValue(false);
    render(<LikeButton id={1} toggleFavorite={mockToggleFavorite} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("calls toggleFavorite on click", () => {
    (useIsFavorite as Mock).mockReturnValue(false);
    render(<LikeButton id={1} toggleFavorite={mockToggleFavorite} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockToggleFavorite).toHaveBeenCalledTimes(1);
  });

  it("displays filled heart when isFavorite is true", () => {
    (useIsFavorite as Mock).mockReturnValue(true);
    render(<LikeButton id={1} toggleFavorite={mockToggleFavorite} />);

    const svg = screen.getByRole("button").querySelector("svg");
    expect(svg).toHaveClass("text-red-500");
    expect(svg).toHaveClass("fill-red-500");
  });

  it("displays outline heart when isFavorite is false", () => {
    (useIsFavorite as Mock).mockReturnValue(false);
    render(<LikeButton id={1} toggleFavorite={mockToggleFavorite} />);

    const svg = screen.getByRole("button").querySelector("svg");
    expect(svg).toHaveClass("text-gray-400");
    expect(svg).not.toHaveClass("fill-red-500");
  });
});
