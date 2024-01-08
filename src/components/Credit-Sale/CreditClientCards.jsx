import React, { useEffect, useState } from "react";
import axios from "axios";
import UrlServer from "../../Services/UrlServer";
import "./Style.css";
import { notify } from "../Notification/Notification";

const CreditClientCards = () => {
  const [creditSaleData, setCreditSaleData] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);

  const creditCards = () => {
    axios
      .get(`${UrlServer}/credit-sales`)
      .then((response) => {
        const creditData = response.data;
        setCreditSaleData(creditData);
      })
      .catch((error) => {
        console.error("Erro ao buscar clientes de confiança", error);
      });
  };

  useEffect(() => {
    creditCards();
  }, []);

  const handleSelectCard = (card) => {
    if (selectedCards.some((c) => c._id === card._id)) {
      setSelectedCards(selectedCards.filter((c) => c._id !== card._id));
    } else {
      setSelectedCards([...selectedCards, card]);
    }
  };

  return (
    <div>
      <h1 className="inline-block ml-80 mb-20">Histórico de vendas</h1>

      <div className="flex container-sale max-w-4xl  container-cards overflow-y-auto ml-80 gap-x-4 gap-y-3 flex-wrap">
        {creditSaleData.length === 0 ? (
          <div className="flex flex-col h-80 mt-10">
            <h2 className="underline text-4xl text-red-500">
              Nenhuma venda de confiança foi realizada ainda
            </h2>
          </div>
        ) : (
          creditSaleData.map((creditSale) => (
            <div
              key={creditSale._id}
              className={`flex ml-4 ${
                selectedCards.some((c) => c._id === creditSale._id)
                  ? "selected"
                  : ""
              }`}
              onClick={() => handleSelectCard(creditSale)}
            >
              <div
                className={`block rounded-lg w-48 text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.1),0_10px_20px_-2px_rgba(0,0,0,0.1)]  ${
                  selectedCards.some((c) => c._id === creditSale._id)
                    ? "bg-blue-50"
                    : ""
                }`}
              >
                <div
                  className={`border-b-2 text-white cursor-pointer bg-red-500 font-medium border-neutral-300 px-6 py-3 ${
                    selectedCards.some((c) => c._id === creditSale._id)
                      ? "bg-blue-600"
                      : ""
                  }`}
                >
                  {creditSale.clientName}
                </div>

                <div className="p-2 text-left">
                  <p className="pb-2">QTD: {creditSale.totalQuantity}</p>
                  <p className="pb-2 ">Valor: R${creditSale.totalSalePrice}</p>
                  <p className="pb-2">
                    Data:
                    {new Date(creditSale.date).toLocaleDateString()}
                  </p>
                  <p className="pb-2 text-red-500">
                    Data Limite:
                    {new Date(creditSale.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CreditClientCards;
