"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import fetchApi from "../util/fetchApi";
import Link from "next/link";

const Address = ({ address }) => {
  const [addressList, setAddressList] = useState(address);

  const handleDelete = async (id) => {
    // Handle delete functionality
    try {
      const { data, error } = await fetchApi("/user/address/" + id, {
        method: "DELETE",
      });

      if (error) throw error;
      setAddressList((previous) =>
        previous.filter((address) => address._id !== id)
      );
      toast.success("Address has been deleted");
    } catch (error) {
      toast.error(
        error?.message ||
          error ||
          "an expected error happen please try again later"
      );
    }
  };
  return (
    <section>
      {addressList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {addressList.map((address) => (
            <div
              key={address._id.toString()}
              className="bg-white shadow-lg rounded-lg p-6"
            >
              <h3 className="text-lg font-semibold mb-2">{address.street}</h3>
              <p className="text-gray-600 mb-2">{`${address.city}, ${address.state}, ${address.country}`}</p>
              <p className="text-gray-600 mb-2">{`ZIP Code: ${address.zipCode}`}</p>
              <p className="text-gray-600 mb-2">{`Phone: ${address.phone}`}</p>
              <div className="flex justify-end mt-4">
                <Link
                  href={"/account/my-address/" + address._id}
                  //   onClick={() => handleEdit(address._id)}
                  className="mr-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(address._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-[78vh]">
          <p className="text-lg text-gray-500">There are no addresses yet.</p>
        </div>
      )}
    </section>
  );
};

export default Address;
