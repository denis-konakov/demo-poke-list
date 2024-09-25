import React from 'react';

const useGetPokemonImage = (pokemonName?: string | null) => {
  const pokemonImage = React.useMemo(() => {
    if (!pokemonName) return '';
    return `https://img.pokemondb.net/artwork/${pokemonName}.jpg`;
  }, [pokemonName]);

  return pokemonImage;
};

export default useGetPokemonImage;
