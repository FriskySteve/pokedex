import axios from "axios";

const baseUrl = "http://localhost:3000/currentlyInArena/";

const deleteFromArena = async (pokemon) => {
  await axios.delete(`${baseUrl}${pokemon.id}`);
};

export default deleteFromArena;
