import axios from "axios";

export const getPokemonList = async (limit = 150) => {
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
  );
  return response.data.results;
};
