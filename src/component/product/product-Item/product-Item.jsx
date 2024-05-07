"use client";

import {
  Box,
  Rating,
  Tooltip,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import styled from "styled-components";
import { red } from "@mui/material/colors";
import { Favorite, Share, MoreVert, AddCircle } from "@mui/icons-material";
import { useState, useContext, useEffect } from "react";
import { CartContext } from "@/component/context/cartContext";
import Image from "next/image";
import { toast } from "react-toastify";
import Link from "next/link";
import {
  DeleteEvent,
  updateProduct,
} from "@/component/util/sweatAlert/staticEvent";
import { useRouter } from "next/navigation";
import { userContext } from "@/component/context/userContext";

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  /* height: 100%; */
  overflow: hidden;
  span {
    position: absolute;
    /* top: -40px;
    left: 20px;
    height: 144px; */
    top: 9px;
    left: -36px;
    height: 30px;
    width: 133px;
    transform: rotate(-35deg);

    /* transform: rotate(45deg); */
    padding: 3px;
    background-color: #8b0000;
    color: #fff;
    text-align: center;
    line-height: 20px;
    box-shadow: -5px 5px 10px rgba(0, 0, 0, 0.5);
  }
`;

const ProductPrice = ({ originalPrice, discount }) => {
  // Calculate the discounted price
  // const discountedPrice = originalPrice - (originalPrice * discount) / 100;
  const discountedPrice = originalPrice - discount;

  // Calculate the percentage discount
  const percentageDiscount = (discount / originalPrice) * 100;

  return (
    <div>
      {discount > 0 ? (
        <div className="flex space-x-1.5">
          <Typography
            variant="h7"
            color="error"
            style={{ textDecoration: "line-through" }}
          >
            {originalPrice}$
          </Typography>
          <Typography variant="h5" color="initial">
            {discountedPrice}$
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
export default function ProductItem({ product, Delete }) {
  const session = useContext(userContext);
  const {
    _id,
    name,
    price,
    discount,
    images,
    ratingsAverage,
    description,
    ratingsQuantity,
    createdAt,
    favorites,
    user,
  } = product;

  const [anchorEl, setAnchorEl] = useState(null);
  const [favorite, setFavorite] = useState(favorites || false);
  const [spinner, setSpinner] = useState(false);
  const [fvSpinner, setFvSpinner] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (favorites) {
      setFavorite(favorites);
    } else {
      setFavorite(false);
    }
  }, [favorites]);
  const { addProductToCart, addToFav, deleteToFav } = useContext(CartContext);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const percentageDiscount = discount > 0 && (discount / price) * 100;

  const toggleButton = async () => {
    try {
      setFvSpinner(true);

      if (favorite) {
        await deleteToFav(product);
        setFavorite(!favorite);
      } else {
        await addToFav(product);
        setFavorite(!favorite);
      }
    } catch (error) {
      toast.error(
        error?.message ||
          error ||
          "an expected error happen please try again later"
      );
    } finally {
      setFvSpinner(false);
    }
  };

  const addProductHandler = async () => {
    try {
      setSpinner(true);

      await addProductToCart(product);
      toast.success("add product success");
    } catch (error) {
      toast.error(
        error?.message ||
          error ||
          "an expected error happen please try again later"
      );
    } finally {
      setSpinner(false);
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
      //console.warn("Clipboard API not supported in this browser.");
      // Optionally, provide a fallback or inform the user that clipboard copying is not supported
    }
  };
  const onDelete = async (id) => {
    try {
      const path =
        session?.user?.role === "admin"
          ? "/dashboard/products/" + id
          : "/product/" + id;

      await DeleteEvent(path, "product has been deleted successful");
      // setProductList((prevList) =>
      //   prevList.filter((product) => product._id !== id)
      // );
      Delete(id);
    } catch (error) {
      toast.error(
        error?.message ||
          error ||
          "an expected error happen please try again later"
      );
    }
  };
  const updateProductHandler = async (product) => {
    try {
      await updateProduct(product);
      router.refresh();
    } catch (error) {
      toast.error(
        error?.message ||
          error ||
          "an expected error happen please try again later"
      );
    }
  };
  return (
    <Card
      sx={{
        width: "100%",
      }}
      className="p-2 flex flex-col bg-gray-200/70 shadow-lg"
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {name.substring(0, 1)}
          </Avatar>
        }
        action={
          <>
            <IconButton
              aria-label="settings"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleClick}
              color="inherit"
            >
              <MoreVert />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Link href={`/report/${_id}`}>Report</Link>
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                hidden={
                  user &&
                  (user?._id === session?.user?._id ||
                    session?.user?.role === "admin")
                    ? false
                    : true
                }
              >
                <button onClick={() => onDelete(_id)}>Delete</button>
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                hidden={
                  user &&
                  (user?._id === session?.user?._id ||
                    session?.user?.role === "admin")
                    ? false
                    : true
                }
              >
                <button onClick={() => updateProductHandler(product)}>
                  Update
                </button>
              </MenuItem>
              {/* Add more MenuItems here as needed */}
            </Menu>
          </>
        }
        title={<Link href={`/product/${_id}`}>{name.substring(0, 70)}</Link>}
        // subheader={createdAt.substring(0, 10)}
        subheader={
          <div className="flex items-center space-x-2">
            <Rating
              name="read-only"
              value={ratingsAverage}
              precision={0.5}
              readOnly
              size="small"
            />
            <span> {ratingsAverage}</span>
          </div>
        }
      />
      <ImageContainer className=" flex-1">
        <Image
          src={`${images.length > 0 ? images[0] : "/products/product.png"}`}
          // src="/products/product.png"
          alt={name}
          // loading="lazy"
          quality={80}
          width={800}
          height={800}
          priority
          objectFit="cover"
          style={{ minHeight: "200px" }}
        />
        {discount > 0 && <span>{percentageDiscount.toFixed(0)}%</span>}
      </ImageContainer>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description.substring(0, 100)}
        </Typography>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Box>
          <IconButton aria-label="add to favorites" onClick={toggleButton}>
            {fvSpinner ? (
              <svg
                aria-hidden="true"
                className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            ) : (
              <Favorite sx={{ color: favorite ? "red" : "inherit" }} />
            )}{" "}
          </IconButton>
          <IconButton aria-label="share" onClick={copyProductLink}>
            <Share />
            {/* <ContentPaste /> */}
          </IconButton>
          <Tooltip title="Add to cart">
            <IconButton aria-label="add to cart" onClick={addProductHandler}>
              {spinner ? (
                <svg
                  aria-hidden="true"
                  className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              ) : (
                <AddCircle />
              )}
            </IconButton>
          </Tooltip>
        </Box>
        <ProductPrice originalPrice={price} discount={discount} />
      </CardActions>
    </Card>
  );
}
