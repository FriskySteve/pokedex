import axios from "axios";

const baseUrl = "http://localhost:3000/currentlyInArena/";

const getArenaRequest = async (pokemon) => {
  try {
    const { data } = await axios.get(baseUrl);
    const existing = data.find((entry) => entry.name === pokemon.name);

    if (existing) {
      await axios.delete(`${baseUrl}${existing.id}`);
      return {
        success: true,
        message: `${pokemon.name} został usunięty z Areny.`,
        count: data.length - 1,
      };
    }

    if (data.length >= 2) {
      return {
        success: false,
        message: "Arena jest pełna",
        count: data.length,
      };
    }

    const newPokemon = { ...pokemon, id: pokemon.id.toString() };
    await axios.post(baseUrl, newPokemon);

    return {
      success: true,
      message: `${pokemon.name} został dodany na Arenę.`,
      count: data.length + 1,
    };
  } catch (error) {
    console.error("Error in getArenaRequest:", error);
    return { success: false, message: error.message, count: null };
  }
};

export default getArenaRequest;
