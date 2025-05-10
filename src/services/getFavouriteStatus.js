import axios from "axios";

const baseUrl = "http://localhost:3000/favouritesPokemon/";

const getFavouriteStatus = async (pokemon) => {
  try {
    const { data } = await axios.get(baseUrl);
    const existing = data.find((entry) => entry.name === pokemon.name);

    if (existing) {
      return true;
    } else return false;
  } catch (error) {
    console.error("Error in getFavouriteStatus:", error);
    return { success: false, message: error.message };
  }
};
export default getFavouriteStatus;
