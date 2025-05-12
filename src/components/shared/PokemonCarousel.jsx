import React, { useState, useEffect } from "react";
import { getRestPokemonImgs } from "../../services/getRestPokemonsImgs";

const PokemonCarousel = ({ onImageChange }) => {
  const [startId, setStartId] = useState(151);
  const [counter, setCounter] = useState(151);
  const [end, setEnd] = useState(null);
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRestPokemonImgs();
      setEnd(data);
    };

    fetchData();
  }, [startId]);

  useEffect(() => {
    const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${counter}.svg`;
    setImgUrl(url);
    if (onImageChange) {
      onImageChange(url);
    }
  }, [counter]);

  const handleNext = () => {
    if (end !== null && counter < end) {
      setCounter((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (end !== null && counter > startId) {
      setCounter((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {imgUrl && (
        <img
          src={imgUrl}
          alt={`Pokemon ${counter}`}
          className="w-40 h-40 object-contain"
        />
      )}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={handlePrev}
          disabled={counter === startId}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          Poprzedni
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={counter === end}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-green-300"
        >
          Następny
        </button>
      </div>
    </div>
  );
};

export default PokemonCarousel;
