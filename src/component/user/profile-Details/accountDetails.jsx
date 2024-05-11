"use client";

import { userContext } from "@/component/context/userContext";
import ImageUploader from "@/component/imageUploader/imagUploader";
import fetchApi from "@/component/util/fetchApi";
import { Edit } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const AccountDetails = () => {
  const { data: session, update } = useSession();
  const { user } = useContext(userContext);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user) {
      setName(user?.name);
      setEmail(user?.email);
    }
  }, [user]);
  const onsubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error, data } = await fetchApi("/user", {
        method: "PATCH",
        body: JSON.stringify({
          name: name || undefined,
          email: email || undefined,
        }),
      });

      if (error) throw error;

      await update({
        ...session,
        user: {
          ...session?.user,
          ...data?.data,
        },
      });
      toast.success("update data success");
    } catch (error) {
      toast.error(
        error?.message ||
          error ||
          "an expected error happen please try again later"
      );
    } finally {
      setLoading(false);
    }
  };
  const handleFileInputChange = async (e) => {
    const public_id = e[0].key;
    const photo = e[0].url;
    try {
      const { error, data } = await fetchApi("/user/photo", {
        method: "PUT",
        body: JSON.stringify({
          public_id,
          photo,
        }),
      });

      if (error) throw error;
      await update({
        ...session,
        user: {
          ...session?.user,
          photo,
        },
      });
      toast.success("Image updated successfully");
    } catch (error) {
      toast.error(
        error?.message ||
          error ||
          "an expected error happen please try again later"
      );
    }
    // Handle file input change here
  };
  return (
    <div className="flex flex-col items-center justify-between gap-3  w-full max-w-[600px] mx-auto">
      <h3 className="mt-8 mb-3 text-center text-gray-400  font-medium text-2xl">
        Account info
      </h3>

      <div className="relative rounded-full overflow-hidden">
        <img
          src={user?.photo.startsWith("http") ? user?.photo : "/users/user.jpg"}
          alt={user?.name}
          className="rounded-full w-[200px] h-[200px] "
        />
        <div className="absolute bottom-0 left-0 h-7 flex items-center justify-center w-full">
          {/* Render file input element and style it as hidden */}
          {/* <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileInputChange}
          /> */}
          <div>
            <ImageUploader onFilesSelect={handleFileInputChange} />
            {/* Render Material edit icon and attach click event to trigger file input click */}
          </div>{" "}
          {/* <Edit
            className="text-gray-600 cursor-pointer"
            onClick={() => fileInputRef.current.click()}
          /> */}
        </div>
      </div>
      <form
        className="flex flex-col justify-between gap-3  w-full"
        onSubmit={onsubmit}
      >
        <input
          className="p-4 bg-gray-200 outline-none rounded"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className={`p-4 bg-gray-200 outline-none rounded ${
            session?.user?.emailVerify ? "" : "border-2 border-red-400 "
          }`}
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <span
          className={` ${
            session?.user?.emailVerify
              ? "hidden"
              : "text-xs text-red-500 flex justify-between"
          }`}
        >
          Your Email is not verified please verify it .
          <Link
            href="/auth/verify-email"
            className="text-blue-400 hover:text-blue-500"
          >
            Verify Now
          </Link>
        </span>
        <input
          className="p-4 bg-green-400 outline-none rounded cursor-pointer hover:bg-green-500 font-medium text-white"
          type="submit"
          disabled={loading ? true : false}
          value={loading ? "Updating...." : "Update"}
        />
      </form>
    </div>
  );
};

export default AccountDetails;
