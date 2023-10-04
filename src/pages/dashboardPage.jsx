import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import SideBar from "../components/SideBar/SideBar";
import BoxItems from "../components/Dashboard/BoxItems";
import UrlServer from "../Services/UrlServer";
import getToken from "../Services/tokenService";
import axios from "axios";


const DashboardPage = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const token = getToken();
        
        const response = await axios.get(`${UrlServer}/sales-history`);
        const data = await response.json();

        const productSales = {};

        data.forEach((sale) => {
          sale.items.forEach((item) => {
            const productName = item.name;
            const quantity = item.quantity;

            if (!productSales[productName]) {
              productSales[productName] = {
                quantity: 0,
              };
            }

            productSales[productName].quantity += quantity;
          });
        });

        // Ordenar os produtos por quantidade vendida (do mais vendido para o menos vendido)
        const sortedProductSales = Object.entries(productSales)
          .sort(([, a], [, b]) => b.quantity - a.quantity)
          .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
          }, {});

        const chartData = {
          series: Object.values(sortedProductSales).map(
            (item) => item.quantity
          ),
          options: {
            xaxis: {
              categories: Object.keys(sortedProductSales),
            },
          },
        };

        setSalesData(chartData);
      } catch (error) {
        console.error("Erro ao buscar os dados de vendas:", error);
      }
    };

    fetchSalesData();
  }, []);

  return (
    <div>
      <div>
        <SideBar />
      </div>
      <div className="ml-80 font-medium text-3xl mt-10">
        <h1>Dashboard de vendas</h1>
      </div>
      <div className="mt-10 w-full">
        <BoxItems />
      </div>
      <div className="flex ml-80">
        {salesData && salesData.options && salesData.series ? (
          <div
            className="max-w-96 overflow-x-auto mt-10"
          >
            <Chart
              options={salesData.options}
              series={[{ data: salesData.series }]}
              type="bar"
              width={500}
              height={400}
            />
          </div>
        ) : (
          <p>Carregando dados...</p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
