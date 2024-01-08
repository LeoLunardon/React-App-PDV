import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import {
  AiOutlineUser,
  AiOutlineHeart,
  AiOutlineHistory,
  AiOutlineShoppingCart,
  AiOutlineCloudServer,
  AiOutlineStock,
} from "react-icons/ai";

import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

const SideBar = () => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [open, setOpen] = useState(true);

  const menus = [
    {
      name: "Vendas",
      submenu: [
        { name: "Realizar Venda", link: "/sale" },
        { name: "Venda de confiança", link: "/credit-sale" },
      ],
      icon: FiShoppingCart, // Movido o ícone para o objeto de "Vendas"
    },
    { name: "Produtos", link: "/products", icon: AiOutlineStock },
    {
      name: "Histórico de vendas",
      submenu: [
        { name: "Ultimas vendas", link: "/sales-history" },
        { name: "Venda de confiança", link: "/credit-sale/history" },
      ],
      icon: AiOutlineHistory,
    },
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: MdOutlineDashboard,
      margin: true,
    },
  ];
  const toggleSubmenu = (index) => {
    setActiveSubmenu(activeSubmenu === index ? null : index);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };
  return (
    <section className="flex fixed gap-6">
      <div
        className={`bg-[#13152c] min-h-screen ${
          open ? "w-72" : "w-20"
        } duration-500 text-gray-100 px-4`}
      >
        <div className="py-1 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          <a href="/home" className="inline-block ml-10">
            <h1
              className={`text-white text-center origin-left inline-block mb-4 font-medium text-2xl duration-200 ${
                !open && "scale-0"
              }`}
            >
              RJL <br></br>DISTRIBUIDORA
            </h1>
          </a>
          {menus?.map((menu, i) => (
            <div key={i}>
              {menu.submenu ? (
                <div
                  className="group flex flex-wrap cursor-pointer text-xl gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md"
                  onClick={() => toggleSubmenu(i)}
                >
                  <div>{React.createElement(menu.icon, { size: "20" })}</div>
                  <h2
                    style={{
                      transitionDelay: `${i + 3}00ms`,
                    }}
                    className={`whitespace-pre duration-500 ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    {menu.name}
                  </h2>
                  {open && activeSubmenu === i && (
                    <div className="ml-5 flex gap-4 flex-col p-2 rounded-md">
                      {menu.submenu.map((subitem, j) => (
                        <Link
                          to={subitem.link}
                          key={j}
                          className="block text-white text-md hover:text-gray-300"
                        >
                          {subitem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={menu?.link}
                  className={` ${
                    menu?.margin && "mt-5"
                  } group flex items-center text-xl  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
                >
                  <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                  <h2
                    style={{
                      transitionDelay: `${i + 3}00ms`,
                    }}
                    className={`whitespace-pre duration-500 ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    {menu?.name}
                  </h2>
                </Link>
              )}
            </div>
          ))}

          <button
            onClick={handleLogout}
            className="group flex items-center text-lg gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md"
          >
            <div>{React.createElement(AiOutlineUser, { size: "20" })}</div>
            <h2
              style={{
                transitionDelay: `900ms`,
              }}
              className={`whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              Logout
            </h2>
          </button>
        </div>
      </div>
    </section>
  );
};

export default SideBar;
