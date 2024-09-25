import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { PokemonItem, PokemonDetails } from 'src/types/pokemons';

type InitialState = {
  pokemonsList: PokemonItem[];
  pokemons: Record<string, PokemonDetails>;
};

const initialState: InitialState = {
  pokemonsList: [],
  pokemons: {},
};

const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    setPokemonsList: (state, action: PayloadAction<PokemonItem[]>) => {
      state.pokemonsList = action.payload;
    },
    addPokemonsList: (state, action: PayloadAction<PokemonItem[]>) => {
      state.pokemonsList.push(...action.payload);
    },
    addPokemon: (state, action: PayloadAction<PokemonDetails>) => {
      state.pokemons[action.payload.name] = action.payload;
    },
  },
});

export const pokemonsActions = pokemonsSlice.actions;
export default pokemonsSlice.reducer;
