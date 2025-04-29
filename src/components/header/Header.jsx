import React, { useContext } from "react";
import { Link } from "react-router-dom";
import pokelogo from "../../icons/International_Pokémon_logo.svg";
import { LoginContext } from "../../context/LoginContext";

export const Header = () => {
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(LoginContext);
  const userName = localStorage.getItem("user");
  const routes = {
    notLoggedIn: [
      { name: "Register", id: 1, path: "register" },
      { name: "Login", id: 2, path: "login" },
    ],
    loggedIn: [
      { name: "Favourites", id: 3, path: "favourites" },
      { name: "Arena", id: 4, path: "arena" },
      { name: "Ranking", id: 5, path: "ranking" },
      { name: "Edit", id: 6, path: "edit" },
    ],
  };
  return (
    <div className="flex w-screen p-8 border-b-4 border-indigo-500 ">
      <Link to={"/"} className="shrink-0">
        <img src={pokelogo} alt="pokemon logo" />
      </Link>
      <div className="flex flex-col items-end grow gap-4">
        <div className="flex items-center gap-2">
          {isUserLoggedIn && <h4>{userName}</h4>}
          <button className="bg-red">Zmiana themu</button>
        </div>
        <div className="flex flex-wrap gap-2 justify-end">
          {routes.loggedIn.map(({ name, id, path }) => (
            <Link key={id} to={isUserLoggedIn ? path : ""}>
              {name}
            </Link>
          ))}
          {!isUserLoggedIn ? (
            routes.notLoggedIn.map(({ name, id, path }) => (
              <Link key={id} to={path}>
                {name}
              </Link>
            ))
          ) : (
            <button onClick={() => setIsUserLoggedIn(false)}>Log out</button>
          )}
        </div>
      </div>
    </div>
  );
};
