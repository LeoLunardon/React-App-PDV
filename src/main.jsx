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
import LoginPage from "./pages/loginPage.jsx";
import DashboardPage from "./pages/dashboardPage.jsx";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/Products",
    element: <ProductsPage />,
  },
  {
    path: "/Sale",
    element: <SalePage />,
  },
  {
    path: "/Sales-history",
    element: <LastSales />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
