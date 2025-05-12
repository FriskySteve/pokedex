import { usePokemonList } from "../../../hooks/usePokemonList";
import PageTitle from "../../shared/PageTitle";
import PokemonLoader from "../../shared/PokemonLoader";
import Modal from "../../shared/Modal";
import { useState } from "react";
import { Button } from "../../shared/Button";

const Edit = () => {
  const { pokemons, totalPages, loading, error } = usePokemonList({
    source: "home",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  if (loading) return <p>Ładowanie...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="dark">
      <PageTitle>PokeDex</PageTitle>
      <Button onClick={handleOpenModal}>Stwórz</Button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
      <PokemonLoader
        pokemons={pokemons}
        totalPages={totalPages}
        source={"edit"}
      />
    </div>
  );
};

export default Edit;
