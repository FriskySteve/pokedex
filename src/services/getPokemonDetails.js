import axios from "axios";

const baseApi = "https://pokeapi.co/api/v2/pokemon/";

export const getPokemonDetails = async (name) => {
  const response = await axios.get(`${baseApi}${name}`);
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
};
