// import axios from "axios";

// const addUniqueApiPokemons = (localPokemons, apiPokemons) => {
//   const result = [...localPokemons];

//   for (const apiPokemon of apiPokemons) {
//     const exists = localPokemons.some(
//       (local) => local.name === apiPokemon.name
//     );
//     if (!exists) {
//       result.push(apiPokemon);
//     }
//   }

//   return result;
// };

// // export const getPokemonList = async ({ limit, offset, source }) => {
// export const getPokemonList = async ({ limit = 150, source }) => {
//   const home = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;
//   const arena = "http://localhost:3000/currentlyInArena";
//   const favourites = "http://localhost:3000/favouritesPokemon";
//   const localPokemons = "http://localhost:3000/pokemons";

//   if (source === "home") {
//     const responseApi = await axios.get(home);
//     const responseLocal = await axios.get(localPokemons);
//     const response = addUniqueApiPokemons(
//       responseLocal.data,
//       responseApi.data.results
//     );
//     console.log("Test: ", response.data);
//     return {
//       results: response.data,
//     };
//   }
//   if (source === "arena") {
//     const response = await axios.get(arena);
//     return {
//       results: response.data,
//     };
//   }
//   if (source === "fav") {
//     const response = await axios.get(favourites);
//     return {
//       results: response.data,
//     };
//   }
// };

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

export const getPokemonList = async ({ limit = 150, source }) => {
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

      return {
        results: combined,
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
