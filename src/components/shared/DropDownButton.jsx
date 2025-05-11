import { useState } from "react";

const DropdownSelector = ({ options = [], onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState(
    options[0]?.key || "Wybierz..."
  );

  const handleSelect = (option) => {
    setSelectedKey(option.key);
    setIsOpen(false);
    if (onSelect) onSelect(option.value);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {selectedKey}
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-max bg-white border rounded shadow z-10">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option)}
              className="block text-left px-4 py-2 hover:bg-gray-100"
            >
              {option.key}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownSelector;
