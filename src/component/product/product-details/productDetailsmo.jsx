"use client";

import { CartContext } from "@/component/context/cartContext";
import { Rating } from "@mui/material";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import "./productDetails.css";
import { Favorite, Share } from "@mui/icons-material";
import RelatedProducts from "../relatedProduct/relatedProduct";
import fetchApi from "@/component/util/fetchApi";
import ReviewSection from "../Review/review";
import { userContext } from "@/component/context/userContext";
import { toast } from "react-toastify";

const ProductPrice = ({ originalPrice, discount }) => {
  // Calculate the discounted price
  // const discountedPrice = originalPrice - (originalPrice * discount) / 100;
  const discountedPrice = originalPrice - discount;

  // Calculate the percentage discount
  const percentageDiscount = (discount / originalPrice) * 100;

  return (
    <div className="font-bold">
      {discount > 0 ? (
        <div className="flex flex-col gap-2 +space-x-1.5">
          <p
            style={{ textDecoration: "line-through", marginTop: "-4px" }}
            className="text-sm font-medium text-gray-500"
          >
            ${originalPrice}
          </p>
          <div className="flex gap-2">
            <p className=" text-yellow-500/80">${discountedPrice}</p>
            <p className=" mt-2 tex-base font-medium text-green-400">
              {/* Save {discount}% with discount! */}
              Saved {percentageDiscount.toFixed(0)}%
              {
                //with discount!
              }
            </p>
          </div>
        </div>
      ) : (
        <p className="text-lg font-medium text-gray-500">${originalPrice}</p>
      )}
    </div>
  );
};

