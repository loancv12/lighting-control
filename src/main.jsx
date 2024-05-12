import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Statistics from "./Statistics.jsx";
import Control from "./Control.jsx";
import RequiredAuth from "./RequiredAuth.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequiredAuth />,
        children: [
          {
            index: true,
            element: <Control />,
          },
          {
            path: "statistics",
            element: <Statistics />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
