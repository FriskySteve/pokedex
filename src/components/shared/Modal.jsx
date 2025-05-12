import { useEffect } from "react";
import { Button } from "./Button";
import NewPokemonForm from "./NewPokemonForm";

const Modal = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-md w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <NewPokemonForm />
        <Button onClick={onClose}>Zamknij</Button>
      </div>
    </div>
  );
};

export default Modal;
