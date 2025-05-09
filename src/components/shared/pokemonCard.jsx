import { capitalizeFirstLetter, splitWords } from "../../utils/stringUtils";
import { usePokemonDetails } from "../../hooks/usePokemonDetails";
import { useNavigate, useLocation } from "react-router-dom";

const PokemonCard = ({ name }) => {
  const { pokemonDetails, isLoading } = usePokemonDetails(name);
  const navigate = useNavigate();
  const location = useLocation();
  const arena = location.pathname.includes(`/arena`);

  const handleClick = () => {
    if (!arena) {
      navigate(`/pokemon/${pokemonDetails.name}`);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!pokemonDetails || !pokemonDetails.stats) {
    return <p>Failed to load Pokémon details.</p>;
  }

  const statsInfo = Object.entries(pokemonDetails.stats).map(([key, value]) => (
    <div key={key}>
      <p className="text-gray-500 text-sm">{value}</p>
      <p className="whitespace-nowrap font-semibold">
        {splitWords(capitalizeFirstLetter(key))}
      </p>
    </div>
  ));

  return (
    <div
      onClick={handleClick}
      className={`bg-gray-100 rounded-xl shadow-md p-6 max-w-xs mx-auto flex flex-col items-center ${
        !arena && "hover:scale-110 transition-transform duration-300"
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
        {statsInfo}
      </div>
      {/* {children} */}
    </div>
  );
};

export default PokemonCard;
