import React, { useState } from "react";
import { usePokemonList } from "../../../hooks/usePokemonList";
import PokemonCard from "../../shared/pokemonCard";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchedPokemon, setSearchedPokemon] = useState("");
  const { pokemons, totalPages, loading, error } = usePokemonList({
    page: currentPage,
    pageSize: 15,
    source: "home",
  });

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchedPokemon.toLowerCase())
  );

  if (loading) return <p>Ładowanie...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="flex justify-center my-4">
        <input
          placeholder="Search"
          value={searchedPokemon}
          onChange={(e) => setSearchedPokemon(e.target.value)}
          className="border p-2 w-1/2"
        />
      </div>

      <div className="flex flex-wrap gap-4 justify-around">
        {filteredPokemons.length > 0 ? (
          filteredPokemons.map((pokemon) => (
            <PokemonCard key={pokemon.name} name={pokemon.name} />
          ))
        ) : (
          <p>Nie znaleziono Pokémonów.</p>
        )}
      </div>

      <div className="flex justify-center items-center mt-6 gap-4">
        {currentPage > 1 && (
          <button
            onClick={handlePrevious}
            className="px-4 py-2 border bg-white hover:bg-gray-100"
            aria-label="Poprzednia strona"
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
            aria-label="Następna strona"
          >
            Dalej
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
