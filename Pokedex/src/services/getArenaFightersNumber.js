import axios from "axios";

const baseUrl = "http://localhost:3000/currentlyInArena/";

const getArenFightersNumber = async () => {
  const { data } = await axios.get(baseUrl);
  const counter = data.length;
  return counter;
};

export default getArenFightersNumber;
