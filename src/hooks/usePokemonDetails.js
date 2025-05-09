import { useState, useEffect } from "react";
import getPokemonDetails from "../services/getPokemonDetails";

export const usePokemonDetails = (name) => {
  const [pokemonDetails, setPokemonDetails] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
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
  }, [name]);

  return { pokemonDetails, isLoading };
};
