import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Realizar Vendas", src: "https://i.imgur.com/Ry5XvZz.png", url: "/sale" },
    { title: "Ultimas Vendas", src: "https://i.imgur.com/3x6nqKa.png", url: "/sales-history" },
    { title: "Produtos", src: "https://i.imgur.com/itmTZue.png", gap: true, url: "/products" },
    { title: "Dashboard", src: "https://i.imgur.com/8LhRAvR.png", url: "/dashboard" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20"
        } bg-dark-purple h-screen max-h-full p-5 pt-8 fixed duration-300`}
      >
        <a>
          <img
            src="https://i.imgur.com/GZaeqP3.png"
            className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
        </a>
        <div className="flex gap-x-4 items-center">
          <a href="/home">
            <img
              src="https://i.imgur.com/3TdNEVd.png"
              className={`cursor-pointer duration-500 ${
                open && "rotate-[360deg]"
              }`}
              alt="Logo"
            />
            <h1
              className={`text-white text-center origin-left font-medium text-xl duration-200 ${
                !open && "scale-0"
              }`}
            >
              RJL <br></br>DISTRIBUIDORA
            </h1>
          </a>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-md text-gray-300 items-center gap-x-4 ${
                Menu.gap ? "mt-9" : "mt-2"
              } ${currentPath === Menu.url ? "bg-light-white" : ""}`}
            >
              <Link to={Menu.url}>
                <img src={Menu.src} alt={Menu.title} />
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {Menu.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <button className="mt-10 text-white ml-3" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default SideBar;
