"use client";

import { useState } from "react";
import { countries } from "countries-list";
import { toast } from "react-toastify";
import fetchApi from "../util/fetchApi";

const Addaddress = ({
  addresses,
  title = "add new address",
  button = "add",
}) => {
  const [street, setStreet] = useState(addresses?.street || "");
  const [city, setCity] = useState(addresses?.city || "");
  const [state, setState] = useState(addresses?.state || "");
  const [zipCode, setZipCode] = useState(addresses?.zipCode || 0);
  const [phone, setPhone] = useState(addresses?.phone || "");
  const [country, setCountry] = useState(addresses?.country || "Andorra");
  const countriesList = Object.values(countries);
  const [loading, setLoading] = useState(false);

  const buttonValue =
    button === "add" && loading
      ? "Adding..."
      : button !== "add" && loading
      ? "Updating..."
      : button === "add"
      ? "Add"
      : "Update";
  const onSubmit = async (e) => {
    e.preventDefault();
    //   const { street, price, category, description } =
    // const { street, city, state, zipCode, phone } = e.target.elements;

    setLoading(true);
    const addressData = {
      street,
      state,
      city,
      zipCode,
      phone,
      country,
    };
    try {
      const { data, error } =
        button !== "add"
          ? await fetchApi("/user/address/" + addresses._id, {
              method: "PATCH",
              body: JSON.stringify(addressData),
            })
          : await fetchApi("/user/address", {
              method: "POST",
              body: JSON.stringify(addressData),
            });
      if (error) throw error;
      // await toast.promise(data, {
      //   pending: "process is pending",
      //   success: "add new address success",
      // });
      if (button !== "add") {
        toast.success("Address has been updated successfully");
      } else {
        toast.success(" New address has been added successfully");
      }
    } catch (error) {
      toast.error(
        error?.message ||
          error ||
          "an expected error happen please try again later"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center h-screen items-center">
      <form
        onSubmit={onSubmit}
        className="flex flex-col justify-between w-[600px] gap-3 bg-white my-4 mx-auto p-4"
      >
        <h2 className="text-center text-gray-600 p-2 capitalize font-medium text-xl">
          {title}
        </h2>
        <label htmlFor="street">
          Street<span>*</span>
        </label>
        <input
          type="text"
          name="street"
          id="street"
          className="p-2 bg-gray-200 outline-none"
          value={street}
          required
          onChange={(e) => setStreet(e.target.value)}
        />
        <div className="flex flex-col md:flex-row justify-between items-center flex-wrap gap-3">
          <div className="w-full md:w-[47%]  flex flex-col">
            <label htmlFor="city">
              City<span>*</span>
            </label>
            <input
              type="text"
              name="city"
              id="city"
              className="p-2 bg-gray-200 outline-none"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="w-full md:w-[47%]  flex flex-col">
            <label htmlFor="state">
              State<span>*</span>
            </label>
            <input
              type="text"
              name="state"
              id="state"
              className="p-2 bg-gray-200 outline-none"
              value={state}
              required
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <div className="w-full md:w-[47%]  flex flex-col">
            <label htmlFor="zip">
              Zip code<span>*</span>
            </label>
            <input
              type="number"
              name="zipCode"
              id="zip"
              className="p-2 bg-gray-200 outline-none"
              value={zipCode}
              required
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>
          <div className="w-full md:w-[47%]  flex flex-col">
            <label htmlFor="phone">
              Phone.No<span>*</span>
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              className="p-2 bg-gray-200 outline-none"
              value={phone}
              required
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-4 ">
          <label className="block mb-1"> Country </label>
          <select
            className="appearance-none border border-gray-200 bg-gray-200 outline-none 
            rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none
             focus:border-gray-400 w-full"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          >
            {countriesList.map((country) => (
              <option key={country.name} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <input
          type="submit"
          value={buttonValue}
          disabled={loading ? true : false}
          className="p-3 w-full cursor-pointer bg-blue-400 hover:bg-blue-600 capitalize font-medium text-xl rounded text-white"
        />
      </form>
    </div>
  );
};

export default Addaddress;
