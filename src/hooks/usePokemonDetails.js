import { useState, useEffect } from "react";
import getPokemonDetails from "../services/getPokemonDetails";

export const useGetPokemonDetails = (name) => {
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!name) return;

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
