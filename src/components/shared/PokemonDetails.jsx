import { useParams, useLocation, useNavigate } from "react-router-dom";
import { usePokemonDetails } from "../../hooks/usePokemonDetails";
import { capitalizeFirstLetter, splitWords } from "../../utils/stringUtils";

const PokemonDetails = () => {
  const { name } = useParams();
  const { pokemonDetails, isLoading } = usePokemonDetails(name);
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    if (!location.pathname.includes(`/pokemon/${pokemonDetails.name}`)) {
      navigate(`/pokemon/${pokemonDetails.name}`);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (!pokemonDetails) return <p>No details found for {name}</p>;

  return (
    <div
      onClick={handleClick}
      className="bg-gray-100 rounded-xl shadow-md p-6 max-w-xs mx-auto flex flex-col items-center hover:scale-110 transition-transform duration-300"
    >
      <img
        className="size-32"
        src={pokemonDetails.imgUrl}
        alt={pokemonDetails.name}
      />
      <h2 className="text-3xl font-bold mt-4 mb-6">
        {capitalizeFirstLetter(pokemonDetails.name)}
      </h2>
      <ul className="text-center">
        {Object.entries(pokemonDetails.stats).map(([key, value]) => (
          <li key={key}>
            {splitWords(capitalizeFirstLetter(key))}: {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonDetails;
