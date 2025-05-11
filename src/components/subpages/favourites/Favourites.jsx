import { usePokemonList } from "../../../hooks/usePokemonList";
import PokemonCard from "../../shared/pokemonCard";
import { useState } from "react";

const Favourites = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { pokemons, totalPages, loading, error } = usePokemonList({
    source: "fav",
  });
  if (loading) return <p>Ładowanie...</p>;
  if (error) return <p>{error}</p>;

  if (pokemons.length < 1) {
    return (
      <p>
        Nie dodałaś/eś jeszcze żadnego Pokemona do ulubionych. Najwyższa pora to
        zmienić!
      </p>
    );
  }

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <>
      <div className="flex flex-wrap gap-4 justify-around">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon?.name} name={pokemon?.name} />
        ))}
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
        )}{" "}
      </div>
    </>
  );
};

export default Favourites;
