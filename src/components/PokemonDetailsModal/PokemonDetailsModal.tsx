import React from 'react';
import type { FC } from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import useGetPokemonImage from 'src/hooks/useGetPokemonImage';

import { useAppDispatch, useAppSelector } from 'src/store/store';
import pokemonSelectors from 'src/store/pokemons/selectors';
import pokemonApi from 'src/api/pokemonApi';
import { pokemonsActions } from 'src/store/pokemons/slice';

import styles from './PokemonDetailsModal.styles';
type Props = {
  isOpened: boolean;
  pokemonName: string | null;
  onClose: () => void;
};

const PokemonDetailsModal: FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const pokemonDetails = useAppSelector((state) => pokemonSelectors.pokemonByNameSelector(state, props.pokemonName));

  const pokemonImage = useGetPokemonImage(props.pokemonName);
  const isPokemonDetailsExist = Boolean(pokemonDetails);

  const [isPokemonLoading, setPokemonLoading] = React.useState(!isPokemonDetailsExist);

  React.useEffect(() => {
    if (isPokemonDetailsExist) return;
    getPokemonDetails();
  }, [props.pokemonName]);

  const getPokemonDetails = async () => {
    if (!props.pokemonName) return;

    setPokemonLoading(true);

    try {
      const response = await pokemonApi.getPokemonDetails(props.pokemonName);
      dispatch(pokemonsActions.addPokemon(response.data));
    } catch {
      // Handle error in real case
    }

    setPokemonLoading(false);
  };

  return (
    <Modal
      transparent
      visible={props.isOpened}
      animationType="fade"
      onRequestClose={props.onClose}
    >
      <View style={styles.container}>
        <Pressable style={styles.overlay} onPress={props.onClose} />

        <View style={styles.content}>
          <Image resizeMode="contain" source={{ uri: pokemonImage }} style={styles.image} />

          {isPokemonLoading ? (
            <ActivityIndicator size="large" />
          ) : (
            <View>
              <Text style={styles.infoText}>
                Name: {pokemonDetails?.name}
              </Text>

              <Text style={styles.infoText}>
                Base Experience: {pokemonDetails?.base_experience}
              </Text>

              <Text style={styles.infoText}>
                Height: {pokemonDetails?.height}
              </Text>

              <Text style={styles.infoText}>
                Weight: {pokemonDetails?.weight}
              </Text>
            </View>
          )}

          <TouchableOpacity style={styles.closeButton} onPress={props.onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PokemonDetailsModal;
