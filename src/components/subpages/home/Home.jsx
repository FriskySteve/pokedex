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
        setError("Błąd podczas pobierania danych.");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  if (loading) return <p>Ładowanie...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Lista Pokémonów</h1>
      <ul>
        {pokemons?.map((pokemon, index) => (
          // <li key={index}>{pokemon.name}</li>
          <PokemonDetails key={index} name={pokemon.name} />
        ))}
      </ul>
    </div>
  );
};

export default Home;
