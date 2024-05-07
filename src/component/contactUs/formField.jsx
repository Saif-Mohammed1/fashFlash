"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import fetchApi from "../util/fetchApi";

const FormField = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await fetchApi("/contact-us", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      if (error) throw error;
      // Reset form fields after submission
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      toast.success("Message sent successfully 👌");
    } catch (error) {
      toast.error(
        error?.message ||
          error ||
          "An unexpected error occurred. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg mb-4">
          We'd love to hear from you! Whether you have questions about our
          services, want to collaborate on a project, or just want to say hello,
          feel free to reach out to us using the contact information below.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-lg font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-md px-3 py-2 w-full outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-md px-3 py-2 w-full outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="subject" className="block text-lg font-medium mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-md px-3 py-2 w-full outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-lg font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="border border-gray-300 rounded-md px-3 py-2 w-full outline-none"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            {loading ? "Submitting" : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export default FormField;
