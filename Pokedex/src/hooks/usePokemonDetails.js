import { useState, useEffect } from "react";
import getPokemonDetails from "../services/getPokemonDetails";

export const usePokemonDetails = (pokemon, enabled = true) => {
  const [pokemonDetails, setPokemonDetails] = useState(pokemon);
  const [isLoading, setIsLoading] = useState(false);
  let [name] = useState(pokemon.name);

  useEffect(() => {
    if (!enabled) {
      setPokemonDetails(pokemon);
      return;
    }
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const details = await getPokemonDetails(name);
        setPokemonDetails(details);
      } catch (error) {
        console.error("Error while loading pokemons:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [pokemon, enabled]);

  return { pokemonDetails, isLoading };
};
