import { capitalizeFirstLetter, splitWords } from "../../utils/stringUtils";
import { usePokemonDetails } from "../../hooks/usePokemonDetails";

export const PokemonDetails = ({ name, children }) => {
  const { pokemonDetails, isLoading } = usePokemonDetails(name);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!pokemonDetails || !pokemonDetails.stats) {
    return <p>Failed to load Pokémon details.</p>;
  }

  const statsInfo = Object.entries(pokemonDetails.stats).map(([key, value]) => (
    <div key={key}>
      <p className="text-gray-500 text-sm">{value}</p>
      <p className="text-xl font-semibold">
        {splitWords(capitalizeFirstLetter(key))}
      </p>
    </div>
  ));

  return (
    <div className="bg-gray-100 rounded-xl shadow-md p-6 max-w-xs mx-auto flex flex-col items-center">
      <div className="w-32 h-32 flex items-center justify-center">
        <img
          src={pokemonDetails.imgUrl}
          alt={`Image of ${pokemonDetails.name}`}
        />
      </div>
      <h2 className="text-3xl font-bold mt-4 mb-6">
        {capitalizeFirstLetter(pokemonDetails.name)}
      </h2>
      <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-center w-full">
        {statsInfo}
      </div>
      {children}
    </div>
  );
};
