"use client";

import React, { useEffect, useState } from "react";
import Message from "../message/message";
import GrowthAnalysis from "../util/growthAnalysis";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import fetchApi from "../util/fetchApi";

const Header = () => {
  // State to hold the order data
  const [orderData, setOrderData] = useState([]);

  // Fetch data for orders growth analysis
  useEffect(() => {
    const fetchOrderData = async () => {
      const orderResponse = await fetchApi("/dashboard/orders", "createdAt");
      if (orderResponse.error) {
        // Show error message if fetching data fails
        return <Message data={orderResponse} />;
      }
      //console.log("data", orderResponse);
      setOrderData(orderResponse.data);
    };
    fetchOrderData();
  }, []);
  // Process data to separate this week's and last week's amounts
  const thisWeekData = [];
  const lastWeekData = [];
  orderData.forEach((item) => {
    const date = new Date(item.createdAt);
    const weekNumber = getWeekNumber(date);
    const currentDate = new Date();
    const currentWeekNumber = getWeekNumber(currentDate);

    if (weekNumber === currentWeekNumber) {
      thisWeekData.push({ date: date.toDateString(), amount: item.amount });
    } else if (weekNumber === currentWeekNumber - 1) {
      lastWeekData.push({ date: date.toDateString(), amount: item.amount });
    }
  });

  // Function to get the week number
  const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  return (
    <div className="flex justify-between gap-3">
      <div className="txt">
        <p>Total Orders</p>
        <p>{orderData.length}</p>
        {/* Recharts line chart */}
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={thisWeekData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#8884d8"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Header;

/*
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const Cher = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#8884d8"
          strokeDasharray="5 5"
        />
        <Line
          type="monotone"
          dataKey="uv"
          stroke="#82ca9d"
          strokeDasharray="3 4 5 2"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
export default Cher;
*/
