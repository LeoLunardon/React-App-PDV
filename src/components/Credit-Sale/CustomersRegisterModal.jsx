import axios from "axios";
import React, { useState } from "react";
import UrlServer from "../../Services/UrlServer";
import { notify } from "../Notification/Notification";
import "./Style.css";

const CustomersRegisterModal = ({ modalOpen, handleCloseModal }) => {
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
  });

  const handleConfirmRegistration = async () => {
    try {
      const customerName = document.getElementById("customerName").value;
      const customerPhone = document.getElementById("customerPhone").value;

      const response = await axios.post(`${UrlServer}/customers`, {
        name: customerName,
        phone: customerPhone,
      });

      const { name, phone } = response.data;

      setCustomer({ name, phone });

      notify("Cliente registrado com sucesso!", "success");
    } catch (error) {
      console.error("Erro ao registrar cliente:", error);
      notify("Erro ao registrar cliente", "error");
    }
  };

  const cleanFields = () => {
    document.getElementById("customerName").value = "";
    document.getElementById("customerPhone").value = "";
  };

  if (!modalOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal relative">
        <div className="flex flex-col mb-4">
          <h1 className="inline-block text-3xl text-center mb-4">
            Cadastre um novo cliente
          </h1>
          <label htmlFor="customerName" className="text-md mb-1">
            <input
              type="text"
              id="customerName"
              placeholder="Nome do cliente"
              className="border border-gray-300 px-3 py-2 rounded"
            />
          </label>
          <label htmlFor="customerPhone" className="text-md mb-1">
            <input
              type="text"
              id="customerPhone"
              placeholder="Telefone do cliente"
              className="border border-gray-300 px-3 py-2 rounded"
            />
          </label>
        </div>
        <div className="absolute bottom-0 flex ml-28 gap-5 w-full">
          <button
            onClick={() => {
              handleConfirmRegistration();
              cleanFields();
              handleCloseModal();
            }}
            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
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

export default CustomersRegisterModal;
