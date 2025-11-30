"use client";

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

const client = new ApolloClient({
    link: new HttpLink({
        uri: "https://graphql.pokeapi.co/v1beta2",
    }),
    cache: new InMemoryCache(),
});

export const ApolloWrapper = ({ children }: { children: React.ReactNode }) => {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
