/* import Message from "../message/message";
 import GrowthAnalysis from "../util/growthAnalysis";

 const Header = async () => {
  // Fetch data for each category
  const userResponse = await GrowthAnalysis("/dashboard/users", "createdAt");
  const productResponse = await GrowthAnalysis(
    "/dashboard/products",
    "createdAt"
  );
  const orderResponse = await GrowthAnalysis("/dashboard/orders", "createdAt");
  const refundResponse = await GrowthAnalysis(
    "/dashboard/refunds",
    "createdAt"
  );
  const reportResponse = await GrowthAnalysis(
    "/dashboard/reports",
    "createdAt"
  );

  // Check for errors in any of the responses and return specific error message
  if (userResponse.error) {
    return <Message data={userResponse.error} />;
  }
  if (productResponse.error) {
    return <Message data={productResponse.error} />;
  }
  if (orderResponse.error) {
    return <Message data={orderResponse.error} />;
  }
  if (refundResponse.error) {
    return <Message data={refundResponse.error} />;
  }
  if (reportResponse.error) {
    return <Message data={reportResponse.error} />;
  }

  // Render the component with fetched data if no errors
  return (
    <div className="flex justify-between gap-3 overflow-auto no-scrollbar">
      <div className="txt">
        <p>Total Users</p>
        <p>{userResponse.data}</p>
        <p className="text-[13px]">
          <span className="text-green-500">{userResponse.stats.growth}%</span>{" "}
          more than last week
        </p>
      </div>
      <div className="txt">
        <p>Total Products</p>
        <p>{productResponse.data}</p>
        <p className="text-[13px]">
          <span className="text-green-500">
            {productResponse.stats.growth}%
          </span>{" "}
          more than last week
        </p>
      </div>
      <div className="txt">
        <p>Total Orders</p>
        <p>{orderResponse.data}</p>
        <p className="text-[13px]">
          <span className="text-green-500">{orderResponse.stats.growth}%</span>{" "}
          more than last week
        </p>
      </div>
      <div className="txt">
        <p>Total Refunds</p>
        <p>{refundResponse.data}</p>
        <p className="text-[13px]">
          <span className="text-green-500">{refundResponse.stats.growth}%</span>{" "}
          more than last week
        </p>
      </div>
      <div className="txt">
        <p>Total Reports</p>
        <p>{reportResponse.data}</p>
        <p className="text-[13px]">
          <span className="text-green-500">{reportResponse.stats.growth}%</span>{" "}
          more than last week
        </p>
      </div>
    </div>
  );
 };

 export default Header;
*/

import React from "react";
import Message from "../message/message";
import GrowthAnalysis from "../util/growthAnalysis";

const fetchData = async (endpoint, label) => {
  const response = await GrowthAnalysis(endpoint, "createdAt");
  return {
    data: response.data,
    growth: response.stats.growth,
    error: response.error,
    label: label, // Include label in the response object
  };
};

const renderData = (label, data, growth) => (
  <div className="txt max-w-[200px]">
    <p>Total {label}</p>
    <p>{data}</p>
    <p className="text-[13px]">
      <span className="text-green-500">{growth}%</span> more than last week
    </p>
  </div>
);

const Header = async () => {
  try {
    const dataPromises = [
      fetchData("/dashboard/users", "Users"),
      fetchData("/dashboard/products", "Products"),
      fetchData("/dashboard/orders", "Orders"),
      fetchData("/dashboard/refunds", "Refunds"),
      fetchData("/dashboard/reports", "Reports"),
    ];

    const responses = await Promise.all(dataPromises);

    // Check for errors in any of the responses and return specific error message
    const errorResponse = responses.find((response) => response.error);
    if (errorResponse) {
      return <Message data={errorResponse.error} />;
    }

    return (
      <div className="flex justify-between gap-3 overflow-x-auto no-scrollbar mb-2">
        {responses.map((response, index) => (
          <React.Fragment key={index}>
            {renderData(response.label, response.data, response.growth)}
          </React.Fragment>
        ))}
      </div>
    );
  } catch (error) {
    throw error;
  }
};

export default Header;
