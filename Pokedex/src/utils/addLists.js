const addLists = (localPokemons, apiPokemons) => {
  return [
    ...localPokemons,
    ...apiPokemons.filter(
      (apiPokemon) =>
        !localPokemons.some((local) => local.name === apiPokemon.name)
    ),
  ];
};

export default addLists;
