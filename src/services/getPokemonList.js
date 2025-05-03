import axios from "axios";

export const getPokemonList = async (limit = 15, offset = 0) => {
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );
  return response.data.results;
};
