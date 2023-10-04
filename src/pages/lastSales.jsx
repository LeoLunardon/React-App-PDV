import React from "react";
import SideBar from "../components/SideBar/SideBar";
import SaleCards from "../components/Last-Sales/SaleCards";

const LastSales = () => {

  return (
    <div>
      <div>
        <SideBar />
      </div>
      <div>
        <SaleCards />
      </div>
    </div>
  );
};

export default LastSales;
