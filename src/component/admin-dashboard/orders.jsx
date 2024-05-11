"use client";
import Link from "next/link";
import { getStatusColor } from "../util/GeneralData";
import { toast } from "react-toastify";
import {
  DeleteEvent,
  handleUserClick,
  updateStatusEvent,
} from "../util/sweatAlert/staticEvent";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
const Orders = ({ data = [], title = "" }) => {
  const [orderList, setOrderList] = useState(data);
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
        "/dashboard/orders/" + id,
        "Order status has been updated"
      );
      if (status) {
        setOrderList((prevList) =>
          prevList.map((order) =>
            order._id === id ? { ...order, status } : order
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
      const { message } = await DeleteEvent(
        "/dashboard/orders/" + id,
        "Order has been deleted successful"
      );
      if (message) {
        setOrderList((prevList) =>
          prevList.filter((order) => order._id !== id)
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
  const showAddressInfo = (address) => {
    Swal.fire({
      title: "Address Information",
      html: `
        <p><strong>Street:</strong> ${address.street}</p>
        <p><strong>City:</strong> ${address.city}</p>
        <p><strong>State:</strong> ${address.state}</p>
        <p><strong>ZIP Code:</strong> ${address.zipCode}</p>
        <p><strong>Phone:</strong> ${address.phone}</p>
        <p><strong>Country:</strong> ${address.country}</p>
      `,
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText: "Close",
      confirmButtonAriaLabel: "Close this dialog",
    });
  };
  const handleNameClick = (user) => {
    handleUserClick(user);
  };
  useEffect(() => {
    setOrderList(data);
  }, [data]);
  //   return (
  //     <div className="+text-center bgSoft p-3 space-y-2 lg:mx-auto lg:max-w-[1200px] ">
  //       <div className="flex justify-between mb-4 ">
  //         <input
  //           type="search"
  //           name="search"
  //           className="rounded p-1 px-2 outline-none bg-gray-50/25 w-[60%]"
  //           onChange={onChange}
  //           placeholder="search by email"
  //         />
  //       </div>
  //       <div className="text-white +text-center h-[70vh] overflow-x-auto no-scrollbar ">
  //         <div
  //           className="flex font-medium justify-between  items-center
  //         gap-5 mb-5"
  //         >
  //           <span className={Style.order}>User ID</span>
  //           <span className={Style.order}>Invoice ID</span>
  //           <span className={Style.order}>Invoice Link</span>
  //           <span className={Style.order}>Created At</span>
  //           <span className={Style.order}>Amount</span>
  //           <span className={Style.order}>Status</span>
  //           <span className={Style.order}>Action</span>
  //         </div>
  //         <div className="flex flex-col w-full gap-5   ">
  //           {orderList.map((order, index) => (
  //             <div
  //               key={index}
  //               className="flex justify-between items-center +text-center w-full gap-5"
  //             >
  //               <span className={Style.order}>{order.user}</span>
  //               <span className={Style.order}>{order.invoiceId}</span>
  //               <Link
  //                 href={order.invoiceLink}
  //                 target="_blank"
  //                 className={`${Style.order} ${
  //                   order.invoiceLink ? "text-blue-500" : "text-red-500"
  //                 }
  // `}
  //               >
  //                 {order.invoiceLink ? "Link exist" : " does'nt exist"}
  //               </Link>
  //               <span className={Style.order}>
  //                 {order.createdAt.split("T")[0]}
  //               </span>
  //               <span className={Style.order}>{order.amount}$</span>

  //               <span
  //                 className={`${Style.order}  py-1 -my-1 ${getStatusColor(
  //                   order.status
  //                 )}`}
  //               >
  //                 {order.status}
  //               </span>
  //               <div className={`${Style.order}  text-center space-x-2`}>
  //                 <button
  //                   onClick={() => editHandler(order._id)}
  //                   className="p-1 px-2  bg-green-600 rounded hover:bg-green-700 "
  //                 >
  //                   Edit
  //                 </button>
  //                 <button
  //                   onClick={() => onDelete(order._id)}
  //                   className="p-1 px-2   bg-red-700 rounded hover:bg-red-800"
  //                 >
  //                   Delete
  //                 </button>
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  //   );
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
        <div className="grid grid-cols-1 md:grid-cols-8 gap-4 bg-gray-100/20 md:place-items-center text-white/70 p-1 rounded-t-lg">
          <span className="font-semibold md:col-span-1">User </span>
          <span className="font-semibold md:col-span-1">Invoice ID</span>
          <span className="font-semibold md:col-span-1">Invoice Link</span>
          <span className="font-semibold md:col-span-1">Created At</span>
          <span className="font-semibold md:col-span-1">Amount</span>
          <span className="font-semibold md:col-span-1">ShippingInfo</span>
          <span className="font-semibold md:col-span-1">Status</span>
          <span className="font-semibold md:col-span-1 text-center">
            Action
          </span>
        </div>
        <div className="h-[60vh] overflow-x-auto no-scrollbar">
          {filteredList.length > 0
            ? filteredList.map((order, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-8 gap-4 items-center border-b p-2"
                >
                  <span
                    className="md:col-span-1 truncate text-blue-500 cursor-pointer"
                    onClick={() => handleNameClick(order.user)}
                  >
                    {order.user.name.split(" ")[0]}
                  </span>
                  <span className="md:col-span-1">{order.invoiceId}</span>
                  <Link
                    href={order.invoiceLink}
                    target="_blank"
                    className={`md:col-span-1 ${
                      order.invoiceLink ? "text-blue-500" : "text-red-500"
                    }
  `}
                  >
                    {order.invoiceLink ? "Link exist" : " does'nt exist"}
                  </Link>
                  <span className="md:col-span-1">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                  <span className="md:col-span-1">${order.amount}</span>
                  <span
                    className="md:col-span-1 text-blue-500 cursor-pointer"
                    onClick={() => showAddressInfo(order.shippingInfo)}
                  >
                    View
                  </span>
                  <span
                    className={`md:col-span-1   ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>

                  <div className="col-span-1 text-center">
                    <button
                      onClick={() => editHandler(order._id)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(order._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            : orderList.map((order, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-8 gap-4 items-center border-b p-2"
                >
                  <span
                    className="md:col-span-1 truncate text-blue-500 cursor-pointer"
                    onClick={() => handleNameClick(order.user)}
                  >
                    {" "}
                    {order.user.name.split(" ")[0]}
                  </span>
                  <span className="md:col-span-1">{order.invoiceId}</span>
                  <Link
                    href={order.invoiceLink}
                    target="_blank"
                    className={`md:col-span-1 ${
                      order.invoiceLink ? "text-blue-500" : "text-red-500"
                    }
  `}
                  >
                    {order.invoiceLink ? "Link exist" : " does'nt exist"}
                  </Link>
                  <span className="md:col-span-1">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                  <span className="md:col-span-1">${order.amount}</span>
                  <span
                    className="md:col-span-1 text-blue-500 cursor-pointer"
                    onClick={() => showAddressInfo(order.shippingInfo)}
                  >
                    View
                  </span>{" "}
                  <span
                    className={`md:col-span-1   ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                  <div className="col-span-1 text-center">
                    <button
                      onClick={() => editHandler(order._id)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(order._id)}
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

export default Orders;
