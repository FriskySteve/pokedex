export const ArenaStats = ({ stats, detailed = false }) => {
  return (
    <div
      className={`absolute flex ${
        !detailed ? "flex-col top-0" : "flex-row gap-2 bottom-0"
      } left-0 bg-gray-600 p-3 font-bold text-center rounded-tl-sm rounded-br-lg text-white`}
    >
      <div className="flex gap-2">
        <p>W:</p>
        <p>{stats.wins}</p>
      </div>
      <div className="flex w-full place-content-between ">
        <p>L:</p>
        <p>{stats.looses}</p>
      </div>
    </div>
  );
};
