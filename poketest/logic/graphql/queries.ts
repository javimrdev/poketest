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
  query GetPokemonById($id: Int!) {
    pokemon(where: {id: {_eq: $id}}) {
      name
      id
      pokemonstats {
        base_stat
        stat {
          name
        }
      }
      pokemontypes {
        type {
          name
        }
      }
      pokemonsprites {
        sprites
      }
      pokemonmoves(distinct_on: move_id) {
        pokemon_id
        move {
          name
        }
      }
    } 
  }
`;

export const GET_POKEMON_BY_IDS = gql`
  query GetPokemonByIds($ids: [Int!]) {
    pokemon(where: {id: {_in: $ids}}) {
      name
      id
    }
  }
`;
