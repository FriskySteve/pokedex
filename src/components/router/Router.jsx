import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../../App.jsx";
import Home from "../subpages/home/Home.jsx";
import Login from "../subpages/login/Login.jsx";
import Register from "../subpages/register/Register.jsx";
import Favourites from "../subpages/favourites/Favourites.jsx";
import Arena from "../subpages/arena/Arena.jsx";
import Ranking from "../subpages/ranking/Ranking.jsx";
import Edit from "../subpages/edit/Edit.jsx";
import PokemonDetails from "../shared/PokemonDetails.jsx";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "favourites", element: <Favourites /> },
      { path: "arena", element: <Arena /> },
      { path: "ranking", element: <Ranking /> },
      { path: "edit", element: <Edit /> },
      { path: "pokemon/:name", element: <PokemonDetails /> },
    ],
  },
]);

export default Router;
