import React from "react";
import SideBar from "../components/SideBar/SideBar";
import Sale from "../components/Sale/Sale";
import getToken from "../Services/tokenService";
import { useEffect } from "react";

const SalePage = () => {

  return (
    <div className="flex">
      <SideBar />
      <div className="flex ml-80">
        <Sale />
      </div>
    </div>
  );
};

export default SalePage;
