import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import SaleDetailModal from "./SaleDetailModal";
import UrlServer from "../../Services/UrlServer";

const SaleCards = () => {
  const [sales, setSales] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null); // Corrected variable name

  const handleOpenModal = (sale) => {
    setSelectedSale(sale);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedSale(null);
    setModalOpen(false);
  };

  const saleCard = () => {
    axios
      .get(`${UrlServer}/sales-history`)
      .then((response) => {
        const salesData = response.data;
        setSales(salesData);
      })
      .catch((error) => {
        console.error("Erro ao buscar vendas:", error);
      });
  };

  useEffect(() => {
    saleCard();
  }, []);

  return (
    <div className="ml-80 mt-10 ">
      <h1 className=" ml-5 text-3xl font-medium">Ultimas Vendas</h1>
      <div className="flex container-sale max-w-4xl container-cards overflow-y-auto  mt-10 gap-x-4 gap-y-3 flex-wrap">
        {sales
          .slice()
          .reverse()
          .map((sale) => (
            <div key={sale._id} className="flex ml-4">
              <div className="block rounded-lg bg-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.1),0_10px_20px_-2px_rgba(0,0,0,0.1)] dark:bg-neutral-700">
                <div className="border-b-2 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium border-neutral-300 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
                  Venda #{sale.saleId}
                </div>
                <div className="p-2 text-left">
                  <p className="pb-2">QTD: {sale.totalQuantity}</p>
                  <p className="pb-2">Valor: R${sale.totalSalePrice}</p>
                  <p className="pb-2">
                    Data: {new Date(sale.date).toLocaleDateString()}
                  </p>
                  <button
                    onClick={() => handleOpenModal(sale)}
                    className=" flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-700 to-green-500 group-hover:from-green-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                  >
                    <span className=" px-2 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      Visualizar
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        {modalOpen && selectedSale && (
          <SaleDetailModal
            handleCloseModal={handleCloseModal}
            sale={selectedSale}
          />
        )}
      </div>
    </div>
  );
};
export default SaleCards;
