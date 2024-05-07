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
const ContactUs = ({ data = [] }) => {
  const [contactList, setContactList] = useState(data || []);
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
        "/dashboard/contact-us/" + id,
        "Contact status has been updated"
      );
      if (status) {
        setContactList((prevList) =>
          prevList.map((contact) =>
            contact._id === id ? { ...contact, status } : contact
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
        "/dashboard/contact-us/" + id,
        "contact has been deleted successful"
      );
      setContactList((prevList) =>
        prevList.filter((contact) => contact._id !== id)
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
    setContactList(data);
  }, [data]);

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
          <span className="font-semibold md:col-span-2">Subject </span>
          <span className="font-semibold md:col-span-1">Message </span>
          <span className="font-semibold md:col-span-1">Created At</span>

          <span className="font-semibold md:col-span-1">Status</span>
          <span className="font-semibold md:col-span-1 text-center">
            Action
          </span>
        </div>
        <div className="h-[60vh] overflow-x-auto no-scrollbar">
          {filteredList.length > 0
            ? filteredList.map((contact, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center border-b p-2"
                >
                  <span
                    className="md:col-span-1 truncate text-blue-500 cursor-pointer"
                    onClick={() => handleNameClick(contact.user)}
                  >
                    {contact.user.name.split(" ")[0]}
                  </span>
                  <span className="md:col-span-2 truncate ">
                    {contact.subject}
                  </span>
                  <span
                    className="md:col-span-1 text-blue-500 cursor-pointer"
                    onClick={() =>
                      issueHandler(contact.subject, contact.message)
                    }
                  >
                    View
                  </span>
                  <span className="md:col-span-1">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </span>

                  <span
                    className={`md:col-span-1   ${getStatusColor(
                      contact.status
                    )}`}
                  >
                    {contact.status}
                  </span>

                  <div className="col-span-1 text-center">
                    <button
                      onClick={() => editHandler(contact._id)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(contact._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            : contactList.map((contact, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center border-b p-2"
                >
                  <span
                    className="md:col-span-1 truncate text-blue-500 cursor-pointer"
                    onClick={() => handleNameClick(contact.user)}
                  >
                    {contact.user.name.split(" ")[0]}
                  </span>
                  <span className="md:col-span-2 truncate ">
                    {contact.subject}
                  </span>
                  <span
                    className="md:col-span-1 text-blue-500 cursor-pointer"
                    onClick={() =>
                      issueHandler(contact.subject, contact.message)
                    }
                  >
                    View
                  </span>
                  <span className="md:col-span-1">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </span>

                  <span
                    className={`md:col-span-1   ${getStatusColor(
                      contact.status
                    )}`}
                  >
                    {contact.status}
                  </span>

                  <div className="col-span-1 text-center">
                    <button
                      onClick={() => editHandler(contact._id)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(contact._id)}
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

export default ContactUs;