const ProductDetails = ({ product }) => {
  const {
    _id,
    name,
    price,
    discount,
    category,
    images,
    ratingsAverage,
    description,
    ratingsQuantity,
    stock,
    user,
    reviews,
  } = product;
  const [viewImage, setViewImage] = useState(
    images[0] || "/products/product.png"
  );
  const [favorites, setFavorites] = useState(false);
  const [products, setProducts] = useState([]);
  const isInStock = stock >= 1;
  const { addProductToCart, deleteToFav, addToFav, favorite } =
    useContext(CartContext);
  const currentUser = useContext(userContext);
  // let photo = [12, 3, 2];
  const addProductHandler = async () => {
    try {
      await addProductToCart(product);
      toast.success("Product has been added successfully");
    } catch (error) {
      toast.error(
        error?.message ||
          error ||
          "an expected error happen please try again later"
      );
    }
  };
  const toggleButton = async () => {
    try {
      // setFvSpinner(true);

      if (favorites) {
        await deleteToFav(product);
        setFavorites(!favorites);
      } else {
        await addToFav(product);
        setFavorites(!favorites);
      }
    } catch (error) {
      toast.error(
        error?.message ||
          error ||
          "an expected error happen please try again later"
      );
    } finally {
      //  setFvSpinner(false);
    }
  };
  const copyProductLink = async () => {
    // add this to clipbord
    const productLink = `${window.location.origin}/product/${_id}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(productLink);

      await toast.promise(navigator.clipboard.writeText(productLink), {
        pending: "Promise is pending",
        success: "Product link copied to clipboard👌",
        error: "Error copying product link to clipboard",
      });
      // .then(() => {
      //   //console.log("Product link copied to clipboard:", productLink);
      //   // Optionally, you can show a success message to the user
      // })
      // .catch((error) => {
      //   //console.error("Error copying product link to clipboard:", error);
      //   // Optionally, you can show an error message to the user
      // });
    } else {
      toast.warn("Clipboard API not supported in this browser.");
      // Optionally, provide a fallback or inform the user that clipboard copying is not supported
    }
  };

  useEffect(() => {
    const existingFav = favorite.find((fav) => fav._id === _id);

    if (existingFav) {
      setFavorites(true);
    }
  }, []);
  useEffect(() => {
    const getDate = async () => {
      try {
        const { data, error } = await fetchApi("/product?category=" + category);
        if (error) throw error;
        const filteredProduct = data.data.filter(
          (product) => product._id !== _id
        );
        setProducts(filteredProduct);
      } catch (error) {
        // toast.error("error from related " + error);
        setProducts([]);
      }
    };
    getDate();
  }, []);
  return (
    <section>
      {product ? (
        <div className="flex flex-col mx-auto p-4 md:p-8 lg:p-16 gap-6 md:gap-10 lg:gap-16 max-w-[1000px]">
          <div className="flex flex-col gap-3  md:flex-row  ">
            <div className=" flex-1 h-full +shadow-lg rounded +bg-gray-200/30">
              <div className="+img   h-full ">
                {" "}
                <Image
                  src={`${viewImage}`}
                  alt={name}
                  width={800}
                  height={800}
                  // layout="responsive"
                  // objectFit="cover"
                  style={{ minHeight: "420px" }}
                />
              </div>
              <div className="flex flex-row gap-3 my-2 flex-wrap">
                {images.length >= 1 &&
                  images.map((item, inx) => (
                    <Image
                      onClick={() => setViewImage(item)}
                      key={inx}
                      src={`${item}`}
                      alt={name}
                      width={80}
                      height={80}
                      className={`border-2 cursor-pointer hover:opacity-90  ${
                        viewImage === item
                          ? "border-4 border-blue-600"
                          : "border-gray-600"
                      }  `}
                    />
                  ))}
              </div>
            </div>
            <div className="details flex-1 flex flex-col font-bold gap-3 shadow-lg rounded bg-gray-200/70 p-3">
              <div>
                <p className="font-bold text-lg text-gray-700">{name}</p>
                <p className=" text-gray-400 text-lg font-normal capitalize">
                  {category}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="font-normal -ml-[6px] text-gray-600">
                  <Rating
                    name="read-only"
                    value={ratingsAverage}
                    precision={0.5}
                    readOnly
                    size="small"
                  />
                  ( {ratingsQuantity} reviews)
                </p>
                <div className="flex flex-col items-center text-center gap-2  sm:flex-row sm: space-x-3">
                  <span className=" text-base font-normal text-gray-800">
                    Availability
                  </span>{" "}
                  {isInStock ? (
                    <span className="bg-blue-500 rounded-full p-2 px-4 text-white text-sm">
                      In Stock
                    </span>
                  ) : (
                    <span className="bg-red-500 rounded-full p-2 px-4 text-white text-sm">
                      Out Of Stock
                    </span>
                  )}
                </div>
              </div>
              <ProductPrice originalPrice={price} discount={discount} />
              <p className="text-gray-700 text-base font-light text-center sm:text-start">
                {description}{" "}
              </p>
              <div className="flex justify-between items-center mt-auto">
                <button
                  disabled={!isInStock}
                  onClick={addProductHandler}
                  // color="primary" //{/* Assuming you want a primary color, adjust as needed */}
                  // sx={{
                  //   mt: "8px",
                  //   mb: "8px",
                  //   width: "fit-content",
                  //   color: "black",
                  //   fontWight: "bold",
                  //   fontStyle: "italic",
                  // }}
                  className={`font-medium p-2 px-4 -ml-1 bg-blue-600 rounded-full text-white w-fit cursor-pointer ${
                    isInStock
                      ? " hover:bg-blue-700  opacity-100"
                      : " opacity-60"
                  }`}
                >
                  Add Item To Cart
                </button>
                <div className="flex flex-col items-center gap-2 sm:flex-row space-x-3 text-lg font-normal text-gray-800">
                  <span>
                    {" "}
                    <Share
                      onClick={copyProductLink}
                      sx={{
                        cursor: "pointer",
                        marginRight: "6px",
                        color: "gray",
                      }}
                    />
                    share
                  </span>
                  <span>
                    {" "}
                    <Favorite
                      onClick={toggleButton}
                      sx={{
                        cursor: "pointer",
                        marginRight: "6px",
                        color: favorites ? "red" : "gray",
                      }}
                    />
                    wishlist
                  </span>
                </div>
              </div>
              <div>
                {/* <p variant="h" color="initial" className="flex items-center ">
                Seller :
                <p
                  variant="body1"
                  color="textSecondary"
                  className="mx-2 "
                  // component={Link}
                  // href={`/user/${user._id}`}
                >
                  {user?.name}
                </p>
              </p> */}
              </div>
            </div>
          </div>
          <div>
            <RelatedProducts relatedProducts={products} />
          </div>
          <div>
            <ReviewSection
              reviews={reviews}
              productId={_id}
              user={currentUser.user}
            />
          </div>
        </div>
      ) : (
        <div className="flex  justify-center item-center space-x-2 h-full">
          <p className="text-lg text-gray-800">There is no Product Found</p>
        </div>
      )}
    </section>
  );
};

export default ProductDetails;
