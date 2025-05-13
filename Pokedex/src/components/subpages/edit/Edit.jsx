import { usePokemonList } from "../../../hooks/usePokemonList";
import PageTitle from "../../shared/PageTitle";
import PokemonLoader from "../../shared/PokemonLoader";
import Modal from "../../shared/Modal";
import { useState } from "react";
import { Button } from "../../shared/Button";

const Edit = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col justify-center center-items">
      <PageTitle>PokeDex</PageTitle>
      <div className="flex justify-center">
        <Button onClick={handleOpenModal}>Stwórz</Button>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
      <PokemonLoader source={"edit"} />
    </div>
  );
};

export default Edit;
