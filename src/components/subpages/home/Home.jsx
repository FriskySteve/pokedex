import React, { useState } from "react";
import { PokemonDetails } from "../../shared/pokemonDetails";
import { usePokemonList } from "../../../hooks/usePokemonList";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  const { pokemons, loading, error } = usePokemonList(currentPage, 15);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  if (loading) return <p>Ładowanie...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="flex flex-wrap gap-4 justify-around">
        {pokemons.map((pokemon, index) => (
          <PokemonDetails key={index} name={pokemon.name} />
        ))}
      </div>

      <div className="flex justify-center mt-6 gap-2 flex-wrap">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="px-4 py-2 border bg-white hover:bg-gray-300 disabled:opacity-50"
        >
          Wstecz
        </button>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border bg-white hover:bg-gray-300 disabled:opacity-50"
        >
          Dalej
        </button>
      </div>
    </div>
  );
};

export default Home;
