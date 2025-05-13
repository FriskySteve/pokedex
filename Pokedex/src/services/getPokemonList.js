import axios from "axios";

const addUniqueApiPokemons = (localPokemons, apiPokemons) => {
  return [
    ...localPokemons,
    ...apiPokemons.filter(
      (apiPokemon) =>
        !localPokemons.some((local) => local.name === apiPokemon.name)
    ),
  ];
};

export const getPokemonList = async ({ source, limit = 150 }) => {
  const homeUrl = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;
  const arenaUrl = "http://localhost:3000/currentlyInArena";
  const favouritesUrl = "http://localhost:3000/favouritesPokemon";
  const localUrl = "http://localhost:3000/pokemons";

  try {
    if (source === "home") {
      const [responseApi, responseLocal] = await Promise.all([
        axios.get(homeUrl),
        axios.get(localUrl),
      ]);
      const combined = addUniqueApiPokemons(
        responseLocal.data,
        responseApi.data.results
      );
      console.log("combined: ", combined);
      return {
        results: combined,

        count: combined.length,
      };
    }

    if (source === "arena") {
      const response = await axios.get(arenaUrl);
      return {
        results: response.data,
      };
    }

    if (source === "fav") {
      const response = await axios.get(favouritesUrl);
      return {
        results: response.data,
        count: response.data.length,
      };
    }

    throw new Error("Invalid source provided to getPokemonList.");
  } catch (err) {
    console.error("Error fetching Pokémon list:", err);
    return {
      results: [],
      error: err.message,
    };
  }
};
