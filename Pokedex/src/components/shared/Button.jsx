export const Button = ({ onClick, children, type }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-blue-600 py-2 flex justify-center text-center font-medium rounded-lg text-sm hover:bg-blue-700 transition block w-26 text-white"
    >
      {children}
    </button>
  );
};
