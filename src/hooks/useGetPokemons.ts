import React from 'react';

import pokemonApi, { POKEMONS_PER_PAGE } from 'src/api/pokemonApi';
import { pokemonsActions } from 'src/store/pokemons/slice';
import { useAppDispatch, useAppSelector } from 'src/store/store';

const useGetPokemons = () => {
  const dispatch = useAppDispatch();

  const [isInitialPokemonsLoading, setInitialPokemonsLoading] = React.useState(true);
  const [isPokemonsRefreshing, setPokemonsRefreshing] = React.useState(false);
  const [isMorePokemonsLoading, setMorePokemonsLoading] = React.useState(false);

  const pokemonsList = useAppSelector((state) => state.pokemons.pokemonsList);

  const pagination = React.useRef({
    isEndReached: false,
    currentPage: 1,
  });

  React.useEffect(() => {
    const intervalID = setInterval(() => {
      refetchAllPokemons();
    }, 30 * 1000);

    return () => {
      clearInterval(intervalID);
    };
  }, [isPokemonsRefreshing]);

  React.useEffect(() => {
    (async () => {
      await getPokemons(1);
      setInitialPokemonsLoading(false);
    })();
  }, []);

  const getPokemons = async (page: number) => {
    if (pagination.current.isEndReached && page !== 1) return;

    try {
      const response = await pokemonApi.getPokemonList({
        limit: POKEMONS_PER_PAGE,
        offset: (page - 1) * POKEMONS_PER_PAGE,
      });

      if (page === 1) {
        dispatch(pokemonsActions.setPokemonsList(response.data.results));
      } else {
        dispatch(pokemonsActions.addPokemonsList(response.data.results));
      }

      pagination.current.currentPage = page;
      pagination.current.isEndReached = pokemonsList.length === response.data.count;
    } catch {
      // Handle error in real case
    }
  };

  const refreshPokemons = async () => {
    if (isPokemonsRefreshing) return;

    setPokemonsRefreshing(true);
    await getPokemons(1);
    setPokemonsRefreshing(false);
  };

  const getMorePokemons = async () => {
    if (isMorePokemonsLoading) return;

    setMorePokemonsLoading(true);
    await getPokemons(pagination.current.currentPage + 1);
    setMorePokemonsLoading(false);
  };

  const refetchAllPokemons = async () => {
    try {
      const response = await pokemonApi.getPokemonList({
        limit: pagination.current.currentPage * POKEMONS_PER_PAGE,
        offset: 0,
      });
      dispatch(pokemonsActions.setPokemonsList(response.data.results));
    } catch {
      // Handle error in real case
    }
  };

  return {
    isInitialPokemonsLoading,
    isPokemonsRefreshing,
    isMorePokemonsLoading,
    pokemonsList,
    refreshPokemons,
    getMorePokemons,
  };
};

export default useGetPokemons;
