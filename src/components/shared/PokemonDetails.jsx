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
      <p>{value}</p>
      <p>{splitWords(capitalizeFirstLetter(key))}</p>
    </div>
  ));

  return (
    <div>
      <img
        src={pokemonDetails.imgUrl}
        alt={`Image of ${pokemonDetails.name}`}
      />
      <p>{capitalizeFirstLetter(pokemonDetails.name)}</p>
      <div>{statsInfo}</div>
      {children}
    </div>
  );
};
