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
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
const Reports = ({ data = [], title = "" }) => {
  const [reportList, setReportList] = useState(data || []);
  const [filteredList, setFilteredList] = useState([]);
  const router = useRouter();

  let debounceTimer;
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
        "/dashboard/reports/" + id,
        "Order status has been updated"
      );
      if (status) {
        setReportList((prevList) =>
          prevList.map((report) =>
            report._id === id ? { ...report, status } : report
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
        "/dashboard/reports/" + id,
        "Report has been deleted successful"
      );
      setReportList((prevList) =>
        prevList.filter((report) => report._id !== id)
      );
    } catch (error) {
      toast.error(
        error?.message ||
          error ||
          "an expected error happen please try again later"
      );
    }
    /* const users = await fetchApi("/dashboard/users/" + id, {
      method: "DELETE",
    });
    if (users.error) {
      return <Message data={users} />;
    }
    await getUsers();
    toast.success("user has been deleted successful");*/
  };
  const handleNameClick = (user) => {
    handleUserClick(user);
  };
  const issueHandler = (issue, reason) => {
    showDescription(issue, reason);
  };

  const handleClick = (product) => {
    Swal.fire({
      title: "Product Details",
      html: `
      <div>
        <p><strong>ID:</strong> ${product._id}</p>
        <p><strong>Name:</strong> ${product.name}</p>
        <p><strong>Category:</strong> ${product.category}</p>
        <p><strong>Price:</strong> ${product.price}</p>
        <p><strong>Discount:</strong> ${product.discount}</p>
        <p><strong>Description:</strong> ${product.description}</p>
        <p><strong>Stock:</strong> ${product.stock}</p>
        <p><strong>Discount Expire:</strong> ${product.discountExpire}</p>
        <p><strong>Created At:</strong> ${product.createdAt}</p>
      </div>
    `,
      confirmButtonText: "Close",
    });
  };
  useEffect(() => {
    setReportList(data);
  }, [data]);
  // return (
  //   <div className="+text-center bgSoft p-3 space-y-2 lg:mx-auto lg:max-w-[1200px] ">
  //     <div className="flex justify-between mb-4 ">
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
  //         <span className={Style.report}>User ID</span>
  //         <span className={Style.report}>Product ID</span>
  //         <span className={Style.report}>Issue </span>
  //         <span className={Style.report}>Created At</span>
  //         <span className={Style.report}>Status</span>
  //         <span className={Style.report}>Action</span>
  //       </div>
  //       <div className="flex flex-col w-full gap-5   ">
  //         {reportList.map((report, index) => (
  //           <div key={report._id} className="flex flex-col gap-5 mb-5">
  //             <div className="flex justify-between items-center +text-center w-full gap-5">
  //               <span className={Style.report}>{report.user}</span>
  //               <span className={Style.report}>{report.product}</span>
  //               <textarea
  //                 className={`${Style.report} overflow-auto no-scrollbar bg-gray-50/50 resize outline-none`}
  //                 value={report.issue}
  //               />

  //               {/* <span className={`${Style.report} overflow-auto no-scrollbar`}>
  //                 {report.issue}
  //               </span> */}

  //               <span className={Style.report}>
  //                 {report.createdAt.split("T")[0]}
  //               </span>

  //               <span
  //                 className={`${Style.report}  py-1 -my-1 ${getStatusColor(
  //                   report.status
  //                 )}`}
  //               >
  //                 {report.status}
  //               </span>
  //               <div className={`${Style.report}  text-center space-x-2`}>
  //                 <button
  //                   onClick={() => editHandler(report._id)}
  //                   className="p-1 px-2  bg-green-600 rounded hover:bg-green-700 "
  //                 >
  //                   Edit
  //                 </button>
  //                 <button
  //                   onClick={() => onDelete(report._id)}
  //                   className="p-1 px-2   bg-red-700 rounded hover:bg-red-800"
  //                 >
  //                   Delete
  //                 </button>
  //               </div>
  //             </div>
  //             <div className="flex text-center">
  //               <span className={`${Style.report} `}>
  //                 The Issue message is{" "}
  //               </span>
  //               <span>{report.message}</span>
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
          <span className="font-semibold md:col-span-2">Product </span>
          <span className="font-semibold md:col-span-1">Issue </span>
          <span className="font-semibold md:col-span-1">Created At</span>

          <span className="font-semibold md:col-span-1">Status</span>
          <span className="font-semibold md:col-span-1 text-center">
            Action
          </span>
        </div>
        <div className="h-[60vh] overflow-x-auto no-scrollbar">
          {filteredList.length > 0
            ? filteredList.map((report, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center border-b p-2"
                >
                  <span
                    className="md:col-span-1 truncate text-blue-500 cursor-pointer"
                    onClick={() => handleNameClick(report.user)}
                  >
                    {report.name.split(" ")[0]}
                  </span>
                  <span
                    className="md:col-span-2 truncate text-blue-500 cursor-pointer"
                    onClick={() => handleClick(report.product)}
                  >
                    {report.product.name.split(" ")[0]}
                  </span>
                  <span
                    className="md:col-span-1 text-blue-500 cursor-pointer"
                    onClick={() => issueHandler(report.issue, report.message)}
                  >
                    View
                  </span>
                  <span className="md:col-span-1">
                    {new Date(report.createdAt).toLocaleDateString()}
                  </span>

                  <span
                    className={`md:col-span-1   ${getStatusColor(
                      report.status
                    )}`}
                  >
                    {report.status}
                  </span>

                  <div className="col-span-1 text-center">
                    <button
                      onClick={() => editHandler(report._id)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(report._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            : reportList.map((report, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center border-b p-2"
                >
                  <span
                    className="md:col-span-1 truncate text-blue-500 cursor-pointer"
                    onClick={() => handleNameClick(report.user)}
                  >
                    {report.name.split(" ")[0]}
                  </span>
                  <span
                    className="md:col-span-2 truncate text-blue-500 cursor-pointer"
                    onClick={() => handleClick(report.product)}
                  >
                    {report.product.name.split(" ")[0]}
                  </span>
                  <span
                    className="md:col-span-1 text-blue-500 cursor-pointer"
                    onClick={() => issueHandler(report.issue, report.message)}
                  >
                    View
                  </span>
                  <span className="md:col-span-1">
                    {new Date(report.createdAt).toLocaleDateString()}
                  </span>

                  <span
                    className={`md:col-span-1   ${getStatusColor(
                      report.status
                    )}`}
                  >
                    {report.status}
                  </span>

                  <div className="col-span-1 text-center">
                    <button
                      onClick={() => editHandler(report._id)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(report._id)}
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

export default Reports;
