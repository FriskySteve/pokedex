import React, { useEffect, useState } from "react";
import { PokemonDetails } from "../../shared/pokemonDetails";
import { getPokemonList } from "../../../services/getPokemonList";

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await getPokemonList();
        setPokemons(results);
      } catch (err) {
        setError("The error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Ładowanie...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-row gap-8 justify-around flex-wrap">
      {pokemons?.map((pokemon, index) => (
        <PokemonDetails key={index} name={pokemon.name} />
      ))}
    </div>
  );
};

export default Home;
