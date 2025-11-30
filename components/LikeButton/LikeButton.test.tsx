import { render, screen, fireEvent } from '@testing-library/react';
import { LikeButton } from './LikeButton';
import { useIsFavorite } from '@/logic/pokemon/useIsFavorite';

// Mock useIsFavorite hook

jest.mock('@/logic/pokemon/useIsFavorite', () => ({
    useIsFavorite: jest.fn(),
}));

describe('LikeButton', () => {
    const mockToggleFavorite = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly', () => {
        (useIsFavorite as jest.Mock).mockReturnValue(false);
        render(<LikeButton id={1} toggleFavorite={mockToggleFavorite} />);
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('calls toggleFavorite on click', () => {
        (useIsFavorite as jest.Mock).mockReturnValue(false);
        render(<LikeButton id={1} toggleFavorite={mockToggleFavorite} />);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(mockToggleFavorite).toHaveBeenCalledTimes(1);
    });

    it('displays filled heart when isFavorite is true', () => {
        (useIsFavorite as jest.Mock).mockReturnValue(true);
        render(<LikeButton id={1} toggleFavorite={mockToggleFavorite} />);

        const svg = screen.getByRole('button').querySelector('svg');
        expect(svg).toHaveClass('text-red-500');
        expect(svg).toHaveClass('fill-red-500');
    });

    it('displays outline heart when isFavorite is false', () => {
        (useIsFavorite as jest.Mock).mockReturnValue(false);
        render(<LikeButton id={1} toggleFavorite={mockToggleFavorite} />);

        const svg = screen.getByRole('button').querySelector('svg');
        expect(svg).toHaveClass('text-gray-400');
        expect(svg).not.toHaveClass('fill-red-500');
    });
});
