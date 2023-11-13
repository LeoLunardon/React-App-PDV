import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Products.css";
import QuantityEdit from "./QuantityEdit";
import Notification, { notify } from "../Notification/Notification";
import Register from "./Register";
import * as XLSX from "xlsx";
import { format } from "date-fns";
import UrlServer from "../../Services/UrlServer";

const List = () => {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    axios
      .get(`${UrlServer}/product`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos:", error);
        notify("Erro ao buscar produtos!", "error");
      });
  }, []);

  const formatDataForExcel = (data) => {
    const formattedData = data.map((product) => ({
      Nome: product.name,
      "Preço de compra(R$)": product.price,
      "Preço de venda(R$)": product.salePrice,
      Quantidade: product.quantity,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData, {
      header: ["Nome", "Preço de compra(R$)", "Preço de venda(R$)", "Quantidade"],
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Produtos");

    const excelBlob = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    return new Blob([excelBlob], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
  };

  const handleEditQuantity = (productId) => {
    setSelectedProductId(productId);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    // Update the quantity for the selected product
    const updatedProducts = products.map((product) => {
      if (product._id === productId) {
        return { ...product, quantity: newQuantity };
      }
      return product;
    });
    setProducts(updatedProducts);
    setSelectedProductId(null);
  };

  const handleSaveChanges = async () => {
    try {
      // Enviar as atualizações para o servidor
      await Promise.all(
        products.map(async (product) => {
          await axios.patch(`${UrlServer}/product/${product._id}`, {
            name: product.name,
            price: product.price,
            quantity: product.quantity,
            salePrice: product.salePrice,
          });
        })
      );
      window.location.reload();
      notify("Alterações salvas com sucesso!", "success");
    } catch (error) {
      console.error("Erro ao salvar as alterações:", error);
      notify("Erro ao salvar as alterações!", "error");
    }
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja deletar esse produto?"
    );
    if (confirmDelete) {
      axios
        .delete(`${UrlServer}/product/${id}`)
        .then((response) => {
          setProducts(products.filter((product) => product._id !== id));
        })
        .then(() => {
          notify("Produto deletado com sucesso!", "success");
        })
        .catch((error) => {
          console.error("Erro ao deletar produto:", error);
          notify("Erro ao deletar produto!", "error");
        });
    } else {
      return;
    }
  };

  const getRowColor = (index) => {
    return index % 2 === 0 ? "bg-gray-300" : "bg-gray-100";
  };

  return (
    <div className="p-4 list-container">
      <Notification />
      <div className="flex justify-between">
        <h1 className="text-3xl font-medium mt-10 mb-5">Estoque de Produtos</h1>
       
        <div className="mt-10 flex">
          <Register />
        <a
          href={URL.createObjectURL(formatDataForExcel(products))}
          download={`estoque_${new Date().toLocaleDateString()}.xlsx`}
          className="bg-green-500 inline-block mt-4 h-10 mx-2 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Download Tabela
        </a>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        <table className="min-w-full ">
          <thead>
            <tr className="text-left">
              <th>Nome</th>
              <th>Preço</th>
              <th>Preço de Venda</th>
              <th>Quantidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={product._id}
                className={`text-left ${getRowColor(index)} `}
              >
                <td className="p-2">{product.name}</td>
                <td className="p-2">R${product.price}</td>
                <td className="p-2">R${product.salePrice}</td>
                <td className="p-2">
                  {selectedProductId === product._id ? (
                    <QuantityEdit
                      quantity={product.quantity}
                      onQuantityChange={(newQuantity) =>
                        handleQuantityChange(product._id, newQuantity)
                      }
                    />
                  ) : (
                    `${product.quantity} un`
                  )}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 inline-block ml-2 cursor-pointer"
                    onClick={() => handleEditQuantity(product._id)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </td>
                <td className="p-2">
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(product._id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 text-white font-bold py-2 px-4 mt-4"
        onClick={handleSaveChanges}
      >
        Salvar Alterações
      </button>
    </div>
  );
};

export default List;
