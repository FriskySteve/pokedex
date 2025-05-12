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
        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition w-36"
      >
        {selectedKey}
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-max border rounded shadow z-10 dark:bg-zinc-800 bg-blue-200">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option)}
              className="block hover:bg-gray-100 w-36"
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
