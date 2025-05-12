// import axios from "axios";

// const baseUrl = "http://localhost:3000/pokemons";

// const upsertPokemon = async (pokemon, key, value) => {
//   try {
//     const { data } = await axios.get(`${baseUrl}?name=${pokemon.name}`);
//     const existing = data[0];

//     if (existing) {
//       const updated = {
//         ...existing,
//         stats: {
//           ...existing.stats,
//           key: value,
//         },
//       };
//       await axios.put(`${baseUrl}/${existing.id}`, updated);
//     } else {
//       const newPokemon = {
//         ...pokemon,
//         stats: {
//           ...pokemon.stats,
//           key: value,
//         },
//       };
//       await axios.post(baseUrl, newPokemon);
//     }
//   } catch (error) {
//     console.error("Upsert error:", error);
//   }
// };

// const updatePokemonStats = async (key, value) => {
//   try {
//     await upsertPokemon(key, value);
//   } catch (error) {
//     console.error("Failed to update Pokemon stat:", error);
//   }
// };

// export default updatePokemonStats;

import axios from "axios";

const baseUrl = "http://localhost:3000/pokemons";

const upsertPokemon = async (pokemon, key, value) => {
  try {
    const { data } = await axios.get(`${baseUrl}?name=${pokemon.name}`);
    const existing = data[0];

    if (existing) {
      const updated = {
        ...existing,
        stats: {
          ...existing.stats,
          [key]: value,
        },
      };
      await axios.put(`${baseUrl}/${existing.id}`, updated);
    } else {
      const newPokemon = {
        ...pokemon,
        stats: {
          ...pokemon.stats,
          [key]: value,
        },
      };
      await axios.post(baseUrl, newPokemon);
    }
  } catch (error) {
    console.error("Upsert error:", error);
  }
};

const updatePokemonStats = async (pokemon, key, value) => {
  try {
    await upsertPokemon(pokemon, key, value);
  } catch (error) {
    console.error("Failed to update Pokemon stat:", error);
  }
};

export default updatePokemonStats;
