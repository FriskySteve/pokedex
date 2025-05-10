import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { usePokemonDetails } from "../../hooks/usePokemonDetails";
import { capitalizeFirstLetter, splitWords } from "../../utils/stringUtils";
import { GiSwordsEmblem } from "react-icons/gi";
import { ImHeart } from "react-icons/im";
import { LoginContext } from "../../context/LoginContext";
import { useSnackbar } from "notistack";
import getArenaRequest from "../../services/getArenaRequest";
import getArenFightersNumber from "../../services/getArenaFightersNumber";
import getFavouritesRequest from "../../services/getFavouritesRequest";
import getFavouriteStatus from "../../services/getFavouriteStatus";

const PokemonDetails = () => {
  const { name } = useParams();
  const { pokemonDetails, isLoading } = usePokemonDetails(name);
  const { isUserLoggedIn } = useContext(LoginContext);
  const { enqueueSnackbar } = useSnackbar();
  const [arenaCount, setArenaCount] = useState(getArenFightersNumber);
  const [isFavourite, setIsFavourite] = useState(getFavouriteStatus(name));

  const handleArenaToggle = async () => {
    try {
      const result = await getArenaRequest(pokemonDetails);
      setArenaCount(result.count);

      enqueueSnackbar(result.message, {
        variant: result.success ? "success" : "warning",
      });
    } catch (err) {
      enqueueSnackbar(
        `Coś poszło nie tak przy dodoawaniu / usuwaniu z Areny: ${err}`,
        { variant: "error" }
      );
    }
  };

  const handleFavouriteToggle = async () => {
    try {
      const result = await getFavouritesRequest(pokemonDetails);

      setIsFavourite((prev) => !prev);
      enqueueSnackbar(result.message, {
        variant: result.success ? "success" : "warning",
      });
    } catch (err) {
      enqueueSnackbar(
        `Coś poszło nie tak przy dodoawaniu / usuwaniu z Ulubionych: ${err}`,
        { variant: "error" }
      );
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (!pokemonDetails) return <p>No details found for {name}</p>;

  return (
    <div className="relative bg-gray-100 rounded-xl shadow-md p-6 max-w-xl mx-auto flex gap-10 items-stretch hover:scale-110 transition-transform duration-300">
      <div className="flex-1 flex flex-col justify-center items-center gap-4">
        <img
          className="w-32 h-32 object-contain"
          src={pokemonDetails.imgUrl}
          alt={pokemonDetails.name}
        />
        {isUserLoggedIn && (
          <>
            <GiSwordsEmblem
              onClick={handleArenaToggle}
              className="cursor-pointer"
              size={24}
            />
            <p>{arenaCount} z 2</p>
            <ImHeart
              className={`absolute top-2 right-2 cursor-pointer ${
                isFavourite ? "text-red-500" : "text-gray-400"
              }`}
              size={24}
              onClick={handleFavouriteToggle}
            />
          </>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-6 text-center">
          {capitalizeFirstLetter(pokemonDetails.name)}
        </h2>
        <ul className="text-center space-y-1">
          {Object.entries(pokemonDetails.stats).map(([key, value]) => (
            <li key={key}>
              {splitWords(capitalizeFirstLetter(key))}: {value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonDetails;
