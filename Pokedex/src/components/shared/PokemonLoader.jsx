import { useEffect, useState } from "react";
import PokemonCard from "./pokemonCard";
import { Button } from "./Button";
import getData from "../../services/getData";
import addLists from "../../utils/addLists";

const PokemonLoader = ({ enableSearch = true, source = "home" }) => {
  const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=150`;
  const favouritesUrl = "http://localhost:3000/favouritesPokemon";
  const localUrl = "http://localhost:3000/pokemons";

  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchedPokemon, setSearchedPokemon] = useState("");

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      setIsEmpty(false);

      if (source === "fav") {
        const favData = await getData(favouritesUrl);
        if (Array.isArray(favData)) {
          setPokemons(favData);
          if (favData.length === 0) {
            setIsEmpty(true);
          }
        }
      } else {
        const [localData, apiData] = await Promise.all([
          getData(localUrl),
          getData(apiUrl),
        ]);

        if (Array.isArray(localData) && Array.isArray(apiData?.results)) {
          const merged = addLists(localData, apiData.results);
          setPokemons(merged);
        }
      }

      setLoading(false);
    };

    fetchPokemons();
  }, [source]);

  const totalPages = Math.ceil(pokemons.length / 15);

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
            className="border p-2 w-1/2 dark:placeholder-yellow-500 placeholder-gray-400"
          />
        </div>
      )}

      {loading ? (
        <div className="text-center py-4">Ładowanie...</div>
      ) : isEmpty ? (
        <p className="text-center text-gray-600 mt-4 dark:text-yellow-500">
          Nie dodałaś/eś jeszcze żadnego Pokemona do ulubionych. Najwyższa pora
          to zmienić!
        </p>
      ) : (
        <>
          <div className="flex flex-wrap gap-4 justify-around">
            {displayedPokemons.map((pokemon) => (
              <PokemonCard
                key={pokemon.name}
                pokemon={pokemon}
                source={source}
              />
            ))}
          </div>

          {!enableSearch || !searchedPokemon ? (
            <div className="flex justify-center items-center mt-6 gap-4">
              {currentPage > 1 && (
                <Button onClick={handlePrevious}>Wstecz</Button>
              )}

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
      )}
    </>
  );
};

export default PokemonLoader;
