import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import pokelogo from "../../icons/International_Pokémon_logo.svg";
import { LoginContext } from "../../context/LoginContext";
import { capitalizeFirstLetter } from "../../utils/stringUtils";
import { FaUser } from "react-icons/fa";
import { Button } from "../shared/Button";
import SliderButton from "../shared/SliderButton";
import { darkBG } from "../../utils/stringUtils";
import { FaBars, FaTimes } from "react-icons/fa";

export const Header = () => {
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(LoginContext);
  const userName = localStorage.getItem("user");
  const { darkMode, setDarkMode } = useContext(LoginContext);
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
  const handleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.className = darkMode
      ? "dark dark:bg-zinc-800 dark:text-yellow-500"
      : "";
  }, [darkMode]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`dark flex w-screen p-8 border-b-4 border-indigo-500 ${
        darkMode ? darkBG : ""
      }`}
    >
      <Link to={"/"} className="shrink-0">
        <img src={pokelogo} alt="pokemon logo" />
      </Link>
      <div className="flex flex-col items-end grow gap-4">
        <div className="flex items-center gap-2">
          {isUserLoggedIn && (
            <div className="flex items-center gap-2">
              <FaUser /> <h4>{capitalizeFirstLetter(userName)}</h4>
            </div>
          )}
          <SliderButton onClick={handleDarkMode} />
        </div>
        <div className="lg:hidden flex items-center">
          <button onClick={toggleMenu} className="text-xl">
            {isMenuOpen ? <FaTimes size={40} /> : <FaBars size={40} />}
          </button>
        </div>
        <div
          className={`${
            isMenuOpen ? "flex flex-col gap-2" : "hidden"
          } lg:flex flex-wrap gap-2 justify-end`}
        >
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
