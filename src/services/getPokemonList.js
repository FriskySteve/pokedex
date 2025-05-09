import axios from "axios";

export const getPokemonList = async (limit, offset) => {
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );

  return {
    results: response.data.results,
    count: response.data.count,
  };
};
