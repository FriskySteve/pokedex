import axios from "axios";

const baseUrl = "http://localhost:3000/pokemons";

const upsertPokemon = async (pokemon, resultType) => {
  try {
    const { data } = await axios.get(`${baseUrl}?name=${pokemon.name}`);
    const existing = data[0];

    if (existing) {
      const updated = {
        ...existing,
        fights: {
          wins:
            resultType === "win"
              ? (existing.fights?.wins || 0) + 1
              : existing.fights?.wins || 0,
          looses:
            resultType === "loose"
              ? (existing.fights?.looses || 0) + 1
              : existing.fights?.looses || 0,
        },
        stats: {
          ...existing.stats,
          base_experience:
            resultType === "win"
              ? (existing.stats?.base_experience || 0) + 10
              : existing.stats?.base_experience || 0,
        },
        id: toString(existing.id),
      };

      await axios.put(`${baseUrl}/${existing.id}`, updated);
    } else {
      const newPokemon = {
        ...pokemon,
        fights: {
          wins: resultType === "win" ? 1 : 0,
          looses: resultType === "loose" ? 1 : 0,
        },
        stats: {
          ...pokemon.stats,
          base_experience:
            resultType === "win"
              ? (pokemon.stats?.base_experience || 0) + 10
              : pokemon.stats?.base_experience || 0,
        },
      };

      await axios.post(baseUrl, newPokemon);
    }
  } catch (error) {
    console.error("Upsert error:", error);
  }
};

const postArenaResults = async (winner, looser) => {
  try {
    await upsertPokemon(winner, "win");
    await upsertPokemon(looser, "loose");
  } catch (error) {
    console.error("Failed to update fight result:", error);
  }
};

export default postArenaResults;
