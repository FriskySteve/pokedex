import { useState } from "react";
import { usePokemonList } from "../../../hooks/usePokemonList";
import PokemonCard from "../../shared/pokemonCard";
import postArenaResults from "../../../services/postArenaResults";
import { useSnackbar } from "notistack";
import { capitalizeFirstLetter } from "../../../utils/stringUtils";
import deleteFromArena from "../../../services/deleteFromArena";
import { FaDeleteLeft } from "react-icons/fa6";
import { TbPokeballOff } from "react-icons/tb";
import { GiCrossedSabres } from "react-icons/gi";
import { LuDoorOpen } from "react-icons/lu";
import PageTitle from "../../shared/PageTitle";

const Arena = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const { pokemons, loading, error } = usePokemonList({
    source: "arena",
    refreshKey,
  });
  const [showExit, setShowExit] = useState(false);
  const [looser, setLooser] = useState(null);
  const [winner, setWinner] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  if (loading) return <p>Ładowanie...</p>;
  if (error) return <p>{error}</p>;

  const firstFighter = pokemons[0];
  const secondFighter = pokemons[1];
  const fightersCounter = pokemons.length;

  const handleFight = async () => {
    const firstFighterAttackPower =
      firstFighter.stats.base_experience * firstFighter.stats.weight;
    const secondFighterAttackPower =
      secondFighter.stats.base_experience * secondFighter.stats.weight;

    let winner, looser;

    if (firstFighterAttackPower > secondFighterAttackPower) {
      winner = firstFighter;
      looser = secondFighter;
    } else if (secondFighterAttackPower > firstFighterAttackPower) {
      winner = secondFighter;
      looser = firstFighter;
    } else {
      enqueueSnackbar("Remis! Obaj przetrwali...", { variant: "info" });
      return;
    }

    enqueueSnackbar(`Zwycięzca: ${capitalizeFirstLetter(winner.name)}`, {
      variant: "success",
    });

    setLooser(looser);
    setWinner(winner);

    await postArenaResults(winner, looser);
    setShowExit(true);
  };

  const handleLeaveArena = () => {
    deleteFromArena(secondFighter);
    deleteFromArena(firstFighter);
    setShowExit(false);
    setRefreshKey((prev) => prev + 1);
  };

  const handleDeleteFromArena = (name) => {
    deleteFromArena(name);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="dark">
      <PageTitle>O Bogowie.. WALKA</PageTitle>
      <div className="flex justify-center items-center gap-5">
        {firstFighter ? (
          <div
            className={`relative ${
              winner === firstFighter
                ? "scale-105 animate-pulse shadow-lg shadow-yellow-400/50"
                : ""
            } ${looser === firstFighter ? "opacity-50" : ""}`}
          >
            <PokemonCard name={firstFighter.name} source={"arena"} />
            <FaDeleteLeft
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => handleDeleteFromArena(firstFighter)}
            />
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <TbPokeballOff size={250} />
          </div>
        )}
        <div className="flex flex-col gap-10">
          <GiCrossedSabres
            onClick={fightersCounter < 2 ? null : handleFight}
            className={`cursor-pointer transition-opacity ${
              fightersCounter < 2 ? "opacity-50 pointer-events-none" : ""
            }`}
            size={50}
          />
          {showExit && (
            <LuDoorOpen
              size={50}
              onClick={handleLeaveArena}
              className="cursor-pointer"
            />
          )}
        </div>
        {secondFighter ? (
          <div
            className={`relative ${
              winner === secondFighter
                ? "scale-105 animate-pulse shadow-lg shadow-yellow-400/50"
                : ""
            } ${looser === secondFighter ? "opacity-50" : ""}`}
          >
            <PokemonCard name={secondFighter.name} source={"arena"} />
            <FaDeleteLeft
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => handleDeleteFromArena(secondFighter)}
            />
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <TbPokeballOff size={250} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Arena;
