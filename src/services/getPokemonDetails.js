import axios from "axios";
import getLocalPokemons from "./getLocalPokemons";

const baseApi = "https://pokeapi.co/api/v2/pokemon/";

const getPokemonDetails = async (name) => {
  const localPokemons = await getLocalPokemons();
  const localMatch = localPokemons.find((pokemon) => pokemon.name === name);

  if (localMatch) {
    return {
      id: localMatch.id,
      name: localMatch.name,
      imgUrl: localMatch.imgUrl || "",
      stats: {
        height: localMatch.stats.height,
        base_experience: localMatch.stats.base_experience,
        weight: localMatch.stats.weight,
        ability: localMatch.stats.ability || "brak",
      },
      fights: {
        wins: localMatch.fights?.wins || 0,
        looses: localMatch.fights?.looses || 0,
      },
    };
  }

  try {
    const response = await axios.get(`${baseApi}${name.toLowerCase()}`);
    const data = response.data;

    return {
      id: data.id,
      name: data.name,
      imgUrl: data.sprites?.other?.dream_world?.front_default || "",
      stats: {
        height: data.height,
        base_experience: data.base_experience,
        weight: data.weight,
        ability: data.abilities?.[0]?.ability?.name || "brak",
      },
    };
  } catch (error) {
    console.error(
      `Nie udało się pobrać danych z API dla "${name}":`,
      error.message
    );
    return null;
  }
};

export default getPokemonDetails;
