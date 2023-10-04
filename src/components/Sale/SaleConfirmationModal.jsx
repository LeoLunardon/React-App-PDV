import React from "react";

const SaleConfirmationModal = ({
  modalOpen, // Adicione modalOpen como uma propriedade
  selectedProducts,
  handleCloseModal,
  handleConfirmSale,
  selectedOption,
  calculateTotalPrice,
  handleOptionSelect,
}) => {
  const totalPrice = calculateTotalPrice();
  if (!modalOpen) {
    return null; // Não renderizar nada se o modal não estiver aberto
  }

  return (
    <div className="modal-overlay">
      <div className="modal relative">
        <div className="h-60 overflow-y-auto">
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

        <h2 className="text-xl text-center mt-2">
          Selecione o método de Pagamento
        </h2>
        <div className="justify-between text-md flex max-w-full h-18 px-6 p-3 mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <div>
            <label className="flex flex-col-reverse gap-1">
              
              <input
                type="radio"
                name="paymentOption"
                value="dinheiro"
                checked={selectedOption === "dinheiro"}
                onChange={() => handleOptionSelect("dinheiro")}
              />
              Dinheiro 
              
            </label>
          </div>
          <div>
            <label className="flex flex-col-reverse gap-1">
              <input
                type="radio"
                name="paymentOption"
                value="pix"
                checked={selectedOption === "pix"}
                onChange={() => handleOptionSelect("pix")}
              />
              PIX
            </label>
          </div>
          <div>
            <label className="flex flex-col-reverse gap-1">
              <input
                type="radio"
                name="paymentOption"
                value="cartao"
                checked={selectedOption === "cartao"}
                onChange={() => handleOptionSelect("cartao")}
              />
              Crédito/Débito
            </label>
          </div>
        </div>
        <div className="product-price font-bold text-xl flex justify-end mt-5 ">
          Total: R${totalPrice.toFixed(2)}
        </div>

        <div className="absolute bottom-0 flex ml-28 gap-5 w-full">
          <button
            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            onClick={handleConfirmSale}
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

export default SaleConfirmationModal;
