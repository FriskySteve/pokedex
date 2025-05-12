import axios from "axios";

export const getRestPokemonImgs = async () => {
  const baseUrl = `https://pokeapi.co/api/v2/pokemon?offset=150`;

  try {
    const response = await axios.get(baseUrl);
    const results = response.data.results;
    const count = response.data.count;

    return {
      results,
      count,
    };
  } catch (err) {
    console.error("Error fetching Pokémon list:", err);
    return {
      results: [],
      count: 0,
      error: err.message,
    };
  }
};
