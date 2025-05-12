import { capitalizeFirstLetter } from "../../utils/stringUtils";
import { usePokemonDetails } from "../../hooks/usePokemonDetails";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";
import { ArenaStats } from "./ArenaStats";
import { useContext } from "react";
import { darkBGCards } from "../../utils/stringUtils";
import PokemonStats from "./PokemonStats";

const PokemonCard = ({ name, source = "home" }) => {
  const { isUserLoggedIn, darkMode } = useContext(LoginContext);
  const { pokemonDetails, isLoading } = usePokemonDetails(name);
  const navigate = useNavigate();

  const handleClick = () => {
    if (source === "home") {
      console.log(source);
      navigate(`/pokemon/${pokemonDetails.name}`);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!pokemonDetails || !pokemonDetails.stats) {
    return <p>Failed to load Pokémon details.</p>;
  }

  return (
    <div
      onClick={handleClick}
      className={` ${
        darkMode ? darkBGCards : ""
      } relative rounded-xl shadow-md p-6 max-w-xs mx-auto flex flex-col items-center dark:bg-zinc-600 bg-gray-100 ${
        source != "arena" && "hover:scale-110 transition-transform duration-300"
      }`}
    >
      <img
        className="size-32"
        src={pokemonDetails.imgUrl}
        alt={`Image of ${pokemonDetails.name}`}
      />
      <h2 className="text-3xl font-bold mt-4 mb-6">
        {capitalizeFirstLetter(pokemonDetails.name)}
      </h2>
      <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-center w-full">
        <PokemonStats pokemon={pokemonDetails} source={source} />
      </div>
      {isUserLoggedIn && pokemonDetails.fights && (
        <ArenaStats stats={pokemonDetails.fights} />
      )}
    </div>
  );
};

export default PokemonCard;
