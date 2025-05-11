import React, { useContext } from "react";
import { Link } from "react-router-dom";
import pokelogo from "../../icons/International_Pokémon_logo.svg";
import { LoginContext } from "../../context/LoginContext";
import { capitalizeFirstLetter } from "../../utils/stringUtils";
import { FaUser } from "react-icons/fa";
import { Button } from "../shared/Button";

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
          {isUserLoggedIn && (
            <div className="flex items-center gap-1">
              <FaUser /> <h4>{capitalizeFirstLetter(userName)}</h4>
            </div>
          )}
          <button className="bg-red">Zmiana themu</button>
        </div>
        <div className="flex flex-wrap gap-2 justify-end">
          {routes.loggedIn.map(({ name, id, path }) => (
            <Link key={id} to={isUserLoggedIn ? path : ""}>
              <Button>{name}</Button>
            </Link>
          ))}
          {!isUserLoggedIn ? (
            routes.notLoggedIn.map(({ name, id, path }) => (
              <Link key={id} to={path}>
                <Button>{name}</Button>
              </Link>
            ))
          ) : (
            <Button onClick={() => setIsUserLoggedIn(false)}>Log out</Button>
          )}
        </div>
      </div>
    </div>
  );
};
