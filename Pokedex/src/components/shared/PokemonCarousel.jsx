import { useState, useEffect } from "react";
import { checkIfImageExists } from "../../services/checkImageExists";
import { Button } from "./Button";

const PokemonCarousel = ({ onImageSelect, onImageStatusChange }) => {
  const [counter, setCounter] = useState(151);
  const [imgUrl, setImgUrl] = useState(null);
  const [isUsedImage, setIsUsedImage] = useState(false);

  useEffect(() => {
    const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${counter}.svg`;
    setImgUrl(url);
    onImageSelect?.(url);

    const checkImage = async () => {
      const exists = await checkIfImageExists(url);
      setIsUsedImage(exists);
      onImageStatusChange?.(exists);
    };

    checkImage();
  }, [counter, onImageSelect, onImageStatusChange]);

  const handleNext = () => setCounter((prev) => prev + 1);
  const handlePrev = () => setCounter((prev) => (prev > 151 ? prev - 1 : prev));

  return (
    <div className="flex flex-col items-center gap-4">
      <img
        src={imgUrl}
        alt={`Pokemon ${counter}`}
        className={`w-40 h-40 object-contain ${
          isUsedImage ? "grayscale opacity-50" : ""
        }`}
      />
      <div className="flex gap-4">
        <Button type={"button"} onClick={handlePrev}>
          Poprzedni
        </Button>
        <Button type={"button"} onClick={handleNext}>
          Następny
        </Button>
      </div>
      {isUsedImage && (
        <p className="text-sm text-red-500">Ten obrazek jest już używany</p>
      )}
    </div>
  );
};

export default PokemonCarousel;
