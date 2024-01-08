import React from "react";
import SideBar from "../components/SideBar/SideBar";
import NavigationHome from "../components/Home/NavigationHome";
import getToken from "../Services/tokenService";
import UrlServer from "../Services/UrlServer";
import { useEffect } from "react";
import Shortcut from "../components/ShortCuts/Shortcut";

const HomePage = () => {
  useEffect(() => {
    const token = getToken();
  });

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
