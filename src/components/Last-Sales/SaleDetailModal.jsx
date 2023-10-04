import React from "react";
import "./Style.css";

const SaleDetailModal = ({ sale, handleCloseModal }) => {
  return (
    <div className="fixed inset-0 modal-overlay flex items-center justify-center z-50">
      <div className="modal-container bg-white w-1/3 mx-auto rounded-lg p-4 shadow-lg">
        <div className="mb-4 text-center">
          <h2 className="text-xl font-bold">
            Detalhes da Venda #{sale.saleId}
          </h2>
        </div>
        <div className="mb-4 overflow-y-auto h-72">
          <table className=" text-left text-sm min-w-full ">
            <thead>
              <tr className="border-b">
                <th className="py-2">Nome do Produto</th>
                <th className="py-2">Quantidade</th>
                <th className="py-2">Valor R$</th>
              </tr>
            </thead>
            <tbody>
              {sale.items.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 font-semibold">{item.name}</td>
                  <td className="py-2">{item.quantity}</td>
                  <td className="py-2">
                    R${(item.quantity * item.price).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mb-4">
          <p className="font-semibold">
            Total de Produtos: {sale.totalQuantity}
          </p>
          <p className="font-semibold">
            Total da Venda: R${sale.totalSalePrice.toFixed(2)}
          </p>
        </div>
        <div className="text-center">
          <button
            onClick={handleCloseModal}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaleDetailModal;
