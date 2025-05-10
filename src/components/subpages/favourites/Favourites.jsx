import { usePokemonList } from "../../../hooks/usePokemonList";
import PokemonCard from "../../shared/pokemonCard";

const Favourites = () => {
  const { pokemons, loading, error } = usePokemonList({
    source: "fav",
  });
  if (loading) return <p>Ładowanie...</p>;
  if (error) return <p>{error}</p>;

  if (pokemons.length < 1) {
    return (
      <p>
        Nie dodałaś/eś jeszcze żadnego Pokemona do ulubionych. Najwyższa pora to
        zmienić!
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      {/* <div> */}
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon?.name} name={pokemon?.name} />
      ))}
      {/* </div> */}
    </div>
  );
};

export default Favourites;
