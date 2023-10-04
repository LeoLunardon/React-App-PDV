import React, { useState } from "react";
import axios from "axios";
import "./Products.css";
import Notification, { notify } from "../Notification/Notification";
import RegisterModal from "./RegisterModal";
import UrlServer from "../../Services/UrlServer";

const Register = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const [product, setProduct] = useState({
    name: "",
    price: "",
    salePrice: "",
    quantity: "",
  });

  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${UrlServer}/product`, product);
      setProduct({
        name: "",
        price: "",
        salePrice: "",
        quantity: "",
      });
      notify("Produto cadastrado com sucesso!", "success");
    } catch (error) {
      console.log(error);
      notify("Erro ao cadastrar produto!", "error");
    }
  };

  return (
    <div className="md:p-4 p-6">
      <button
        onClick={handleOpenModal}
        type="button"
        class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Cadastrar um novo produto
      </button>

      {/* Abre o modal passando as propriedades necessárias */}
      <RegisterModal
        modalOpen={modalOpen}
        product={product}
        handleModalClose={handleCloseModal}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Register;
