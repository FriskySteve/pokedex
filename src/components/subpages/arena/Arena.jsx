import React from "react";
import { usePokemonList } from "../../../hooks/usePokemonList";
import PokemonCard from "../../shared/pokemonCard";
import postArenaResults from "../../../services/postArenaResults";
import { useSnackbar } from "notistack";
import { capitalizeFirstLetter } from "../../../utils/stringUtils";
import deleteFromArena from "../../../services/deleteFromArena";
import { FaDeleteLeft } from "react-icons/fa6";
import { TbPokeballOff } from "react-icons/tb";

const Arena = () => {
  const { pokemons, loading, error } = usePokemonList({ source: "arena" });
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

    await postArenaResults(winner, looser);
  };

  return (
    <div className="flex gap-5">
      {firstFighter ? (
        <div className="relative">
          <PokemonCard name={firstFighter.name} />
          <FaDeleteLeft
            className="absolute top-2 right-2 cursor-pointer"
            onClick={() => deleteFromArena(firstFighter)}
          />
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <TbPokeballOff size={250} />
        </div>
      )}
      <button onClick={handleFight}>WALCZ!</button>
      {secondFighter ? (
        <div className="relative">
          <PokemonCard name={secondFighter.name} />
          <FaDeleteLeft
            className="absolute top-2 right-2 cursor-pointer"
            onClick={() => deleteFromArena(secondFighter)}
          />
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <TbPokeballOff size={250} />
        </div>
      )}
    </div>
  );
};

export default Arena;
