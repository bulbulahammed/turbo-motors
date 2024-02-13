/* eslint-disable @typescript-eslint/no-unused-vars */
// SalesOverview.js
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGetSalesQuery } from "../redux/feature/sell/sellApi.slice";

const SalesOverview = () => {
  const { data } = useGetSalesQuery();

  if (!data) {
    return <div>Loading...</div>;
  }

  const salesData = data.data;
  console.log(salesData);

  interface ProcessedData {
    [key: string]: { date: string; totalPrice: number; salesQuantity: number };
  }

  interface Sale {
    salesDate: string;
    totalPrice: number;
    salesQuantity: number;
  }

  const processedData: ProcessedData = salesData.reduce(
    (acc: ProcessedData, sale: Sale) => {
      const date = sale.salesDate.slice(0, 10);
      if (!acc[date]) {
        acc[date] = { date, totalPrice: 0, salesQuantity: 0 };
      }
      acc[date].totalPrice += sale.totalPrice;
      acc[date].salesQuantity += sale.salesQuantity;
      return acc;
    },
    {}
  );

  const chartData = Object.values(processedData);

  return (
    <div className="p-20 mx-auto text-center">
      <LineChart width={900} height={500} data={chartData}>
        <XAxis dataKey="date" />
        <YAxis />
        <CartesianGrid stroke="#eee" />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="totalPrice"
          stroke="#8884d8"
          name="Total Price"
        />
        <Line
          type="monotone"
          dataKey="salesQuantity"
          stroke="#82ca9d"
          name="Sales Quantity"
        />
      </LineChart>
    </div>
  );
};

export default SalesOverview;
