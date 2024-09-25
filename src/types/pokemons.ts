export type PokemonItem = {
  name: string;
  url: string;
};

export type PokemonDetails = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  location_area_encounters: string;
};
