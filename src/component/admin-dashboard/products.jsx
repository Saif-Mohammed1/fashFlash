"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import {
  DeleteEvent,
  handleUserClick,
  showDescription,
  updateProduct,
} from "../util/sweatAlert/staticEvent";
import { useRouter } from "next/navigation";

// const Products = ({ products }) => {
//   const [productList, setProductList] = useState(products);

//   const onChange = (e) => {
//     //console.log("e", e);
//   };
//   const onDelete = async (id) => {
//     try {
//       await DeleteEvent(
//         "/dashboard/products/" + id,
//         "product has been deleted successful"
//       );
//       setProductList((prevList) =>
//         prevList.filter((product) => product._id !== id)
//       );
//     } catch (error) {
//       toast.error(
//         error?.message ||
//           error ||
//           "an expected error happen please try again later"
//       );
//     }
//   };
//   useEffect(() => {
//     setProductList(products);
//   }, [products]);
//   return (
//     <>
//       {/* <Paginate pageCount={pageCount} /> */}
//       <div className="+text-center bgSoft p-3 space-y-2 lg:mx-auto /lg:max-w-[1200px] ">
//         <div className="flex justify-between mb-4 ">
//           <input
//             type="search"
//             name="search"
//             className="rounded p-1 px-2 outline-none bg-gray-50/25 "
//             onChange={onChange}
//             placeholder="search by Name"
//           />{" "}
//           <Link
//             href="/dashboard/products/add-products"
//             target="_blank"
//             //    onClick={createproductHandler}
//             className="p-2 mx-2 bg-blue-500 rounded hover:bg-blue-600 text-white"
//           >
//             Create New Product
//           </Link>
//         </div>
//         <div className="text-white text-center h-[70vh] overflow-x-auto no-scrollbar ">
//           <div
//             className="flex font-medium /justify-between  items-center
//         gap-5 mb-5"
//           >
//             <span className={Style.product}>Name</span>
//             <span className={`${Style.product} `}>Category</span>
//             <span className={Style.product}>Price And Discount</span>
//             <span className={Style.product}>User</span>
//             <span className={Style.product}>Created At</span>
//             <span className={`${Style.product}  text-center`}>Actions</span>
//             {/* <span className={`${Style.product}  text-center`}>Description</span> */}
//           </div>
//           <div className="flex flex-col w-full gap-5   ">
//             {productList.map((product, index) => (
//               <div key={index} className="flex flex-col mb-5">
//                 <div className="flex justify-between items-center +text-center w-full gap-5">
//                   <span className={Style.product}>{product.name}</span>
//                   <span className={Style.product}>{product.category}</span>
//                   <span className={`${Style.product} relative`}>
//                     <span
//                       className={`text-gray-300
//                          line-through text-xs ${
//                            product?.discount
//                              ? "absolute -top-2  left-[62%] "
//                              : "hidden"
//                          }`}
//                     >
//                       ${product?.price}
//                     </span>
//                     $
//                     {product?.discount
//                       ? product?.price - product?.discount
//                       : product?.price}
//                   </span>
//                   <span className={Style.product}>{product.user}</span>
//                   <span className={Style.product}>
//                     {product.createdAt.split("T")[0]}
//                   </span>
//                   <div className={`${Style.product}  text-center space-x-2`}>
//                     <button
//                       //   onClick={() => editHandler(product._id)}
//                       className="p-1 px-2  bg-green-600 rounded hover:bg-green-700 "
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => onDelete(product._id)}
//                       className="p-1 px-2   bg-red-700 rounded hover:bg-red-800"
//                     >
//                       Delete
//                     </button>
//                   </div>{" "}
//                 </div>
//                 <div className="flex gap-5 text-center mt-3">
//                   {" "}
//                   <span className={`${Style.product}  `}>Description</span>
//                   <span
//                     className={
//                       //Style.product
//                       " w-full"
//                     }
//                   >
//                     {product.description}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Products;

