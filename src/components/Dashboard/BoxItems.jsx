import React, { useState, useEffect } from "react";
import axios from "axios";
import UrlServer from "../../Services/UrlServer";

const BoxItems = () => {
  const [salesData, setSalesData] = useState({
    productsPrice: 0,
    salesPrice: 0,
    profitFixed: 0,
    salesQuantity: 0,
  });

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get(`${UrlServer}/dashboard`);
        const data = response.data;

        setSalesData({
          productsPrice: data.productsPriceFixed,
          salesPrice: data.salesPrice,
          profit: data.profitFixed,
          salesQuantity: data.salesQuantity,
        });
      } catch (error) {
        console.error("Erro ao buscar vendas:", error);
      }
    };

    fetchSalesData();
  }, []);

  return (
    <div>
      <div className="ml-80 w-8/12 ">
        <ul className="flex justify-between i text-center">
          <li
            className={`focus:outline-none text-white ${
              salesData.profit >= 0 ? "bg-green-700" : "bg-red-600"
            } focus:ring-4 focus:ring-green-300 w-56 rounded-sm text-xl px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800`}
          >
            Lucro <br></br> R${salesData.profit}
          </li>
          <li className="focus:ring-4 bg-red-600 text-white focus:ring-green-300 w-64 rounded-sm text-xl px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            Despesa com produtos<br></br> R${salesData.productsPrice}
          </li>
          <li className="focus:ring-4 bg-orange-600 text-white focus:ring-green-300 w-56 rounded-sm text-xl px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            Valor vendido <br></br> R${salesData.salesPrice}
          </li>
          <li className="focus:ring-4 focus:ring-green-300 w-60 bg-blue-500 text-white rounded-sm text-xl px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            Quantidade de vendas <br></br> {salesData.salesQuantity}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BoxItems;
