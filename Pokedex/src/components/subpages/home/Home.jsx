import { usePokemonList } from "../../../hooks/usePokemonList";
import PageTitle from "../../shared/PageTitle";
import PokemonLoader from "../../shared/PokemonLoader";

const Home = () => {
  const { pokemons, totalPages, loading, error } = usePokemonList({
    source: "home",
  });

  if (loading) return <p>Ładowanie...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <PageTitle>PokeDex</PageTitle>
      <PokemonLoader pokemons={pokemons} totalPages={totalPages} />
    </div>
  );
};

export default Home;
