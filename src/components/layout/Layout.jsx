import React from "react";
import { Header } from "../header/Header";

export const Layout = ({ children }) => {
  return (
    <div className="h-screen bg-bgPrimColor text-ftPrimColor transition-colors duration-300">
      <Header />
      <div className="flex flex-col items-center gap-8 p-8">{children}</div>
    </div>
  );
};
