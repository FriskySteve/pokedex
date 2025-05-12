import axios from "axios";

const baseUrl = "http://localhost:3000/pokemons";

export const checkIfImageExists = async (imgUrl) => {
  try {
    const response = await axios.get(`${baseUrl}?imgUrl=${imgUrl}`);
    return response.data.length > 0;
  } catch (error) {
    console.error("Error checking image:", error);
    return false;
  }
};
