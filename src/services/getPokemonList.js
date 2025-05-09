import axios from "axios";

export const getPokemonList = async (limit, offset, source) => {
  const home = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  const arena = "http://localhost:3000/currentlyInArena";
  const favourites = "http://localhost:3000/favouritesPokemon";

  if (source === "home") {
    const response = await axios.get(home);
    return {
      results: response.data.results,
      count: response.data.count,
    };
  }
  if (source === "arena") {
    const response = await axios.get(arena);
    return {
      results: response.data.results,
      count: response.data.count,
    };
  }
  if (source === "fav") {
    const response = await axios.get(favourites);
    return {
      results: response.data.results,
      count: response.data.count,
    };
  }
};
