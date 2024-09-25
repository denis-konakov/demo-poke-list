import { PokemonDetails, PokemonItem } from 'src/types/pokemons';
import customAxios from './axios';
import { AxiosResponse } from 'axios';

export const POKEMONS_PER_PAGE = 20;

type GetPokemonListResponse = {
  count: number;
  next: string;
  previous: string;
  results: PokemonItem[];
};

type GetPokemonListParams = {
  offset: number;
  limit: number;
};

const getPokemonList = (params: GetPokemonListParams): Promise<AxiosResponse<GetPokemonListResponse>> => {
  return customAxios.get('/pokemon', { params });
};

const getPokemonDetails = (pokemonName: string): Promise<AxiosResponse<PokemonDetails>> => {
  return customAxios.get(`/pokemon/${pokemonName}`);
};

export default {
  getPokemonList,
  getPokemonDetails,
};
