"use client";
import { Box, Rating } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import "./home.css";
import ProductItem from "../product/product-Item/product-Item";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowBack, ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { CartContext } from "../context/cartContext";
import Paginate from "../Pagination/pagination";

const Home = ({ products, categories, pageCount }) => {
  const [productsList, setProductsList] = useState(products || []);
  const onDelete = (id) => {
    setProductsList((prevProduct) =>
      prevProduct.filter((item) => item._id !== id)
    );
  };

  const { favorite } = useContext(CartContext);
  useEffect(() => {
    setProductsList(products);
  }, [products]);
  return (
    <Box
      sx={{
        //display: { ms: "grid" },
        // bgcolor: "white",
        display: "flex",
        pt: "32px",
        px: "20px",
        minHeight: "90vh",
        position: "relative",
        // height: "100%",
      }}
    >
      {/* <CheckboxList /> */}
      {/* <Drawer>    position: inherit;
    left: 16px;
    /* left: -42vh;  */}
      <Lists categories={categories} className="" />
      {/* </Drawer> */}
      {/* <div className="flex flex-col flex-wrap mx-3 w-full justify-between "> */}
      <div className="flex flex-col mx-3 w-full ">
        {productsList && (
          <div className="grid col mx-auto mx-w-[1500px] justify-center ">
            {productsList?.map((product) => {
              favorite &&
                favorite.map((prod) => {
                  if ((prod?.product?._id || prod?.product) === product._id) {
                    return (product.favorites = true);
                  }
                  /* else {
                    ////console.log("else");
                    return (product.favorite = false);
                  } */
                });

              return (
                <ProductItem
                  product={product}
                  key={product._id}
                  Delete={() => onDelete(product._id)} // Wrap onDelete in an arrow function
                />
              );
            })}
          </div>
        )}
        <div className="/my-4 mt-auto ">
          {" "}
          <Paginate pageCount={pageCount} />
        </div>
      </div>
    </Box>
  );
};

export default Home;

