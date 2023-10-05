import React from "react";
import SideBar from "../components/SideBar/SideBar";
import SaleList from "../components/Last-Sales/SaleList";
import getToken from "../Services/tokenService";
import { useEffect } from "react";

const LastSales = () => {
  useEffect(() => {
    const token = getToken();
  });
  return (
    <div>
      <div>
        <SideBar />
      </div>
      <div>
        <SaleList />
      </div>
    </div>
  );
};

export default LastSales;
