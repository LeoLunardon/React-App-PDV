import React from "react";
import SideBar from "../components/SideBar/SideBar";
import NavigationHome from "../components/Home/NavigationHome";
import getToken from "../Services/tokenService";
import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    const token = getToken();
    // Use o token conforme necessário (por exemplo, fazer uma requisição usando o token)
  }, []);
  return (
    <div className="flex">
      <div className="">
        <SideBar />
      </div>
      <div className="flex items-center text-3xl justify-center mx-auto">
        <NavigationHome />
      </div>
    </div>
  );
};

export default HomePage;
