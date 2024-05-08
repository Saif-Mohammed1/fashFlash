"use client";
import { toast } from "react-toastify";
import { UploadButton } from "../util/uploadthing";

export default function ImageUploader({ onFilesSelect }) {
  const handleFilesSelect = (files) => {
    // Pass selected files to the parent component
    onFilesSelect(files);
  };

  return (
    <div className="flex items-center justify-center">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          //   console.log("Files: ", res);
          //   alert("Upload Completed");

          toast.success("image uploaded success");
          handleFilesSelect(res); // Pass uploaded files to the parent component
        }}
        onUploadError={(error) => {
          // Do something with the error.
          toast.error(
            "Oops! Something went wrong. Please try again. If the error persists, please let us know."
          );
          //   console.log("error", error);
          //   alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
}
