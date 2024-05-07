"use client";

import fetchApi from "@/component/util/fetchApi";
import { useState } from "react";
import { toast } from "react-toastify";

const AddOrders = () => {
  const [email, setEmail] = useState("");
  const [invoiceId, setInvoiceId] = useState("");
  const [invoiceLink, setInvoiceLink] = useState("");
  const onSubmit = async (e) => {
    //console.log("add");

    e.preventDefault();
    try {
      const { data, error } = await fetchApi("/orders", {
        method: "POST",
        body: JSON.stringify({
          email,
          invoiceId,
          invoiceLink,
        }),
      });

      if (error) throw error;
      toast.success("order has been created");
    } catch (error) {
      toast.error(
        error?.message ||
          error ||
          "an expected error happen please try again later"
      );
    }
  };
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-2 w-full sm:w-[500px] my-8 p-2 sm:mx-auto"
    >
      <h1 className="font-bold text-2xl text-gray-300 text-center mb-6">
        Create New Orders
      </h1>
      <h3 className="font-medium text-xl text-gray-500  ">
        Enter the user email
      </h3>
      <input
        type="text"
        className="p-3 bg-gray-200 rounded outline-none"
        name="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter the user email"
      />
      <h3 className="font-medium text-xl text-gray-500  ">
        What's User Invoice Id
      </h3>
      <input
        type="text"
        className="p-3 bg-gray-200 rounded outline-none"
        name="invoiceId"
        required
        value={invoiceId}
        onChange={(e) => setInvoiceId(e.target.value)}
        placeholder="What's Your Invoice Id"
      />
      <h3 className="font-medium text-xl text-gray-500 ">
        Please provide Invoice Link for that user
      </h3>
      <input
        type="text"
        className="p-3 bg-gray-200 rounded outline-none"
        name="invoiceLink"
        required
        value={invoiceLink}
        onChange={(e) => setInvoiceLink(e.target.value)}
        placeholder="Please provide Invoice Link for that user
"
      />
      <button
        type="submit"
        className="outline-none p-4 rounded bg-blue-500 hover:bg-blue-600 text-white font-medium"
      >
        Send
      </button>
    </form>
  );
};

export default AddOrders;
