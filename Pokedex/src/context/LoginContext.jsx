import { createContext, useState, useEffect } from "react";

export const LoginContext = createContext(null);

export const LoginProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("") === "true";
    const savedDarkMode = localStorage.getItem("darkMode") === "true";

    setIsUserLoggedIn(isLoggedIn);
    setDarkMode(savedDarkMode);
  }, []);

  return (
    <LoginContext.Provider
      value={{ isUserLoggedIn, setIsUserLoggedIn, darkMode, setDarkMode }}
    >
      {children}
    </LoginContext.Provider>
  );
};
