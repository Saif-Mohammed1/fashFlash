"use client";
import { useContext } from "react";
import { CartContext } from "@/component/context/cartContext";
import ProductItem from "../product/product-Item/product-Item";
import Link from "next/link";
const FavoriteCart = () => {
  const { favorite } = useContext(CartContext);
  // Check if data exists and has length
  if (favorite && favorite.length > 0) {
    return (
      <div className="grid col p-5 m-5">
        {favorite.map((item) => {
          // Assuming each item in data has a 'product' object
          const product = item.product || item;
          product.favorites = true; // Safely set favorite property
          product._id = product._id.toString();

          return <ProductItem product={product} key={product._id} />;
        })}
      </div>
    );
  } else {
    // If there are no favorites, show a message and link to shop
    return (
      <div className="flex text-center min-h-[90vh] flex-col justify-center p-4">
        <p className="text-gray-600 font-bold">
          Your Favorite item is empty. if you are not login you could lose your
          data anytime please login to access your data anytime
        </p>
        <Link href="/" className=" font-bold">
          Back To Shop
        </Link>
      </div>
    );
  }
};

export default FavoriteCart;
