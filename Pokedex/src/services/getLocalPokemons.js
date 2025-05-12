import axios from "axios";

const baseUrl = "http://localhost:3000/pokemons/";

const getLocalPokemons = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error("Błąd podczas pobierania lokalnych Pokémonów:", error);
    return [];
  }
};

export default getLocalPokemons;
