import React, { useState } from "react";
import { usePokemonList } from "../../../hooks/usePokemonList";

const Ranking = () => {
  const { pokemons, totalPages, loading, error } = usePokemonList({
    source: "home",
  });
  const [sortBy, setSortBy] = useState("name");

  if (loading) return <p>Ładowanie...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Ranking</h1>
    </div>
  );
};

export default Ranking;
