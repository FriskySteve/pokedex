import { useState } from "react";
import PokemonCard from "./pokemonCard";
import { Button } from "./Button";

const PokemonLoader = ({
  pokemons,
  totalPages,
  enableSearch = true,
  source = "home",
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchedPokemon, setSearchedPokemon] = useState("");

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchedPokemon.toLowerCase())
  );

  const displayedPokemons =
    enableSearch && searchedPokemon.length > 0
      ? filteredPokemons
      : pokemons.slice((currentPage - 1) * 15, currentPage * 15);

  return (
    <>
      {enableSearch && (
        <div className="flex justify-center my-4">
          <input
            placeholder="Search"
            value={searchedPokemon}
            onChange={(e) => setSearchedPokemon(e.target.value)}
            className="border p-2 w-1/2"
          />
        </div>
      )}

      <div className="flex flex-wrap gap-4 justify-around">
        {displayedPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.name} name={pokemon.name} source={source} />
        ))}
      </div>

      {!enableSearch || !searchedPokemon ? (
        <div className="flex justify-center items-center mt-6 gap-4">
          {currentPage > 1 && <Button onClick={handlePrevious}>Wstecz</Button>}

          <span className="text-sm font-medium">
            Strona {currentPage} z {totalPages}
          </span>

          {currentPage < totalPages && (
            <Button
              onClick={handleNext}
              className="px-4 py-2 border bg-white hover:bg-gray-100"
              aria-label="Następna strona"
            >
              Dalej
            </Button>
          )}
        </div>
      ) : null}
    </>
  );
};

export default PokemonLoader;
