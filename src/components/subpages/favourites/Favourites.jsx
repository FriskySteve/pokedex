import { usePokemonList } from "../../../hooks/usePokemonList";
import PageTitle from "../../shared/PageTitle";
import PokemonLoader from "../../shared/PokemonLoader";

const Favourites = () => {
  const { pokemons, totalPages, loading, error } = usePokemonList({
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
    <div className="dark">
      <PageTitle>Twoi Ulubieńcy</PageTitle>
      <PokemonLoader
        pokemons={pokemons}
        totalPages={totalPages}
        enableSearch={false}
      />
    </div>
  );
};

export default Favourites;
