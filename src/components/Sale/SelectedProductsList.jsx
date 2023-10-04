import React from "react";
import "./Style.css";

const SelectedProductsList = ({
  selectedProducts,
  handleQuantityChange,
  handleDeleteProduct,
  calculateTotalPrice,
  handleSellProducts,
}) => {
  const totalPrice = calculateTotalPrice();
  const getRowColor = (index) => {
    return index % 2 === 0 ? "bg-gray-300" : "bg-gray-200";
  };

  const totalQuantity = selectedProducts.reduce(
    (quantity, product) => quantity + product.quantity,
    0
  );

  return (
    <div className="container-select-products  max-h-80 overflow-y-auto mt-10">
      {selectedProducts.length > 0 && (
        <table className="table-auto relative w-1/2 ">
          <thead className="sticky top-0 bg-white">
            <tr>
              <th className="px-4 py-2">Produto</th>
              <th className="px-4 py-2">Quantidade</th>
              <th className="px-4 py-2">Preço</th>
              <th className="px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {selectedProducts.map((product, index) => (
              <tr
                key={product._id}
                className={`text-left  ${getRowColor(index)} `}
              >
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() =>
                      handleQuantityChange(product, product.quantity - 1)
                    }
                    className="quantity-button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20 12H4"
                      />
                    </svg>
                  </button>
                  <span className="text-lg px-4">{product.quantity} </span>
                  <button
                    onClick={() =>
                      handleQuantityChange(product, product.quantity + 1)
                    }
                    className="quantity-button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </button>
                </td>
                <td className="px-4 py-2">R${product.totalPrice.toFixed(2)}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDeleteProduct(product, product._id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="font-medium mt-5 fixed text-xl bottom-0 flex  justify-between w-1/2">
        <span>Quantidade: {totalQuantity}</span>
        <span>
          Total: <span className="text-3xl">R${totalPrice.toFixed(2)}</span>
        </span>
        <button
          className="mt-2 bg-gradient-to-r from-green-400 text-white via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-2xl px-5 py-4 text-center mr-2 mb-2"
          onClick={handleSellProducts}
        >
          Vender Produtos
        </button>
      </div>
    </div>
  );
};

export default SelectedProductsList;
