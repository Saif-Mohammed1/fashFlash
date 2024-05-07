"use client";

import { CartContext } from "@/component/context/cartContext";
import { Box, Button, Rating, Typography } from "@mui/material";
import Image from "next/image";
import { useContext, useState } from "react";
import "./productDetails.css";
import Link from "next/link";
import { toast } from "react-toastify";
/* 
  category: {
    type: String,
    required: [true, "category must be required"],
  },
  discount: {
    type: Number,
    // required: [true, "discount must be required"],
    default: 0,
    validate: {
      validator: function (discount) {
        return discount < this.price;
      },
      message: "Discount must be less than price",
    },
  },
  photo: {
    type: [String],
    // required: [true, "photo must be required"],
  },
  user: {
    type: Schema.ObjectId,
    ref: "User",
    required: [true, "Product must belong to a user."],
  },

  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, "Rating must be above or equal 1.0"],
    max: [5, "Rating must be below or equal 5.0"],
    set: (val) => Math.round(val * 10) / 10, // 4.666666, 46.6666, 47, 4.7
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  createdAt: { type: Date, default: Date.now },
});*/

const ProductPrice = ({ originalPrice, discount }) => {
  // Calculate the discounted price
  // const discountedPrice = originalPrice - (originalPrice * discount) / 100;
  const discountedPrice = originalPrice - discount;

  // Calculate the percentage discount
  const percentageDiscount = (discount / originalPrice) * 100;

  return (
    <div className="font-bold">
      {discount > 0 ? (
        <div className="flex space-x-1.5">
          <Typography
            variant="h6"
            color="error"
            style={{ textDecoration: "line-through", marginTop: "-4px" }}
          >
            {originalPrice}$
          </Typography>
          <Typography variant="h4" color="initial">
            {discountedPrice}$
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            className="self-end"
          >
            {/* Save {discount}% with discount! */}
            Saved {percentageDiscount.toFixed(0)}%
            {
              //with discount!
            }
          </Typography>
        </div>
      ) : (
        <Typography variant="h4" color="initial">
          {originalPrice}$
        </Typography>
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
  } = product;
  const [viewImage, setViewImage] = useState(
    images[0] || "/products/product.png"
  );
  const { addProductToCart } = useContext(CartContext);
  // let photo = [12, 3, 2];
  const addProductHandler = async () => {
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
  return (
    <Box height={"90vh"}>
      {product ? (
        <Box className="flex flex-col gap-3 p-2 md:flex-row md:p-4 space-x-2 h-full max-w-[1000px] mx-auto">
          <Box className="flex-1 ">
            <Image
              src={`${viewImage}`}
              alt={name}
              width={800}
              height={800}
              // style={{ minWidth: "420px" }}
              className="img"
            />
            <Box className="flex flex-row space-x-2 my-2">
              {images.length >= 1 &&
                images.map((item, inx) => (
                  <Image
                    onClick={() => setViewImage(item)}
                    key={inx}
                    src={`${item}`}
                    alt={name}
                    width={80}
                    height={80}
                    className={`border-2 cursor-pointer hover:opacity-90 ${
                      viewImage === item
                        ? "border-4 border-blue-600"
                        : "border-gray-600"
                    }  `}
                  />
                ))}
            </Box>
          </Box>
          <Box className="details flex-1 flex flex-col font-bold gap-1">
            <Typography variant="h4" color="initial" className="font-bold ">
              {name}
            </Typography>
            <Typography className="font-medium">
              <Rating
                name="read-only"
                value={ratingsAverage}
                precision={0.5}
                readOnly
                size="large"
              />
              ( {ratingsQuantity} reviews)
            </Typography>
            <ProductPrice originalPrice={price} discount={discount} />
            <Typography variant="h6" color="initial">
              Description : {description}
            </Typography>
            <button
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
              className="font-medium bg-blue-600 p-2 rounded text-white w-fit hover:bg-blue-700"
            >
              Add Item To Cart
            </button>
            <Box>
              <Typography
                variant="h"
                color="initial"
                className="flex items-center "
              >
                Stock :
                <Typography
                  variant="body1"
                  color="textSecondary"
                  className="mx-2 "
                >
                  {stock}
                </Typography>
              </Typography>
              <Typography
                variant="h"
                color="initial"
                className="flex items-center "
              >
                Category :
                <Typography
                  variant="body1"
                  color="textSecondary"
                  className="mx-2 "
                >
                  {category}
                </Typography>
              </Typography>
              <Typography
                variant="h"
                color="initial"
                className="flex items-center "
              >
                Seller :
                <Typography
                  variant="body1"
                  color="textSecondary"
                  className="mx-2 "
                  // component={Link}
                  // href={`/user/${user._id}`}
                >
                  {user?.name}
                </Typography>
              </Typography>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box className="flex item-center space-x-2 h-full">
          <Typography variant="h1" color="initial">
            There is no Product Found
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ProductDetails;
