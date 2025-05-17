import axios from "axios";

export const getRestPokemonImgs = async () => {
  const baseUrl = `https://pokeapi.co/api/v2/pokemon?offset=150`;

  try {
    const response = await axios.get(baseUrl);
    const count = response.data.count;

    return count;
  } catch (err) {
    console.error("Error fetching Pokémon list:", err);
    return {
      count: 0,
      error: err.message,
    };
  }
};
