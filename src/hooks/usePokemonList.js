import { useEffect, useState } from "react";
import { getPokemonList } from "../services/getPokemonList";

export const usePokemonList = ({ page, pageSize, source, refreshKey }) => {
  const [pokemons, setPokemons] = useState([]);
  //   Zmienic jak dojdzie dodawania pokemonow lokalnie
  const [totalPages, setTotalPages] = useState(0);
  // const totalPages = 10;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const offset = (page - 1) * pageSize;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { results, count } = await getPokemonList({
          pageSize,
          offset,
          source,
        });
        setPokemons(results);
        setTotalPages(Math.ceil(count / pageSize));
      } catch (err) {
        setError("The error occurred while fetching data.", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, pageSize, source, refreshKey]);

  return { pokemons, totalPages, loading, error };
};
