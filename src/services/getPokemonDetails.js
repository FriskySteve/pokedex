import axios from "axios";
import getLocalPokemons from "./getLocalPokemons";

const baseApi = "https://pokeapi.co/api/v2/pokemon/";

const getPokemonDetails = async (name) => {
  const localPokemons = await getLocalPokemons();
  let data;

  const localMatch = localPokemons.find((pokemon) => pokemon.name === name);

  if (localMatch) {
    data = localMatch;
    return {
      id: data.id,
      name: data.name,
      imgUrl: data.imgUrl || "",
      stats: {
        height: data.stats.height,
        base_experience: data.stats.base_experience,
        weight: data.stats.weight,
        ability: data.stats.ability || "brak",
      },
    };
  } else {
    const response = await axios.get(`${baseApi}${name}`);
    data = response.data;
  }

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
};

export default getPokemonDetails;
