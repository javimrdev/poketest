import { gql } from "@apollo/client";

export const GET_POKEMON_LIST = gql`
  query GetPokemonList($limit: Int, $offset: Int) {
    pokemon(limit: $limit, offset: $offset) {
        name
        id
    }
  }
`;

export const GET_POKEMON_BY_ID = gql`
  query GetPokemonById($id: String!) {
    pokemon(name: $id) {
      id
      name
      sprites {
        front_default
      }
    }
  }
`;
