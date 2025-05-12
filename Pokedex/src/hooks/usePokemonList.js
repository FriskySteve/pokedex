import { useEffect, useState } from "react";
import { getPokemonList } from "../services/getPokemonList";

export const usePokemonList = ({ source, refreshKey }) => {
  const [pokemons, setPokemons] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { results, count } = await getPokemonList({
          source,
        });
        setPokemons(results);
        setTotalPages(Math.ceil(count / 15));
      } catch (err) {
        setError("The error occurred while fetching data.", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [source, refreshKey]);

  return { pokemons, totalPages, loading, error };
};
