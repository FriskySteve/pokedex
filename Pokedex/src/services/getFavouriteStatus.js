import axios from "axios";

const baseUrl = "http://localhost:3000/favouritesPokemon/";

const getFavouriteStatus = async (pokemon) => {
  try {
    const { data } = await axios.get(baseUrl);
    const existing = data.find((entry) => entry.name === pokemon.name);
    return !!existing;
  } catch (error) {
    console.error("Error in getFavouriteStatus:", error);
    return false;
  }
};

export default getFavouriteStatus;
