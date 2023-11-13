import React, { useState, useEffect } from "react";
import axios from "axios";
import UrlServer from "../../Services/UrlServer";
import SaleDetailModal from "./SaleDetailModal";
import * as XLSX from "xlsx";
import { format } from "date-fns";

const SaleTable = () => {
  const [originalSales, setOriginalSales] = useState([]);
  const [sales, setSales] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [searchDate, setSearchDate] = useState("");

  const formatDataForExcel = (data) => {
    const formattedData = data.map((sale) => ({
      "ID da Venda": sale.saleId,
      "Valor Total (R$)": sale.totalSalePrice,
      "Quantidade de Itens": sale.totalQuantity,
      Data: format(new Date(sale.date), "dd/MM/yyyy HH:mm"),
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData, {
      header: [
        "ID da Venda",
        "Valor Total (R$)",
        "Quantidade de Itens",
        "Data",
      ],
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Vendas");

    const excelBlob = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    return new Blob([excelBlob], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
  };

  const handleOpenModal = (sale) => {
    setSelectedSale(sale);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedSale(null);
    setModalOpen(false);
  };

  const handleFilter = () => {
    const formattedSearchDate = new Date(searchDate)
      .toISOString()
      .split("T")[0];

    const filteredSales = originalSales.filter((sale) => {
      const formattedSaleDate = new Date(sale.date).toISOString().split("T")[0];
      return formattedSaleDate === formattedSearchDate;
    });

    setSales(filteredSales);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${UrlServer}/sales-history`);
        const salesData = response.data;
        setOriginalSales(salesData);
        setSales(salesData);
      } catch (error) {
        console.error("Erro ao buscar vendas:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="flex items-center">
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          className="border p-2 mr-2"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleFilter}
        >
          Buscar por Data
        </button>
        <a
          href={URL.createObjectURL(formatDataForExcel(sales))}
          download={`sales_${new Date().toLocaleDateString()}.xlsx`}
          className="bg-green-500 mx-2 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Download Tabela
        </a>
      </div>
      <div className="mt-5 max-h-96 overflow-y-auto">
        <table className="min-w-full">
          <thead className="sticky top-0 bg-white">
            <tr className="text-left">
              <th>ID da Venda</th>
              <th>Valor Total</th>
              <th>Quantidade de Itens</th>
              <th>Data</th>
              <th>Detalhes</th>
            </tr>
          </thead>
          <tbody>
            {sales
              .slice()
              .reverse()
              .map((sale, index) => (
                <tr
                  key={sale._id}
                  className={`text-left  font-semibold ${
                    index % 2 === 0 ? "bg-gray-300" : "bg-gray-100"
                  }`}
                >
                  <td className="p-2">#{sale.saleId}</td>
                  <td className="p-2">R${sale.totalSalePrice}</td>
                  <td className="p-2">{sale.totalQuantity}</td>
                  <td className="p-2">
                    {new Date(sale.date).toLocaleDateString()}
                  </td>
                  <td className="p-2">
                    <button
                      className="text-red-700"
                      onClick={() => handleOpenModal(sale)}
                    >
                      Visualizar
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {modalOpen && selectedSale && (
        <SaleDetailModal
          handleCloseModal={handleCloseModal}
          sale={selectedSale}
        />
      )}
    </div>
  );
};

export default SaleTable;
