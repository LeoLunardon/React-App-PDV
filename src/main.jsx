import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

//Configurando router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/homePage";
import ProductsPage from "./pages/productsPage";
import SalePage from "./pages/salePage";
import LastSales from "./pages/lastSales";
import DashboardPage from "./pages/dashboardPage";


import { DashboardPage } from "./pages/dashboardPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/products",
    element: <ProductsPage />,
  },
  {
    path: "/sale",
    element: <SalePage />,
  },
  {
    path: "/sales-history",
    element: <LastSales />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}> </RouterProvider>
  </React.StrictMode>
);
