"use client";

import ImageUploader from "@/component/imageUploader/imagUploader";
import fetchApi from "@/component/util/fetchApi";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

const UpdateImage = ({ image, id }) => {
  const [images, setImages] = useState([]);
  // const [imagesPreview, setImagesPreview] = useState([]);
  const [oldImagesPreview, setOldImagesPreview] = useState(image || []);
  const [loading, setLoading] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      if (images.length === 0) {
        toast.error("You need at least one Image");
        return;
      }
      setLoading(true);
      const formData = new FormData();
      // Append image files
      // images.forEach((file) => {
      //   formData.append("images", file); // Ensure 'file' is the File object, not a URL
      // });
      if (images.length < 1) {
        throw new Error("You need at least one Image.");
      }
      // Append image files
      images.forEach((file) => {
        formData.append("images", file.url); // Ensure 'file' is the File object, not a URL
        formData.append("public_id", file.key); // Ensure 'file' is the File object, not a URL
      });

      const { data, error } = await fetchApi(`/product/${id}/update-image`, {
        method: "PUT",
        body: formData,
      });
      if (error) throw error;

      toast.success("Image Updated successfully 👌");
    } catch (error) {
      toast.error(
        error?.message ||
          error ||
          "An unexpected error occurred. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  //for clodinary
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
  // const deletePic = (index) => {
  //   // Remove the image from the previews array
  //   setImagesPreview((oldImagesPreview) =>
  //     oldImagesPreview.filter((_, i) => i !== index)
  //   );

  //   // Remove the image from the files array
  //   setImages((oldImages) => oldImages.filter((_, i) => i !== index));
  // };
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

  const handleImageUpload = (files) => {
    // files.forEach((file) =>
    setImages((oldImag) => [...oldImag, ...files]);
  };
  return (
    <form
      className="flex flex-col gap-3 p-4 my-3 bg-gray-200 max-w-[600px] mx-auto mt-16 "
      onSubmit={onSubmit}
    >
      <h4 className="font-medium text-center text-xl">Update Product Images</h4>

      {images.length === 0 && (
        <>
          <h3 className="mt-4 mb-2 text-lg font-medium">Old Product Images</h3>
          <div className="flex flex-wrap gap-4">
            {oldImagesPreview.map((url, index) => (
              <div key={index} className="relative">
                <Image
                  src={url}
                  width={100}
                  height={100}
                  alt="Product Image"
                  className="rounded"
                />
              </div>
            ))}
          </div>
        </>
      )}

      <div>
        <h5 className="mt-4 mb-2 text-lg font-medium">Product Images</h5>
        {/* <input
          name="images"
          type="file"
          className="outline-none p-3 bg-gray-100 w-full border border-gray-300 rounded"
          placeholder="Enter Product Images"
          multiple
          onChange={handleFilesChange}
        /> */}
        <ImageUploader onFilesSelect={handleImageUpload} />
        {images.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-2">
            {images.map((file, index) => (
              <div key={index} className="relative">
                <Image
                  src={file.url}
                  width={100}
                  height={100}
                  alt="Product Image"
                  className="rounded"
                />
                <button
                  type="button"
                  onClick={() => deletePic(file.key)}
                  className="absolute top-0 right-0 text-sm px-1 rounded-full bg-red-400 hover:bg-red-600"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <input
        type="submit"
        value={loading ? "Updating..." : "Update"}
        className="mt-4 p-3 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
      />
    </form>
  );
};

export default UpdateImage;
