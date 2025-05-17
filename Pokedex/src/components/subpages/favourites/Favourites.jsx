import PageTitle from "../../shared/PageTitle";
import PokemonLoader from "../../shared/PokemonLoader";

const Favourites = () => {
  return (
    <div>
      <PageTitle>Twoi Ulubieńcy</PageTitle>
      <PokemonLoader source="fav" enableSearch={false} />
    </div>
  );
};

export default Favourites;
