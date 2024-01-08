import React from "react";
import SideBar from "../components/SideBar/SideBar";
import CreditSaleSearch from "../components/Credit-Sale/CreditSaleSearch";

const CreditSalePage = () => {
  return (
    <div>
      <div> 
        <SideBar />
      </div>
      <div className="ml-80">
        <CreditSaleSearch />
      </div>
    </div>
  );
};

export default CreditSalePage;
