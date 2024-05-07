import { getStatusColor } from "@/component/util/GeneralData";
import Link from "next/link";
import EditNoteIcon from "@mui/icons-material/EditNote";

const Orders = ({ data = [], title = "Orders" }) => {
  // const data = [
  //   //     // Comment or uncomment items to test empty data
  //   { invoiceId: 8247, status: "completed" },
  //   { invoiceId: 58916, status: "processing" },
  //   { invoiceId: 45776, status: "failed" },
  //   { invoiceId: 9255, status: "processing" },
  //   { invoiceId: 5015, status: "pending" },
  //   { invoiceId: 49201, status: "failed" },
  //   { invoiceId: 39970, status: "failed" },
  //   { invoiceId: 40000, status: "pending" },
  //   { invoiceId: 69946, status: "completed" },
  //   { invoiceId: 21124, status: "processing" },
  // ];

  if (data.length === 0) {
    // If no data, display a message
    return (
      <div className="container mt-5 mx-auto">
        <h3 className="my-1 text-center text-gray-400 text-2xl font-bold">
          My {title}
        </h3>
        <div className="flex flex-col justify-center items-center h-[78vh]">
          <p className="text-lg text-gray-500">There are no {title} yet.</p>
          {title === "Refunds" && (
            <button className="p-3  my-2 bg-blue-500 hover:bg-blue-600 text-white  rounded">
              <Link href={"/account/my-refunds/" + 0}> Create New Refund</Link>
            </button>
          )}
        </div>
      </div>
    );
  }

  // Normal rendering when there are orders

  // Normal rendering when there are orders
  return (
    <>
      <h3 className="my-1 mt-5 text-center text-gray-400 text-2xl font-bold">
        My {title}
      </h3>
      <div className="container p-2 mx-auto">
        <div className="flex flex-col text-center">
          {title === "Refunds" && (
            <button className="p-3 my-2 bg-blue-500 hover:bg-blue-600 text-white  rounded">
              <Link href={"/account/my-refunds/" + 0}> Create New Refund</Link>
            </button>
          )}
          <div className="flex mb-2 bg-gray-100 -shadow-md rounded py-1">
            <span className="font-bold w-2/6">Num</span>
            <span className="font-bold w-3/6">
              {title === "Reports" ? "Product " : "Receipt "}ID
            </span>
            {title === "Orders" ? (
              <>
                <span className="font-bold w-1/6">Issue</span>
                <span className="font-bold w-1/6">Amount</span>
              </>
            ) : null}
            <span className="font-bold w-2/6">Status</span>
          </div>
          <div className="flex flex-col text-center  h-[60vh] overflow-y-auto">
            {data.map((item, index) => (
              <div key={index} className="my-2">
                <div className="flex py-1 bg-gray-100 mb-3 rounded">
                  <span className="w-2/6">{index + 1} #</span>
                  {title === "Orders" ? (
                    <Link
                      href={item.invoiceLink ? item.invoiceLink : "#"}
                      target="_blank"
                      className="w-3/6"
                    >
                      {item.invoiceId}
                    </Link>
                  ) : (
                    <span className="w-3/6">
                      {title === "Reports" ? item.product._id : item.invoiceId}
                    </span>
                  )}
                  {title === "Orders" ? (
                    <>
                      <span className={`w-1/6 py-1 -my-1 text-gray-500 `}>
                        <Link
                          href={"/account/my-refunds/" + item.invoiceId}
                          className="hover:text-gray-700 "
                        >
                          <EditNoteIcon />
                        </Link>
                      </span>
                      <span className="w-1/6">{item.amount}$</span>
                    </>
                  ) : null}
                  <span
                    className={`w-2/6 py-1 -my-1 ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </div>
                {title === "Refunds" ||
                  (title === "Reports" && (
                    <div className="flex py-2  bg-gray-50  text-center">
                      <p className="p-2 -my-2 mr-2 font-normal bg-gray-100   ">
                        The Reason
                      </p>
                      <p>{item?.reason ? item?.reason : item?.message}</p>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
  //   return (
  //     <div className="container">
  //       <h3 className="my-1 text-center text-gray-400 text-2xl font-bold">
  //         My {title}
  //       </h3>
  //       <div className="flex flex-col text-center p-2">
  //         <div className="flex mb-2 bg-gray-100 -shadow-md rounded py-1">
  //           <span className="font-bold w-2/6">Num</span>
  //           <span className="font-bold w-4/6">Receipt ID</span>
  //           <span className="font-bold w-2/6">Status</span>
  //         </div>
  //         {data.map((item, index) => (
  //           <div key={index} className="flex py-1 bg-gray-100 mb-3 rounded">
  //             <span className="w-2/6">{index + 1} #</span>
  //             <a href="#" className="w-4/6">
  //               {item.invoiceId}
  //             </a>
  //             <span className={`w-2/6 py-1 -my-1 ${getStatusColor(item.status)}`}>
  //               {item.status}
  //             </span>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   );
};

export default Orders;
