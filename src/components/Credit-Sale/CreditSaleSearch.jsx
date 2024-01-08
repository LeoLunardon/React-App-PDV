import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Style.css";
import Notification, { notify } from "../Notification/Notification";
import CreditConfirmationModal from "./CreditConfirmationModal";
import CustomersRegisterModal from "./CustomersRegisterModal";
import ProductSearch from "../Sale/ProdutoSearch";
import SelectedProductsList from "../Sale/SelectedProductsList";
import UrlServer from "../../Services/UrlServer";

const CreditSaleSearch = () => {
  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [customerModalOpen, setCustomerModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
    setCustomerModalOpen(false);
  };
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };
  const handleOpenCustomerModal = () => {
    setCustomerModalOpen(true);
  };
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
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchText, products]);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const handleSelectProduct = (product) => {
    const existingProductIndex = selectedProducts.findIndex(
      (p) => p._id === product._id
    );

    if (existingProductIndex !== -1) {
      const updatedSelectedProducts = selectedProducts.map((p, index) => {
        if (index === existingProductIndex) {
          p.quantity += 1;
          p.totalPrice = p.quantity * p.salePrice;
        }
        return p;
      });

      setSelectedProducts(updatedSelectedProducts);
    } else {
      setSelectedProducts([
        ...selectedProducts,
        { ...product, quantity: 1, totalPrice: product.salePrice },
      ]);
    }

    setSearchText("");
  };

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

    const salesItems = selectedProducts.map((product) => ({
      name: product.name,
      quantity: product.quantity,
      price: product.salePrice,
    }));

    const totalQuantity = selectedProducts.reduce(
      (total, item) => total + item.quantity,
      0
    );

    const totalSalePrice = calculateTotalPrice();
    const customerName = selectedCustomer?.name || "";
    const customerPhone = selectedCustomer?.phone || "";

    const saleData = {
      clientName: customerName,
      clientPhone: customerPhone,
      items: salesItems,
      totalSalePrice,
      totalQuantity,
      date: new Date(),
    };

    console.log(saleData);
    try {
      const response = await axios.post(`${UrlServer}/credit-sales`, saleData);
      console.log(response.data);

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
      setSelectedProducts([]);
      handleCloseModal();
    } catch (error) {
      console.error("Erro ao realizar a venda:", error);
      notify("Erro ao realizar a venda", "error");
    }
  };

  const calculateTotalPrice = () => {
    return selectedProducts.reduce(
      (total, product) => total + product.totalPrice,
      0
    );
  };

  const handleQuantityChange = (product, newQuantity) => {
    if (newQuantity < 1) return;

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

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleDeleteProduct = (product) => {
    setSelectedProducts(selectedProducts.filter((p) => p._id !== product._id));
  };

  return (
    <div className="background  ">
      <div className=" flex flex-col ml-3 mt-5">
        <div className="w-1/2">
          <h1 className="text-2xl font-medium mb-5 ">Venda de confiança</h1>
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
              calculateTotalPrice={calculateTotalPrice}
            />
          </div>
        </div>
        <CreditConfirmationModal
          modalOpen={modalOpen}
          selectedProducts={selectedProducts}
          handleCloseModal={handleCloseModal}
          handleConfirmSale={handleConfirmSale}
          selectedOption={selectedOption}
          handleOptionSelect={handleOptionSelect}
          calculateTotalPrice={calculateTotalPrice}
          handleOpenCustomerModal={handleOpenCustomerModal}
          selectedCustomer={selectedCustomer}
          setSelectedCustomer={setSelectedCustomer}
        />
      </div>
      <CustomersRegisterModal
        modalOpen={customerModalOpen}
        handleCloseModal={() => setCustomerModalOpen(false)}
      />
    </div>
  );
};

export default CreditSaleSearch;
