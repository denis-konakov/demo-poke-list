import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';

import { PokemonItem } from 'src/types/pokemons';
import useGetPokemonImage from 'src/hooks/useGetPokemonImage';

import styles from './PokemonListItem.styles';

type Props = {
  pokemon: PokemonItem;
  onPress: (pokemon: PokemonItem) => void;
};

const PokemonListItem: React.FC<Props> = (props) => {
  const pokemonImage = useGetPokemonImage(props.pokemon.name);

  const onPokemonPress = () => {
    props.onPress(props.pokemon);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPokemonPress}>
      <Image resizeMode="center" source={{ uri: pokemonImage }} style={styles.image} />

      <Text style={styles.name}>
        {props.pokemon.name}
      </Text>
    </TouchableOpacity>
  );
};

export default React.memo(PokemonListItem);
