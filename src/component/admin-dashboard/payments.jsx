import { headers } from "next/headers";
import Message from "../message/message";
import fetchApi from "../util/fetchApi";
import { getStatusColor } from "../util/GeneralData";

const Payments = async () => {
  const { data, error } = await fetchApi("/dashboard/orders", {
    headers: headers(),
  });

  if (error) {
    return <Message error={error} />;
  }
  // Get today's date and the date one week ago
  const today = new Date();
  const lastWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 7
  );

  // Filter data to get only the transactions from the last week
  const weeklyPayments = data?.data.filter((item) => {
    const transactionDate = new Date(item.createdAt);
    return transactionDate >= lastWeek;
  });
  return (
    <div className="txt hover:cursor-default text-white  py-4 text-center">
      <h2 className="text-xl  md:text-2xl font-semibold mb-4">
        Weekly Transactions
      </h2>
      <div className="flex mb-2 gap-1 rounded py-1">
        <span className="font-bold w-2/6">User ID</span>

        <span className="font-bold w-1/6">Status</span>
        <span className="font-bold w-2/6">Date</span>
        <span className="font-bold w-1/6">Amount</span>
      </div>
      <div className="flex  flex-col text-center  h-[50vh] overflow-y-auto no-scrollbar">
        {weeklyPayments.map((item, index) => (
          <div key={index} className="my-2">
            <div className="flex py-1 gap-1 mb-3 rounded">
              <span className="w-2/6 overflow-x-auto no-scrollbar ">
                {item.user._id}{" "}
              </span>

              <span className={`w-1/6 ml-2 ${getStatusColor(item.status)}`}>
                {item.status}
              </span>

              <span className="w-2/6">
                {new Date(item.createdAt).toLocaleDateString()}

                {/* {item.createdAt.split("T")[0]} */}
              </span>
              <span className="w-1/6">${item.amount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payments;
