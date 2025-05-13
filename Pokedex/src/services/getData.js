import axios from "axios";

export const getData = async (url) => {
  try {
    const response = await axios.get(url);
    const data = response.data;

    return data;
  } catch (err) {
    console.error("Error fetching Pokémon list:", err);
    return {
      error: err?.message || "Unknown error occurred",
    };
  }
};
