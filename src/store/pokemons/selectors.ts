import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../store';

const pokemonByNameSelector = createSelector(
  (store: AppState) => store.pokemons.pokemons,
  (store: AppState, pokemonName?: string | null) => pokemonName,
  (pokemons, pokemonName) => {
    if (!pokemonName) return;
    return pokemons[pokemonName];
  },
);


const pokemonSelectors = {
  pokemonByNameSelector,
};

export default pokemonSelectors;
