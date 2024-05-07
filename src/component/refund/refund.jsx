"use client";

import { useState } from "react";
import fetchApi from "../util/fetchApi";
import { toast } from "react-toastify";

const Refund = ({ id }) => {
  const [issue, setIssue] = useState("");
  const [invoiceId, setInvoiceId] = useState(id);
  const [message, setMessage] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await fetchApi("/refund", {
        method: "POST",
        body: JSON.stringify({
          issue,
          invoiceId,
          message,
        }),
      });

      if (error) throw error;
      toast.success("success");
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
        What's Your Note?
      </h1>
      <h3 className="font-medium text-xl text-gray-500  ">What's Your Issue</h3>
      <input
        type="text"
        className="p-3 bg-gray-200 rounded outline-none"
        name="Issue"
        required
        value={issue}
        onChange={(e) => setIssue(e.target.value)}
        placeholder="What's Your Issue"
      />
      <h3 className="font-medium text-xl text-gray-500  ">Your Invoice Id</h3>
      <input
        type="text"
        className="p-3 bg-gray-200 rounded outline-none"
        name="invoiceId"
        required
        // readOnly
        value={invoiceId}
        onChange={(e) => setInvoiceId(e.target.value)}
        defaultValue={invoiceId}
        placeholder="Your Invoice Id"
      />
      <h3 className="font-medium text-xl text-gray-500 ">
        Please Describe Your Issue
      </h3>
      <textarea
        type="text"
        name="message"
        className="resize-none h-[40vh] p-3 bg-gray-200 rounded outline-none"
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="What's Your Message"
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

export default Refund;
