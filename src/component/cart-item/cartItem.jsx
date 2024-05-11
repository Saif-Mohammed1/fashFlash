"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../context/cartContext";
import { toast } from "react-toastify";
import fetchApi from "../util/fetchApi";

const CartItem = () =>
  //{ cartItems }
  {
    const {
      cartItems,
      addProductToCart,
      clearProductFromCart,
      removeProductFromCart,
    } = useContext(CartContext);
    // here u need to get item.product or {product} cause u are comparing diff data
    const addProductHandler = async (product) => {
      try {
        await addProductToCart(product);
      } catch (error) {
        toast.error(
          error?.message ||
            error ||
            "an expected error happen please try again later"
        );
      }
    };

    const removeProductHandler = async (product) => {
      try {
        await removeProductFromCart(product);
      } catch (error) {
        toast.error(
          error?.message ||
            error ||
            "an expected error happen please try again later"
        );
      }
    };

    const clearProductHandler = async (product) => {
      try {
        await clearProductFromCart(product);
      } catch (error) {
        toast.error(
          error?.message ||
            error ||
            "an expected error happen please try again later"
        );
      }
    };
    const calculateTotalPrice = () => {
      return cartItems.reduce((total, item) => {
        // const data = item?.product || item;
        // const quantity = item?.product?.quantity || item?.quantity;

        return (
          total +
          ((item?.discount ? item?.price - item?.discount : item?.price) *
            item?.quantity || 0)
        ); // Add the price of each item to the total
      }, 0);
    };

    const TAX = () => {
      const TaxRate = 0.1;
      return calculateTotalPrice() * TaxRate; //.toFixed(2);
    };
    // //console.log("TAX", typeof TAX());

    const finalPrice = () => {
      return calculateTotalPrice() + TAX(); //.toFixed(2);
    };

    return cartItems.length > 0 ? (
      <div className="flex gap-1 lg:gap-4 flex-col h-[90vh] md:px-4 md:py-2 lg:flex-row bg-white lg:justify-center ">
        <div className="flex  flex-col flex-1 overflow-y-auto h-[calc(100vh-60px)] sm:h-[calc(100vh-63px)] max-w-[1500px]">
          {cartItems.map((item) => {
            // const data = item?.product || item;
            // const user = item?.product?.user?._id
            //   ? item?.product?.user
            //   : item?.user?._id
            //   ? item?.user
            //   : "unknown";
            // const quantity = item?.product?.quantity || item?.quantity;

            return (
              <div
                key={item?._id.toString()}
                className="flex gap-1 sm:gap-0 space-y-2 sm:space-y-0  flex-col sm:flex-row items-center justify-between border-b py-2 md:space-x-2 mt-1 "
              >
                <div
                  className="flex flex-col sm:flex-row items-center //mx-4 
           w-full sm:w-1/3"
                >
                  <div
                    className=" flex justify-center mr-1.5 md:mr-3
              "
                  >
                    <Image
                      src={`${
                        item?.images.length > 0
                          ? item.images[0]
                          : "/products/product.png"
                      }`}
                      width={50}
                      height={50}
                      alt={item?.name}
                    />
                  </div>
                  <div className="text-center w-fit/">
                    <p>{item?.name?.substring(0, 60)}</p>
                    <span className="text-gray-300">
                      seller : {item?.user?.name?.split(" ")[0]}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center w-full sm:w-1/3">
                  <div className="flex items-center mx-4  bg-gray-400 p-2">
                    <button
                      className="font-bold text-gray-600 text-xl"
                      onClick={() => removeProductHandler(item)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      readOnly
                      className="p-1 w-16 text-black font-bold text-center bg-gray-400 outline-none"
                    />
                    <button
                      className={`font-bold text-gray-600 text-xl ${
                        item?.quantity === item?.stock ? "opacity-30" : ""
                      }`}
                      onClick={() => addProductHandler(item)}
                      disabled={item?.quantity === item?.stock}
                    >
                      +
                    </button>
                  </div>
                  <div className="text-center w-fit/ sm:ml-10 sm:-mr-10">
                    <p className="font-bold ">
                      $
                      {item?.quantity *
                        (item?.discount
                          ? item?.price - item?.discount
                          : item?.price)}
                    </p>
                    <span className="text-gray-300 relative">
                      <span
                        className={`text-gray-300 
                         line-through text-xs ${
                           item?.discount
                             ? "absolute -top-2  -left-9 "
                             : "hidden"
                         }`}
                      >
                        ${item?.price}
                      </span>
                      $
                      {item?.discount
                        ? item?.price - item?.discount
                        : item?.price}
                      / per item
                    </span>
                  </div>
                </div>
                <div className="  w-fit/  ">
                  <button
                    className="cursor-pointer text-red-500 border  p-1 mx-2"
                    onClick={() => clearProductHandler(item)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex p-4 flex-col min-w-[235px]  h-fit border">
          <div>
            <p className="flex justify-between text-gray-300">
              Total Price :<span>${calculateTotalPrice().toFixed(2)}</span>
            </p>
            <p className="flex justify-between text-gray-300">
              Total Units :
              <span className="text-green-500">
                {cartItems.length > 1
                  ? cartItems.length + " Units"
                  : cartItems.length + " Unit"}
              </span>
            </p>
            <p className="flex justify-between border-b text-gray-300">
              Tax :<span>${TAX().toFixed(2)}</span>
            </p>
            <p className="flex justify-between  font-bold mt-2">
              Final Price :<span>${finalPrice().toFixed(2)}</span>
            </p>
          </div>
          <Link
            href={"/shipping"}
            className="bg-green-500 text-white px-4 py-2 my-4 rounded"
          >
            Continue
          </Link>
          <Link
            href="/"
            className="border px-4 py-2 rounded text-green-500"
            // onClick={handleCheckout}
          >
            Back To Shop
          </Link>
        </div>
      </div>
    ) : (
      <div className="flex text-center min-h-[90vh] flex-col justify-center">
        <p className="text-gray-600 font-bold">
          Your Cart item is empty. if you are not login you could lose your data
          anytime please login to access your data anytime
        </p>
        <Link
          href="/"
          className=" font-bold"
          // className="border px-4 py-2 rounded text-green-500"
          // onClick={handleCheckout}
        >
          Back To Shop
        </Link>
      </div>
    );
    // </div>
  };

export default CartItem;
