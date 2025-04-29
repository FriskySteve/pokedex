import { createContext, useState, useEffect } from "react";

export const LoginContext = createContext(null);

export const LoginProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("") === "true";
    setIsUserLoggedIn(isLoggedIn);
  }, []);

  return (
    <LoginContext.Provider value={{ isUserLoggedIn, setIsUserLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
};
