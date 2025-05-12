import axios from "axios";

const baseUrl = "http://localhost:3000/favouritesPokemon/";

const getFavouritesRequest = async (pokemon) => {
  try {
    const { data } = await axios.get(baseUrl);
    const existing = data.find((entry) => entry.name === pokemon.name);

    if (existing) {
      await axios.delete(`${baseUrl}${existing.id}`);
      return {
        success: true,
        message: `${pokemon.name} usunięty z Ulubionych.`,
      };
    }

    const newPokemon = { ...pokemon, id: pokemon.id.toString() };
    await axios.post(baseUrl, newPokemon);

    return {
      success: true,
      message: `${pokemon.name} dodany do Ulubionych`,
    };
  } catch (error) {
    console.error("Error in getFavouritesRequest:", error);
    return { success: false, message: error.message };
  }
};

export default getFavouritesRequest;
