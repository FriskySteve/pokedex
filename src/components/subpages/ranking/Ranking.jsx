import React, { useState, useMemo } from "react";
import { usePokemonList } from "../../../hooks/usePokemonList";
import DropdownSelector from "../../shared/DropdownSelector";
import { capitalizeFirstLetter } from "../../../utils/stringUtils";
import getPokemonDetails from "../../../services/getPokemonDetails";

const sortOptions = [
  { key: "Wzrost", value: "height" },
  { key: "Waga", value: "weight" },
  { key: "Doświadczenie", value: "base_experience" },
  { key: "Wygrane", value: "wins" },
];

const Ranking = () => {
  const { pokemons, loading, error } = usePokemonList({ source: "home" });
  const [sortBy, setSortBy] = useState("wins");
  const [allPokemonDetails, setAllPokemonDetails] = useState([]);

  React.useEffect(() => {
    const fetchDetails = async () => {
      const detailsList = await Promise.all(
        pokemons.map(async (pokemon) => await getPokemonDetails(pokemon.name))
      );
      setAllPokemonDetails(detailsList);
    };

    if (pokemons.length > 0) fetchDetails();
  }, [pokemons]);

  const sortedPokemonList = useMemo(() => {
    return [...allPokemonDetails].sort((a, b) => {
      if (sortBy === "wins") {
        return (b.fights?.wins || 0) - (a.fights?.wins || 0);
      } else {
        return (b.stats?.[sortBy] || 0) - (a.stats?.[sortBy] || 0);
      }
    });
  }, [allPokemonDetails, sortBy]);

  const handleSelect = (option) => {
    setSortBy(option);
  };

  if (loading) return <p>Ładowanie...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Ranking</h1>
      <DropdownSelector options={sortOptions} onSelect={handleSelect} />

      <ul className="space-y-2 mt-4">
        <li className="grid grid-cols-7 text-center font-bold">
          <div>#</div>
          <div>Img</div>
          <div>Nazwa</div>
          <div>Wzrost</div>
          <div>Waga</div>
          <div>Exp</div>
          <div>Wygrane</div>
        </li>
        {sortedPokemonList.map((pokemon, index) => (
          <li
            key={index}
            className="grid grid-cols-7 text-center font-medium items-center border "
          >
            <div>{index + 1}</div>
            <img
              src={pokemon.imgUrl}
              alt={pokemon.name}
              className="size-12 max-sm:size-8 justify-self-center"
            />
            <div>{capitalizeFirstLetter(pokemon.name)}</div>
            <div>{pokemon.stats.height}</div>
            <div>{pokemon.stats.weight}</div>
            <div>{pokemon.stats.base_experience}</div>
            <div>{pokemon.fights?.wins || 0}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ranking;
