import React, { useEffect, useState } from "react";
import axios from "axios";
import { PokemonDetails } from "../../shared/pokemonDetails";

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=150"
        );
        setPokemons(response.data.results);
      } catch (err) {
        setError("The error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  if (loading) return <p>Ładowanie...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-row gap-8 flex-wrap">
      {pokemons?.map((pokemon, index) => (
        <PokemonDetails key={index} name={pokemon.name} />
      ))}
    </div>
  );
};

export default Home;
