import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

//Configurando router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import ProductsPage from "./pages/productsPage";
import SalePage from "./pages/salePage";
import LastSales from "./pages/lastSales";
import DashboardPage from "./pages/dashboardPage";
import CreditSalePage from "./pages/CreditSalePage";
import CreditSaleHistoryPage from "./pages/CreditSaleHistoryPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/home",
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
  {
    path: "/credit-sale",
    element: <CreditSalePage />,
  },
  {
    path: "/credit-sale/history",
    element: <CreditSaleHistoryPage />,
  },
]);

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}> </RouterProvider>
  </React.StrictMode>
);
