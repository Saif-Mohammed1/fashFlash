"use client";
import { toast } from "react-toastify";
import fetchApi from "../util/fetchApi";

const Report = ({ id }) => {
  const submitForm = async (e) => {
    e.preventDefault();
    const { issue, message } = e.target;

    toast.loading("Waiting...");

    try {
      const Form = {
        issue: issue.value,
        message: message.value,
      };
      const { data, error } = await fetchApi("/report/" + id, {
        // credentials: "same-origin",
        method: "POST",
        body: JSON.stringify(Form), // Use JSON.stringify(formObject) or formData
      });
      toast.dismiss(); // Hide loading indicator regardless of success or failure

      if (error) {
        throw error;
      }
      toast.success("Report has been sent 👌");
    } catch (error) {
      issue.value = "";
      message.value = "";
      toast.error(error || "Report has been failed please try again later ");
    }
  };

  return (
    <form
      className="flex flex-col gap-5 p-3 m-2 w-[500px] mx-auto"
      onSubmit={submitForm}
    >
      <input
        type="text"
        name="issue"
        placeholder="Please enter your issue"
        className="p-2 font-medium bg-gray-300 text-gray-50 outline-none rounded "
        required
      />

      <textarea
        type="text"
        required
        name="message"
        placeholder="Please enter your message"
        className="p-2 font-medium bg-gray-300 text-gray-50 outline-none rounded resize-none h-[30vh]"
      />
      <div className="flex justify-between">
        <input
          type="submit"
          className="p-2 bg-gray-400 text-white outline-none rounded w-fit cursor-pointer hover:bg-gray-600 font-bold"
        />
        <input
          type="reset"
          className="p-2 bg-gray-400 text-white outline-none rounded w-fit cursor-pointer hover:bg-gray-600 font-bold"
        />
      </div>
    </form>
  );
};

export default Report;
