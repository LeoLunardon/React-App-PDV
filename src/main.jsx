import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

//Configurando router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/homePage.jsx";
import ProductsPage from "./pages/productsPage.jsx";
import SalePage from "./pages/salePage.jsx";
import LastSales from "./pages/lastSales.jsx";

import DashboardPage from "./pages/dashboardPage.jsx";

const paths = {
  "/": HomePage,
  "/products": ProductsPage,
  "/sale": SalePage,
  "/sales-history": LastSales,
  "/dashboard": DashboardPage,
}

const router = createBrowserRouter([
  {
    path: paths["/"],

    element: <HomePage />,
  },
  {
    path: paths["/products"],
    element: <ProductsPage />,
  },
  {
    path: paths["/sale"],
    element: <SalePage />,
  },
  {
    path: paths["/sales-history"],
    element: <LastSales />,
  },
  {
    path: paths["/dashboard"],
    element: <DashboardPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>

  </React.StrictMode>
);
