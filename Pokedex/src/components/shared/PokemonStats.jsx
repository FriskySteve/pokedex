import { useState } from "react";
import { capitalizeFirstLetter, splitWords } from "../../utils/stringUtils";
import updatePokemonStats from "../../services/updatePokemonStats";
import { useNavigate } from "react-router";
import { useSnackbar } from "notistack";

const PokemonStats = ({ pokemon, source }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [editingKey, setEditingKey] = useState(null);
  const [editedStats, setEditedStats] = useState({ ...pokemon.stats });
  const navigate = useNavigate();

  const handleEditClick = (key) => {
    if (source === "edit") {
      setEditingKey(key);
    }
  };

  const handleChange = (e, key) => {
    setEditedStats({
      ...editedStats,
      [key]: e.target.value,
    });
  };

  const handleBlur = async (key, value) => {
    setEditingKey(null);
    await updatePokemonStats(pokemon, key, value);
    enqueueSnackbar(
      `Zmieniono wartość ${capitalizeFirstLetter(
        key
      )} na ${value} u ${capitalizeFirstLetter(pokemon.name)}.`,
      {
        variant: "success",
      }
    );
    navigate("/");
  };

  return (
    <>
      {Object.entries(editedStats).map(([key, value]) => (
        <div key={key}>
          {editingKey === key ? (
            <input
              type="text"
              value={value}
              onChange={(e) => handleChange(e, key)}
              onBlur={() => handleBlur(key, value)}
              autoFocus
              className="text-sm text-gray-700 border px-2 py-1 rounded w-full"
            />
          ) : (
            <p
              {...(key !== "ability"
                ? { onClick: () => handleEditClick(key) }
                : {})}
              className={`text-gray-500 text-sm ${
                source === "edit" && key !== "ability" ? "cursor-pointer" : ""
              }`}
            >
              {value}
            </p>
          )}
          <p className="whitespace-nowrap font-semibold">
            {splitWords(capitalizeFirstLetter(key))}
          </p>
        </div>
      ))}
    </>
  );
};

export default PokemonStats;
