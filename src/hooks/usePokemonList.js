import { useEffect, useState } from "react";
import { getPokemonList } from "../services/getPokemonList";

export const usePokemonList = (limit = 150) => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await getPokemonList(limit);
        setPokemons(results);
      } catch (err) {
        setError("The error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [limit]);

  return { pokemons, loading, error };
};
