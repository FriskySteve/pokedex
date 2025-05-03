import React, { useState } from "react";
import { PokemonDetails } from "../../shared/pokemonDetails";
import { usePokemonList } from "../../../hooks/usePokemonList";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { pokemons, totalPages, loading, error } = usePokemonList(
    currentPage,
    15
  );

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

      <div className="flex justify-center items-center mt-6 gap-4">
        {currentPage > 1 && (
          <button
            onClick={handlePrevious}
            className="px-4 py-2 border bg-white hover:bg-gray-100"
          >
            Wstecz
          </button>
        )}

        <span className="text-sm font-medium">
          Strona {currentPage} z {totalPages}
        </span>

        {currentPage < totalPages && (
          <button
            onClick={handleNext}
            className="px-4 py-2 border bg-white hover:bg-gray-100"
          >
            Dalej
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
