import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { usePokemonDetails } from "../../hooks/usePokemonDetails";
import { capitalizeFirstLetter, splitWords } from "../../utils/stringUtils";
import { GiSwordsEmblem } from "react-icons/gi";
import { TiHeart } from "react-icons/ti";
import { LoginContext } from "../../context/LoginContext";
import { useSnackbar } from "notistack";
import getArenaRequest from "../../services/getArenaRequest";
import getArenFightersNumber from "../../services/getArenaFightersNumber";

const PokemonDetails = () => {
  const { name } = useParams();
  const { pokemonDetails, isLoading } = usePokemonDetails(name);
  const { isUserLoggedIn } = useContext(LoginContext);
  const { enqueueSnackbar } = useSnackbar();
  const [isLoadingArenaRequest, setIsLoadingArenaRequest] = useState(false);
  const [arenaCount, setArenaCount] = useState(getArenFightersNumber);

  const handleArenaToggle = async () => {
    setIsLoadingArenaRequest(true);
    try {
      const result = await getArenaRequest(pokemonDetails);
      setArenaCount(result.count);

      enqueueSnackbar(result.message, {
        variant: result.success ? "success" : "warning",
      });
    } catch (err) {
      enqueueSnackbar(`Coś poszło nie tak ${err}`, { variant: "error" });
    } finally {
      setIsLoadingArenaRequest(false);
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
            <TiHeart
              className="absolute top-2 right-2 cursor-pointer"
              size={24}
              color="red"
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
