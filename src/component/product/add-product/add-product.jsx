"use client";
import { toast } from "react-toastify";
import fetchApi from "@/component/util/fetchApi";
import { useEffect, useState } from "react";
import Image from "next/image";
import ImageUploader from "@/component/imageUploader/imagUploader";
// import { uploadImage } from "@/component/util/cloudinary";
const getDefaultExpireDate = () => {
  const today = new Date();
  const defaultExpireDate = new Date(today);
  defaultExpireDate.setDate(today.getDate() + 7); // Add 7 days
  return defaultExpireDate.toISOString().split("T")[0]; // Format as "YYYY-MM-DD"
};

const AddProduct = ({ bg = true }) => {
  const [discount, setDiscount] = useState(0);
  const [images, setImages] = useState([]);
  // const [imagesPreview, setImagesPreview] = useState([]);
  const [price, setPrice] = useState(1);
  const [discountExpire, setDiscountExpire] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (discount > 0) {
      setDiscountExpire(getDefaultExpireDate());
    } else {
      setDiscountExpire("");
    }
  }, [discount]);
  /*
  const submitHandler = async (e) => {
    e.preventDefault();
    const { name, price, category, description, discountExpire, stock } =
      e.target.elements;
    try {
      if (discount < 0) {
        throw new Error("Discount cannot contain a negative value.");
      }
      if (price.value < 0) {
        throw new Error("Price cannot contain a negative value.");
      }
      if (stock.value < 0) {
        throw new Error("Stock cannot contain a negative value.");
      }
      // let imgUrl = [];
      // uploadFiles.forEach(async (img) => {
      //   const url = await uploadImage(img, "shop/products");

      //   imgUrl.push(url);
      // });
      // //console.log("imgurl", imgUrl);

      const formData = new FormData();

      // Append regular fields
      formData.append("name", name.value);
      formData.append("stock", stock.value);
      formData.append("price", price);
      formData.append("category", category.value);
      formData.append("description", description.value);
      formData.append("discount", discount);
      if (discountExpire.value) {
        formData.append("discountExpire", discountExpire.value);
      }

      // Append image files
      uploadFiles.forEach((file) => {
        formData.append("images", file); // Ensure 'file' is the File object, not a URL
      });

      const { data, error } = await fetchApi("/product", {
        method: "POST",
        body: formData,
      });
      if (error) throw error;

      toast.success("Add Product success 👌");

      // toast.success("product add success");
    } catch (error) {
      toast.error(
        error?.message ||
          error ||
          "an expected error happen please try again later"
      );
    }
  };
  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files);
    const mappedFiles = files.map((file) => {
      return URL.createObjectURL(file);
    });

    setUploadFiles(mappedFiles);
  };*/

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { name, category, description, stock } = e.target.elements;
    try {
      if (parseFloat(discount) < 0) {
        throw new Error("Discount cannot contain a negative value.");
      }
      if (parseFloat(price) < 0) {
        throw new Error("Price cannot contain a negative value.");
      }
      if (parseInt(stock.value) < 0) {
        throw new Error("Stock cannot contain a negative value.");
      }
      if (images.length < 1) {
        throw new Error("You need at least one Image.");
      }

      const formData = new FormData();

      // Append regular fields
      formData.append("name", name.value);
      formData.append("stock", stock.value);
      formData.append("price", price); // Corrected: Use price.value instead of price
      formData.append("category", category.value.toLowerCase());
      formData.append("description", description.value);
      formData.append("discount", discount); // Corrected: Use discount.value instead of discount
      if (discountExpire) {
        formData.append("discountExpire", discountExpire);
      }

      // Append image files
      images.forEach((file) => {
        formData.append("images", file.url); // Ensure 'file' is the File object, not a URL
        formData.append("public_id", file.key); // Ensure 'file' is the File object, not a URL
      });

      const { data, error } = await fetchApi("/product", {
        method: "POST",
        body: formData,
      });
      if (error) throw error;

      toast.success("Add Product success 👌");
    } catch (error) {
      toast.error(
        error?.message ||
          error ||
          "An unexpected error occurred. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  }; //uploadthing
  const deletePic = async (key) => {
    try {
      const { data, error } = await fetchApi("/uploadthing/" + key, {
        method: "DELETE",
      });
      if (error) throw error;

      toast.success("image deleted successfully 👌");

      // Remove the image from the files array
      setImages((oldImages) => oldImages.filter((img) => img.key !== key));
    } catch (error) {
      toast.error(
        error?.message ||
          error ||
          "An unexpected error occurred. Please try again later."
      );
    }
    // Remove the image from the previews array
  };

  //cloudanirt
  // const deletePic = (index) => {
  //   // Remove the image from the previews array
  //   // setImagesPreview((oldImagesPreview) =>
  //   //   oldImagesPreview.filter((_, i) => i !== index)
  //   // );

  //   // Remove the image from the files array
  //   setImages((oldImages) => oldImages.filter((_, i) => i !== index));
  // };
  // const handleFilesChange = (e) => {
  //   const files = Array.from(e.target.files);
  //   files.forEach((file) => {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       if (reader.readyState === 2) {
  //         setImagesPreview((oldImag) => [...oldImag, reader.result]);
  //       }
  //     };

  //     reader.readAsDataURL(file);
  //     setImages((oldImag) => [...oldImag, file]);
  //   });
  // };
  const handleImageUpload = (files) => {
    // files.forEach((file) =>
    setImages((oldImag) => [...oldImag, ...files]);
  };
  return (
    <form
      onSubmit={submitHandler}
      className={`flex flex-col gap-3 p-4 my-3 ${
        bg ? "bgSoft text-white" : "text-gray-500 font-medium"
      }  max-w-[1000px] mx-auto h-[83vh] overflow-y-auto no-scrollbar`}
    >
      <h4 className="font-medium text-center  text-xl">Add Product</h4>
      <h3>Category</h3>
      <input
        name="category"
        type="text"
        className={`${
          bg
            ? "outline-none p-3 bg border-gray-50/50 border"
            : "p-4 bg-gray-200 outline-none rounded"
        }`}
        placeholder="Enter product category"
      />
      <h5>Name</h5>
      <input
        name="name"
        type="text"
        className={`${
          bg
            ? "outline-none p-3 bg border-gray-50/50 border"
            : "p-4 bg-gray-200 outline-none rounded"
        }`}
        placeholder="Enter product name"
      />
      <div>
        {" "}
        <h5>Product Image</h5>
        {/* <input
          name="Images"
          type="file"
          className={`${
            bg
              ? "outline-none p-3 bg border-gray-50/50 border"
              : "p-4 bg-gray-200 outline-none rounded"
          } w-full`}
          placeholder="Enter product Image"
          multiple
          onChange={
            handleFilesChange
            //setUploadFiles(e.target.value)
          }
        /> */}{" "}
        <ImageUploader onFilesSelect={handleImageUpload} />
        <div>
          {images.length > 0 ? (
            <div className="flex flex-wrap gap-4 mt-2">
              {images.map((file, inx) => (
                <div key={inx} className=" relative">
                  <Image
                    // className=""
                    src={file.url}
                    width={100}
                    height={100}
                    alt="product image"
                    priority
                    // style={{ objectFit: "cover" }} // Adjust styling as needed
                    // onLoadingComplete={() => URL.revokeObjectURL(file)}
                  />
                  <button
                    type="button"
                    onClick={() => deletePic(file.key)}
                    className="absolute top-0 text-sm px-1 -right-2 rounded-full bg-red-400 hover:bg-red-600"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <h5>Stock</h5>
      <input
        name="stock"
        type="number"
        min={0}
        className={`${
          bg
            ? "outline-none p-3 bg border-gray-50/50 border"
            : "p-4 bg-gray-200 outline-none rounded"
        }`}
        placeholder="How many products do you have in stock"
      />
      <h5>Price</h5>
      <input
        name="price"
        type="number"
        className={`${
          bg
            ? "outline-none p-3 bg border-gray-50/50 border"
            : "p-4 bg-gray-200 outline-none rounded"
        }`}
        placeholder="Enter product price"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
        min={1}
      />
      <h5>Discount</h5>
      <input
        name="discount"
        type="number"
        value={discount}
        onChange={(e) => setDiscount(e.target.value)}
        min={0}
        className={`${
          bg
            ? "outline-none p-3 bg border-gray-50/50 border"
            : "p-4 bg-gray-200 outline-none rounded"
        }`}
        placeholder="Enter product discount"
      />
      <h5 className={`${discount > 0 ? "" : "hidden"}`}>Discount Percentage</h5>
      <input
        name="discountPercentage"
        className={`${
          discount > 0
            ? bg
              ? "outline-none p-3 bg border-gray-50/50 border"
              : "p-4 bg-gray-200 outline-none rounded"
            : "hidden"
        }`}
        type="text"
        value={`${discount > 0 && (discount / price) * 100}%`}
        readOnly
        placeholder="The Discount Percentage is ....."
      />
      <h5 className={`${discount > 0 ? "" : "hidden"}`}>Discount Expire</h5>
      <input
        name="discountExpire"
        className={`${
          discount > 0
            ? bg
              ? "outline-none p-5 bg border-gray-50/50 border"
              : "p-5 bg-gray-200 outline-none rounded"
            : "hidden"
        }`}
        type="date"
        value={discountExpire}
        onChange={(e) => setDiscountExpire(e.target.value)}
        placeholder="Enter discount expire"
      />
      <h5>Description</h5>
      <textarea
        name="description"
        type="text"
        className={`${
          bg
            ? "outline-none  bg border-gray-50/50 border resize-none h-[20vh] px-3 py-12"
            : "p-4 bg-gray-200 outline-none rounded resize-none h-[20vh] px-3 py-12"
        }`}
        placeholder="Enter product description"
      />
      <input
        type="submit"
        className="p-2 cursor-pointer bg-green-500 hover:bg-green-600 font-medium mt-3 text-white"
        disabled={loading ? true : false}
        value={loading ? "Creating...." : "Create"}
      />
    </form>
  );
};

export default AddProduct;
