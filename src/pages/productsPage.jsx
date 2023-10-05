import React from "react";
import SideBar from "../components/SideBar/SideBar";
import List from "../components/Products/List";
import getToken from "../Services/tokenService";
import { useEffect } from "react";
const ProductsPage = () => {
  useEffect(() => {
    const token = getToken();
  })
  return (
    <div className="flex  ">
      <SideBar />
      <div className="ml-80 flex">
        <List />
      </div>
    </div>
  );
};

export default ProductsPage;
