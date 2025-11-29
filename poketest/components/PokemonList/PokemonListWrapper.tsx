import { PropsWithChildren } from "react";

export const PokemonListWrapper = ({ children }: PropsWithChildren) => {
    return (
        <ul className="flex flex-col border border-gray-200 rounded-lg overflow-hidden" style={{ viewTransitionName: 'pokemon-list' }}>
            {children}
        </ul>
    );
};
