import axios from "axios";
import { enqueueSnackbar } from "../utils/notistackRef";

const baseUrl = "http://localhost:3000/pokemons";

const upsertPokemon = async (pokemon) => {
  try {
    const { data } = await axios.get(`${baseUrl}?name=${pokemon.name}`);
    const existing = data[0];

    if (existing) {
      enqueueSnackbar(`Pokemon ${pokemon.name} już istnieje`, {
        variant: "info",
      });
    } else {
      await axios.post(baseUrl, pokemon);
      enqueueSnackbar(`Dodano Pokemona ${pokemon.name}`, {
        variant: "success",
      });
    }
  } catch (error) {
    console.error("Upsert error:", error);
    enqueueSnackbar("Wystąpił błąd podczas dodawania Pokemona", {
      variant: "error",
    });
  }
};

const postNewPokemon = async (pokemon) => {
  try {
    await upsertPokemon(pokemon);
  } catch (error) {
    console.error("Failed to add new Pokemon:", error);
  }
};

export default postNewPokemon;
