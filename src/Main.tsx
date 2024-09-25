import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  Text,
  View,
} from 'react-native';

import useGetPokemons from './hooks/useGetPokemons';

import PokemonListItem from './components/PokemonListItem';
import PokemonDetailsModal from './components/PokemonDetailsModal';
import { PokemonItem } from './types/pokemons';

import styles from './Main.styles';

const Main: React.FC = () => {
  const [isPokemonDetailsOpened, setPokemonDetailsOpened] = React.useState(false);
  const [selectedPokemonName, setSelectedPokemonName] = React.useState<string | null>(null);

  const {
    isInitialPokemonsLoading,
    isMorePokemonsLoading,
    isPokemonsRefreshing,
    pokemonsList,
    refreshPokemons,
    getMorePokemons,
  } = useGetPokemons();

  const onPokemonPress = React.useCallback((pokemon: PokemonItem) => {
    // NOTE: Using two states instead of one to prevent the pokemon details from disappearing during the modal closing animation
    setSelectedPokemonName(pokemon.name);
    setPokemonDetailsOpened(true);
  }, []);

  const onPokemonDetailsClose = () => {
    setPokemonDetailsOpened(false);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
        <Text style={styles.headerTitle}>Pokemons</Text>
      </SafeAreaView>

      {isInitialPokemonsLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          onEndReachedThreshold={0.6}
          numColumns={2}
          columnWrapperStyle={styles.listColumnWrapper}
          contentContainerStyle={styles.listContentContainer}
          data={pokemonsList}
          keyExtractor={(pokemon) => pokemon.name}
          onEndReached={getMorePokemons}
          renderItem={({ item: pokemon }) => (
            <PokemonListItem pokemon={pokemon} onPress={onPokemonPress} />
          )}
          refreshControl={
            <RefreshControl
              tintColor="#000"
              refreshing={isPokemonsRefreshing}
              onRefresh={refreshPokemons}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyListContainer}>
              <Text>Unfortunately, we couldn’t retrieve any Pokémon. Please try refreshing the screen.</Text>
            </View>
          }
          ListFooterComponent={
            isMorePokemonsLoading ? (
              <View style={styles.moreLoaderContainer}>
                <ActivityIndicator />
              </View>
            ) : null
          }
        />
      )}

      <PokemonDetailsModal
        isOpened={isPokemonDetailsOpened}
        pokemonName={selectedPokemonName}
        onClose={onPokemonDetailsClose}
      />
    </View>
  );
};

export default Main;
