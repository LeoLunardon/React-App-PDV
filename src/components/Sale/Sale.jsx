import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Style.css";
import Notification, { notify } from "../Notification/Notification";
import SaleConfirmationModal from "./SaleConfirmationModal";
import ProductSearch from "./ProdutoSearch";
import SelectedProductsList from "./SelectedProductsList";
import UrlServer from "../../Services/UrlServer";

const Sale = () => {
  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isSaleConfirmed, setIsSaleConfirmed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  //Funções de procurar e filtrar  produtos
  const searchProducts = async () => {
    try {
      const response = await axios.get(`${UrlServer}/product`);
      setProducts(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      notify("Erro ao buscar produtos!", "error");
    }
  };
  useEffect(() => {
    searchProducts();
  }, []);

  useEffect(() => {
    // Filtra os produtos com base no texto de pesquisa
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchText, products]);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  //Função de selecionar e colocar os produtos no carrinho
  const handleSelectProduct = (product) => {
    const existingProductIndex = selectedProducts.findIndex(
      (p) => p._id === product._id
    );

    if (existingProductIndex !== -1) {
      // O produto já está na lista, então atualizamos somente a quantidade
      const updatedSelectedProducts = selectedProducts.map((p, index) => {
        if (index === existingProductIndex) {
          p.quantity += 1;
          p.totalPrice = p.quantity * p.salePrice;
        }
        return p;
      });

      setSelectedProducts(updatedSelectedProducts);
    } else {
      // O produto não está na lista, então adicionamos
      setSelectedProducts([
        ...selectedProducts,
        { ...product, quantity: 1, totalPrice: product.salePrice },
      ]);
    }

    setSearchText("");
  };

  //Funções de venda

  const handleSellProducts = () => {
    if (selectedProducts.length === 0) {
      notify("Nenhum produto selecionado!", "error");
      return;
    } else {
      handleOpenModal();
    }
  };

  const handleConfirmSale = async () => {
    const updateRequests = [];

    // Itera sobre os produtos vendidos e inclui os detalhes
    const salesItems = selectedProducts.map((product) => ({
      name: product.name,
      quantity: product.quantity,
      price: product.salePrice, // Assuming product.salePrice is the correct field name for the product price
    }));

    const totalQuantity = selectedProducts.reduce(
      (total, item) => total + item.quantity,
      0
    );

    const totalSalePrice = calculateTotalPrice();

    const saleData = {
      items: salesItems,
      totalSalePrice,
      totalQuantity,
      date: new Date(),
    };
    console.log(saleData);
    try {
      // Salvar a venda
      const response = await axios.post(`${UrlServer}/sales-history`, saleData);
      console.log(response.data);
      // Atualizar a quantidade dos produtos vendidos
      for (const product of selectedProducts) {
        const updatedQuantity = product.quantity;
        const productId = product._id;

        const requestPromise = axios.patch(
          `${UrlServer}/product/${productId}/quantity`,
          {
            quantity: updatedQuantity,
          }
        );

        updateRequests.push(requestPromise);
      }

      await Promise.all(updateRequests);

      notify("Venda realizada com sucesso!", "success");
      // Limpa a lista de produtos selecionados após a venda
      setSelectedProducts([]);
      handleCloseModal();
    } catch (error) {
      console.error("Erro ao realizar a venda:", error);
      notify("Erro ao realizar a venda! Estoque insuficiente!", "error");
    }
  };

  // Calcula o preço total da venda somando o preço de todos os produtos selecionados
  const calculateTotalPrice = () => {
    return selectedProducts.reduce(
      (total, product) => total + product.totalPrice,
      0
    );
  };

  const handleQuantityChange = (product, newQuantity) => {
    if (newQuantity < 1) return; // Garante que a quantidade não seja negativa

    const updatedProducts = selectedProducts.map((p) => {
      if (p._id === product._id) {
        return {
          ...p,
          quantity: newQuantity,
          totalPrice: newQuantity * p.salePrice,
        };
      }
      return p;
    });

    setSelectedProducts(updatedProducts);
  };

  // Funções de abertura e fechamento do modal

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Função de deletar o produto
  const handleDeleteProduct = (product) => {
    setSelectedProducts(selectedProducts.filter((p) => p._id !== product._id));
  };

  // Renderização

  return (
    <div className="background ">
      <div className=" flex flex-col ml-3 mt-5">
        <div className="w-1/2">
          <h1 className="text-2xl font-medium mb-5 ">Selecione um produto</h1>
          <ProductSearch
            searchText={searchText}
            handleSearch={handleSearch}
            filteredProducts={filteredProducts}
            handleSelectProduct={handleSelectProduct}
          />

          <Notification />
        </div>

        <div className="text-left">
          <div className="z-10">
            <SelectedProductsList
              selectedProducts={selectedProducts}
              handleQuantityChange={handleQuantityChange}
              handleDeleteProduct={handleDeleteProduct}
              handleSellProducts={handleSellProducts}
              calculateTotalPrice={calculateTotalPrice} // Passando calculateTotalPrice como uma propriedade
            />
          </div>
        </div>

        <SaleConfirmationModal
          modalOpen={modalOpen} // Passar modalOpen como uma propriedade
          selectedProducts={selectedProducts}
          handleCloseModal={handleCloseModal}
          handleConfirmSale={handleConfirmSale}
          selectedOption={selectedOption}
          handleOptionSelect={handleOptionSelect}
          calculateTotalPrice={calculateTotalPrice}
        />
      </div>
    </div>
  );
};
export default Sale;