export const Lists = ({ categories }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  let querySearch;
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [clicked, setClicked] = useState(true);
  const [openList, setOpenList] = useState(false);
  // if (typeof window !== "undefined") {
  //   querySearch = new URLSearchParams(window.location.search);
  // }
  const toggleClicked = () => {
    setClicked(!clicked);
  };

  const querySearchParams = (searchParams, key, value) => {
    const existKey = searchParams.has(key);
    if (existKey && value) {
      searchParams.set(key, value);
    } else if (value) {
      searchParams.append(key, value);
    } else if (existKey) {
      searchParams.delete(key);
    }
    return searchParams;
  };
  const submitMinmaxHandler = (e) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      querySearch = new URLSearchParams(window.location.search);
    }
    querySearch = querySearchParams(querySearch, "min", min);
    querySearch = querySearchParams(querySearch, "max", max);
    // ////console.log("querySearch", querySearch);
    const path = window.location.pathname + "?" + querySearch.toString();
    router.push(path);
  };
  // const handelCheckbox = (checkbox) => {
  //   // e.preventDefault();
  //   if (typeof window !== "undefined") {
  //     querySearch = new URLSearchParams(window.location.search);
  //   }

  //   const categoriesParams = searchParams.getAll(checkbox.name);
  //   if (checkbox.checked === false) {
  //     let updatedCategories = categoriesParams.filter(
  //       (value) => value !== checkbox.value
  //     );

  //     if (
  //       categoriesParams.includes("all") &&
  //       categoriesParams.length <= categories.length + 1
  //     ) {
  //       updatedCategories = categoriesParams.filter((value) => value !== "all");

  //       querySearch.delete(checkbox.name, "all");
  //     }
  //     if (updatedCategories.length > 0) {
  //       // Set the updated categories to the 'category' parameter
  //       if (updatedCategories.includes(checkbox.value))
  //         querySearch.delete(checkbox.name, checkbox.name);
  //     }
  //   } else {
  //     if (!categoriesParams.includes(checkbox.name)) {
  //       // querySearch.set(checkbox.name, checkbox.value);
  //       querySearch.append(checkbox.name, checkbox.value);
  //     }
  //   }
  //   const path = window.location.pathname + "?" + querySearch.toString();
  //   ////console.log("path changing", path);
  //   router.push(path);
  //   //   pathname: router.pathname,
  //   //   query: currentQueries,
  //   // });
  //   ////console.log("checkbox.checked", checkbox.checked);
  // };
  const handelCheckbox = (checkbox) => {
    querySearch = new URLSearchParams(window.location.search);

    const allQueries = searchParams.getAll(checkbox.name);

    if (!checkbox.checked) {
      querySearch.delete(checkbox.name, checkbox.value);
      if (allQueries.includes("all")) {
        querySearch.delete(checkbox.name, "all");
      }
    } else {
      if (!allQueries.includes(checkbox.value)) {
        querySearch.append(checkbox.name, checkbox.value);
      }

      // if (allQueries.length + 1 === categories.length) {
      //   querySearch.append(checkbox.name, "all");
      // }
    }
    // ////console.log(
    //   "allQueries.includes(checkbox.name",
    //   allQueries.includes(checkbox.name)
    // );
    // ////console.log("allQueries.includes(checkbox.name", checkbox.name);
    const path = window.location.pathname + "?" + querySearch.toString();

    router.push(path);
  };

  const defaultCheckHandler = (checkboxType, checkboxValue) => {
    // if (typeof window !== "undefined") {
    //   querySearch = new URLSearchParams(window.location.search);
    // }
    const values = searchParams?.getAll(checkboxType);
    if (values.length >= 1) {
      if (values.includes("all")) {
        return true;
      } else {
        if (!values.includes(checkboxValue)) return false;
        return true;
      }
    } else {
      return false;
    }
  };
  const allChecked = (checkbox) => {
    if (typeof window !== "undefined") {
      querySearch = new URLSearchParams(window.location.search);
    }
    const checkBoxes = document.getElementsByName(checkbox.name);
    checkBoxes.forEach((item) => {
      item.checked = clicked;
      if (item.checked) {
        querySearch.append(item.name, item.value);
      } else {
        querySearch.delete(item.name);
      }
    });
    /* checkBoxes.forEach((item) => {
      if (item.checked) {
       
        checkbox.checked = false;
        item.checked = false;

        querySearch.delete(item.name);
      } else {
        item.checked = true;
        checkbox.checked = true;
        querySearch.append(item.name, item.value);
      }
    });*/
    const path = window.location.pathname + "?" + querySearch.toString();
    ////console.log("path", path);
    router.push(path);
    toggleClicked();
  };
  return (
    <div
      className={`
       absolute z-30 ${
         openList ? "left-4" : "left-[-257px]"
       } transition-[left] h-fit duration-[2s] 
      bg-gray-200  md:static  md:bg-gray-200/70 
    flex  justify-center space-y-5 
     +bg-transparent flex-col /min-w-64 
     /border-[2px] /border-gray-400 
     min-w-fit md:h-full shadow-lg 
     rounded`}
    >
      <div // className="border-b-2 border-current"
        className="p-4"
      >
        <h3 className="font-bold text-xl my-1.5">Price</h3>
        <form className=" flex flex-row" onSubmit={submitMinmaxHandler}>
          <input
            type="number"
            placeholder="Min"
            min={0}
            className=" text-center outline-none rounded-sm bg-white/60  w-20 p-2"
            value={min}
            onChange={(e) => setMin(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max"
            min={0}
            className="mx-2  text-center outline-none rounded-sm bg-white/60 w-20 p-2"
            value={max}
            onChange={(e) => setMax(e.target.value)}
          />
          <input
            type="submit"
            value="Go"
            className=" p-3 bg-purple-600 cursor-pointer text-center"
          />
        </form>
      </div>
      <hr className="bg-gray-400 h-[2px]" />
      <div className="p-4 ">
        <h3 className="font-bold text-xl my-1.5">Filter by Price</h3>
        <ul>
          {/* <li>
            <input
              type="checkbox"
              name="category"
              className="scale-150 mr-3"
              value="all"
              defaultChecked={defaultCheckHandler("category", "all")}
              onClick={(e) => allChecked(e.target)}
            />
            <span>All</span>
          </li> */}
          {[
            { label: "Lowest price", data: "price" },
            { label: "Highest price", data: "-price" },
            // { label: "lowast reviews", data: "-ratingsAverage" },
            // { label: "hights reviews", data: "ratingsAverage" },
          ].map(({ label, data }) => (
            <li key={label}>
              <input
                type="checkbox"
                name="sort"
                className="scale-150 mr-3"
                value={data}
                defaultChecked={defaultCheckHandler("sort", data)}
                onClick={(e) => handelCheckbox(e.target)}
              />
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>
      <hr className="bg-gray-400 h-[2px]" />
      <div className="p-4 ">
        <h3 className="font-bold text-xl my-1.5">Categories</h3>
        <ul>
          {/* <li>
            <input
              type="checkbox"
              name="category"
              className="scale-150 mr-3"
              value="all"
              defaultChecked={defaultCheckHandler("category", "all")}
              onClick={(e) => allChecked(e.target)}
            />
            <span>All</span>
          </li> */}
          {categories &&
            categories.map((item) => (
              <li key={item}>
                <input
                  type="checkbox"
                  name="category"
                  className="scale-150 mr-3 capitalize"
                  value={item}
                  defaultChecked={defaultCheckHandler("category", item)}
                  onClick={(e) => handelCheckbox(e.target)}
                />
                <span>{item}</span>
              </li>
            ))}
        </ul>
      </div>
      <hr className="bg-gray-400 h-[2px]" />
      <div className="p-4 ">
        <h3 className="font-bold text-xl my-1.5">Rating</h3>
        <ul>
          {/* <li>
            <input
              type="checkbox"
              name="rating"
              className="scale-150 mr-3.5"
              value="all"
              defaultChecked={defaultCheckHandler("rating", "all")}
              onClick={(e) => allChecked(e.target)}
            />
            <span>All</span>
          </li> */}
          {[1, 2, 3, 4, 5].map((item) => (
            <li key={item} className="flex items-center">
              <input
                type="checkbox"
                name="rating"
                className="scale-150 mr-3"
                value={item}
                defaultChecked={defaultCheckHandler("rating", item.toString())}
                onClick={(e) => handelCheckbox(e.target)}
              />
              <Rating
                name="read-only"
                value={item}
                // precision={0.5}
                readOnly
                size="large"
              />
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={() => setOpenList(!openList)}
        className={`absolute /bg-white p-.5 text-gray-500 ${"left-[262px]"} md:hidden`}
      >
        {openList ? <ArrowBackIos /> : <ArrowForwardIos />}
      </button>
    </div>
  );
};
