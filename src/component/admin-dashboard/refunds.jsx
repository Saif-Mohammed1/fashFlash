"use client";
import { getStatusColor } from "../util/GeneralData";
import { toast } from "react-toastify";
import {
  DeleteEvent,
  handleUserClick,
  showDescription,
  updateStatusEvent,
} from "../util/sweatAlert/staticEvent";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const Refunds = ({ data = [], title = "" }) => {
  const [refundList, setRefundList] = useState(data || []);
  const [filteredList, setFilteredList] = useState([]);
  const router = useRouter();

  let debounceTimer;

  // //console.log("path window.location.pathname", path);

  const onChange = (e) => {
    clearTimeout(debounceTimer);

    const searchTerm = e.target.value.trim().toLowerCase();

    debounceTimer = setTimeout(() => {
      let queryString = new URLSearchParams(window.location.search);

      if (searchTerm) {
        // Set the search term in the URL
        queryString.set("name", searchTerm);
      } else {
        // Remove the name parameter from the URL when the search term is empty
        queryString.delete("name");
      }

      const path = `${window.location.pathname}?${queryString.toString()}`;
      // Use router.push to navigate to the new URL
      router.push(path);
    }, 800); // Adjust debounce time as needed
  };

  const editHandler = async (id) => {
    try {
      const { status } = await updateStatusEvent(
        "/dashboard/refunds/" + id,
        "Refund status has been updated"
      );
      if (status) {
        setRefundList((prevList) =>
          prevList.map((refund) =>
            refund._id === id ? { ...refund, status } : refund
          )
        );
      }
    } catch (error) {
      toast.error(
        error?.message ||
          error ||
          "an expected error happen please try again later"
      );
    }
  };
  const onDelete = async (id) => {
    try {
      await DeleteEvent(
        "/dashboard/refunds/" + id,
        "Order has been deleted successful"
      );
      setRefundList((prevList) =>
        prevList.filter((refund) => refund._id !== id)
      );
    } catch (error) {
      toast.error(
        error?.message ||
          error ||
          "an expected error happen please try again later"
      );
    }
  };
  const handleNameClick = (user) => {
    handleUserClick(user);
  };
  const issueHandler = (issue, reason) => {
    showDescription(issue, reason);
  };
  useEffect(() => {
    setRefundList(data);
  }, [data]);
  // return (
  //   <div className="+text-center bgSoft p-3 space-y-2 lg:mx-auto lg:max-w-[1200px] ">
  //     <div className="flex justify-between mb-2 ">
  //       <input
  //         type="search"
  //         name="search"
  //         className="rounded p-1 px-2 outline-none bg-gray-50/25 w-[60%]"
  //         onChange={onChange}
  //         placeholder="search by email"
  //       />
  //     </div>
  //     <div className="text-white +text-center h-[70vh] overflow-x-auto no-scrollbar ">
  //       <div
  //         className="flex font-medium justify-between  items-center
  //       gap-5 mb-5"
  //       >
  //         <span className={Style.refund}>User ID</span>
  //         <span className={Style.refund}>Invoice ID</span>
  //         <span className={Style.refund}>Issue </span>
  //         <span className={Style.refund}>Created At</span>
  //         <span className={Style.refund}>Status</span>
  //         <span className={Style.refund}>Action</span>
  //       </div>
  //       <div className="flex flex-col w-full gap-5   ">
  //         {refundList.map((refund, index) => (
  //           <div key={refund._id} className="flex flex-col gap-5 mb-5">
  //             <div className="flex justify-between items-center +text-center w-full gap-5">
  //               <span className={Style.refund}>{refund.user}</span>
  //               <span className={Style.refund}>{refund.invoiceId}</span>
  //               <span
  //                 className={`${Style.refund} overflow-x-auto no-scrollbar`}
  //               >
  //                 {refund.issue}
  //               </span>

  //               <span className={Style.refund}>
  //                 {refund.createdAt.split("T")[0]}
  //               </span>

  //               <span
  //                 className={`${Style.refund}  py-1 -my-1 ${getStatusColor(
  //                   refund.status
  //                 )}`}
  //               >
  //                 {refund.status}
  //               </span>
  //               <div className={`${Style.refund}  text-center space-x-2`}>
  //                 <button
  //                   onClick={() => editHandler(refund._id)}
  //                   className="p-1 px-2  bg-green-600 rounded hover:bg-green-700 "
  //                 >
  //                   Edit
  //                 </button>
  //                 <button
  //                   onClick={() => onDelete(refund._id)}
  //                   className="p-1 px-2   bg-red-700 rounded hover:bg-red-800"
  //                 >
  //                   Delete
  //                 </button>
  //               </div>
  //             </div>
  //             <div className="flex text-center">
  //               <span className={`${Style.refund} `}>
  //                 Reason For Refund is{" "}
  //               </span>
  //               <span>{refund.reason}</span>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <section className="bgSoft mx-auto p-2 ">
      <div className="flex justify-between mb-4 ">
        <input
          type="search"
          name="search"
          className="rounded p-1 px-2 outline-none bg-gray-50/25 w-[60%]"
          onChange={onChange}
          placeholder="Search by user name"
        />
      </div>
      <div className=" md:text-center">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 bg-gray-100/20 md:place-items-center text-white/70 p-1 rounded-t-lg">
          <span className="font-semibold md:col-span-1">User </span>
          <span className="font-semibold md:col-span-2">Invoice ID</span>
          <span className="font-semibold md:col-span-1">Issue </span>
          <span className="font-semibold md:col-span-1">Created At</span>

          <span className="font-semibold md:col-span-1">Status</span>
          <span className="font-semibold md:col-span-1 text-center">
            Action
          </span>
        </div>
        <div className="h-[60vh] overflow-x-auto no-scrollbar">
          {filteredList.length > 0
            ? filteredList.map((refund, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center border-b p-2"
                >
                  <span
                    className="md:col-span-1 truncate text-blue-500 cursor-pointer"
                    onClick={() => handleNameClick(refund.user)}
                  >
                    {refund.user.name.split(" ")[0]}
                  </span>
                  <span className="md:col-span-2">{refund.invoiceId}</span>
                  <span
                    className="md:col-span-1 text-blue-500 cursor-pointer"
                    onClick={() => issueHandler(refund.issue, refund.reason)}
                  >
                    View
                  </span>
                  <span className="md:col-span-1">
                    {new Date(refund.createdAt).toLocaleDateString()}
                  </span>

                  <span
                    className={`md:col-span-1   ${getStatusColor(
                      refund.status
                    )}`}
                  >
                    {refund.status}
                  </span>

                  <div className="col-span-1 text-center">
                    <button
                      onClick={() => editHandler(refund._id)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(refund._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            : refundList.map((refund, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center border-b p-2"
                >
                  <span
                    className="md:col-span-1 truncate text-blue-500 cursor-pointer"
                    onClick={() => handleNameClick(refund.user)}
                  >
                    {refund.user.name.split(" ")[0]}
                  </span>
                  <span className="md:col-span-2">{refund.invoiceId}</span>
                  <span
                    className="md:col-span-1 text-blue-500 cursor-pointer"
                    onClick={() => issueHandler(refund.issue, refund.reason)}
                  >
                    View
                  </span>
                  <span className="md:col-span-1">
                    {new Date(refund.createdAt).toLocaleDateString()}
                  </span>

                  <span
                    className={`md:col-span-1   ${getStatusColor(
                      refund.status
                    )}`}
                  >
                    {refund.status}
                  </span>

                  <div className="col-span-1 text-center">
                    <button
                      onClick={() => editHandler(refund._id)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(refund._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default Refunds;