const ProductDashboard = ({ products }) => {
  const [productList, setProductList] = useState(products || []);
  const [filteredList, setFilteredList] = useState([]);
  const router = useRouter();

  let debounceTimer;

  // //console.log("path window.location.pathname", path);

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

  const onDelete = async (id) => {
    try {
      await DeleteEvent(
        "/dashboard/products/" + id,
        "product has been deleted successful"
      );
      setProductList((prevList) =>
        prevList.filter((product) => product._id !== id)
      );
    } catch (error) {
      toast.error(
        error?.message ||
          error ||
          "an expected error happen please try again later"
      );
    }
  };

  const descriptionHandler = (description) => {
    showDescription("Product Description", description);
  };
  const handleNameClick = (user) => {
    handleUserClick(user);
  };
  const formatPrice = (price, discount) => {
    if (!discount) return `${price} (No discount)`;
    const discountedPrice = price - discount;
    const discountPercentage = ((discount / price) * 100).toFixed(0); // Calculate percentage
    return `${discountedPrice} (${discountPercentage}% off)`;
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
  useEffect(() => {
    setProductList(products);
  }, [products]);
  return (
    <section className="bgSoft mx-auto p-2 ">
      <div className="flex justify-between mb-4 ">
        <input
          type="search"
          name="search"
          className="rounded p-1 px-2 outline-none bg-gray-50/25 "
          onChange={onChange}
          placeholder="search by Name"
        />{" "}
        <Link
          href="/dashboard/products/add-products"
          target="_blank"
          //    onClick={createproductHandler}
          className="p-2 mx-2 bg-blue-500 rounded hover:bg-blue-600 text-white"
        >
          Create New Product
        </Link>
      </div>
      <div className=" md:text-center">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 bg-gray-100/20 md:place-items-center text-white/70 p-1 rounded-t-lg">
          <span className="font-semibold md:col-span-1">Name</span>
          <span className="font-semibold md:col-span-1">Category</span>
          <span className="font-semibold md:col-span-1">Price/ Discount</span>
          <span className="font-semibold md:col-span-1">User</span>
          <span className="font-semibold md:col-span-1">Description</span>
          <span className="font-semibold md:col-span-1">Created At</span>
          <span className="font-semibold md:col-span-1 text-center">
            Actions
          </span>
        </div>
        <div className="h-[60vh] overflow-x-auto no-scrollbar">
          {filteredList.length > 0
            ? filteredList.map((product, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center border-b p-2"
                >
                  <span>{product.name}</span>
                  <span>{product.category}</span>
                  <span>{formatPrice(product.price, product.discount)}</span>
                  <span
                    className="truncate /overflow-x-auto cursor-pointer text-blue-500"
                    onClick={() => handleNameClick(product.user)}
                  >
                    {product.user.name.split(" ")[0]}
                  </span>
                  <span
                    className="truncate md:col-span-1 cursor-pointer text-blue-500"
                    onClick={() => descriptionHandler(product.description)}
                  >
                    View
                  </span>
                  <span>
                    {new Date(product.createdAt).toLocaleDateString()}
                  </span>
                  <span className="col-span-1 md:col-span-1 text-center">
                    <button
                      className="text-blue-500 hover:text-blue-700 mr-2"
                      onClick={() => updateProductHandler(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => onDelete(product._id)}
                    >
                      Delete
                    </button>
                  </span>
                </div>
              ))
            : productList.map((product, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center border-b p-2"
                >
                  <span>{product.name}</span>
                  <span>{product.category}</span>
                  <span>{formatPrice(product.price, product.discount)}</span>
                  <span
                    className="truncate /overflow-x-auto cursor-pointer text-blue-500"
                    onClick={() => handleNameClick(product.user)}
                  >
                    {product.user.name.split(" ")[0]}
                  </span>
                  <span
                    className="truncate md:col-span-1 cursor-pointer text-blue-500"
                    onClick={() => descriptionHandler(product.description)}
                  >
                    View
                  </span>
                  <span>
                    {new Date(product.createdAt).toLocaleDateString()}
                  </span>
                  <span className="col-span-1 md:col-span-1 text-center">
                    <button
                      className="text-blue-500 hover:text-blue-700 mr-2"
                      onClick={() => updateProductHandler(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => onDelete(product._id)}
                    >
                      Delete
                    </button>
                  </span>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default ProductDashboard;
