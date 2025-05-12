import { useState, useEffect } from "react";
import { checkIfImageExists } from "../../services/checkImageExists";

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
        <button
          type="button"
          onClick={handlePrev}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Poprzedni
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Następny
        </button>
      </div>
      {isUsedImage && (
        <p className="text-sm text-red-500">Ten obrazek jest już używany</p>
      )}
    </div>
  );
};

export default PokemonCarousel;
