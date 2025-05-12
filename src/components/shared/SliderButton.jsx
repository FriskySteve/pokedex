import { useState } from "react";

const SliderButton = ({ onClick }) => {
  const [isOn, setIsOn] = useState(false);
  const toggle = () => {
    const newState = !isOn;
    setIsOn(newState);
    if (onClick) onClick(newState);
  };

  return (
    <div
      onClick={toggle}
      className={`w-14 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
        isOn ? "bg-green-500" : "bg-gray-300"
      }`}
    >
      <div
        className={`bg-white w-6 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
          isOn ? "translate-x-6" : "translate-x-0"
        }`}
      ></div>
    </div>
  );
};

export default SliderButton;
