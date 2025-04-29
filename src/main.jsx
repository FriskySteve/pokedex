import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import Router from "./components/router/Router.jsx";
import { LoginProvider } from "./context/LoginContext.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoginProvider>
      <RouterProvider router={Router} />
    </LoginProvider>
  </React.StrictMode>
);
