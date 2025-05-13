import PageTitle from "../../shared/PageTitle";
import PokemonLoader from "../../shared/PokemonLoader";

const Home = () => {
  return (
    <div>
      <PageTitle>PokeDex</PageTitle>
      <PokemonLoader />
    </div>
  );
};

export default Home;
