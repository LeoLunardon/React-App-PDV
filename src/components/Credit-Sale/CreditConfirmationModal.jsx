import React, { useState, useEffect } from "react";
import axios from "axios";
import Notification, { notify } from "../Notification/Notification";
import UrlServer from "../../Services/UrlServer";
import CustomersRegisterModal from "./CustomersRegisterModal";

const CreditConfirmationModal = ({
  modalOpen,
  selectedProducts,
  handleCloseModal,
  handleOpenModal,
  handleConfirmSale,
  calculateTotalPrice,
  handleOpenCustomerModal,
  selectedCustomer,
  setSelectedCustomer,
}) => {
  const [customerList, setCustomerList] = useState([]);

  useEffect(() => {
    const consultCustomers = async () => {
      try {
        const response = await axios.get(`${UrlServer}/customers`);
        setCustomerList(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error loading customers:", error);
      }
    };

    if (modalOpen) {
      consultCustomers();
    }
  }, [modalOpen]);
  const totalPrice = calculateTotalPrice();

  if (!modalOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal relative">
        <div className="flex flex-col mb-4">
          <h1 className="inline-block text-3xl text-center mb-4">
            Venda de confiança
          </h1>
          <div className="flex flex-col mb-4">
            <label
              htmlFor="customerSelection"
              className="text-md border border-gray-300 rounded-lg p-2  flex-col flex mb-1"
            >
              <select
                name="customerSelection"
                className=""
                id="customerSelection"
                value={selectedCustomer ? selectedCustomer._id : ""}
                onChange={(e) => {
                  const customerId = e.target.value;
                  const selected = customerList.find(
                    (customer) => customer._id === customerId
                  );
                  setSelectedCustomer(selected);
                }}
              >
                <option value="" disabled>
                  Selecione um cliente
                </option>
                {customerList.map((customer) => (
                  <option key={customer._id} value={customer._id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="flex justify-end">
            <button
              className="py-1 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-brp-1 w-40"
              onClick={() => {
                handleOpenCustomerModal();
              }}
            >
              Cadastrar Cliente
            </button>
          </div>
        </div>
        <Notification />
        <h1>Produtos selecionados:</h1>
        <div className="h-32 overflow-y-auto">
          <ul className="flex flex-col">
            {selectedProducts.map((product) => (
              <div key={product._id} className="text-lg px-4 py-2 product-item">
                <div className="product-info">
                  <span>{product.name}</span>
                  <div className="flex gap-1">
                    <span>QTD: {product.quantity}</span>
                  </div>
                </div>
              </div>
            ))}
          </ul>
        </div>
        <div className="product-price font-bold text-xl flex justify-end mt-5">
          Total: R${totalPrice.toFixed(2)}
        </div>

        <div className="absolute bottom-0 flex ml-28 gap-5 w-full">
          <button
            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            onClick={() => {
              handleConfirmSale();
              handleCloseModal();
            }}
          >
            Confirmar
          </button>
          <button
            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            onClick={handleCloseModal}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreditConfirmationModal;
