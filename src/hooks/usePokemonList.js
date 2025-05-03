import { useEffect, useState } from "react";
import { getPokemonList } from "../services/getPokemonList";

export const usePokemonList = (page = 1, pageSize = 15) => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const offset = (page - 1) * pageSize;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const results = await getPokemonList(pageSize, offset);
        setPokemons(results);
      } catch (err) {
        setError("The error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, pageSize]);

  return { pokemons, loading, error };
};
