import React from "react";
import { PokemonDetails } from "../../shared/pokemonDetails";
import { usePokemonList } from "../../../hooks/usePokemonList";

const Home = () => {
  const { pokemons, loading, error } = usePokemonList();

  if (loading) return <p>Ładowanie...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-row gap-8 justify-around flex-wrap">
      {pokemons.map((pokemon, index) => (
        <PokemonDetails key={index} name={pokemon.name} />
      ))}
    </div>
  );
};

export default Home;
