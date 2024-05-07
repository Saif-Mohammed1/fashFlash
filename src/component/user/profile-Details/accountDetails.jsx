"use client";

import { userContext } from "@/component/context/userContext";
import fetchApi from "@/component/util/fetchApi";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const AccountDetails = () => {
  const { data: session, update } = useSession();
  const { user } = useContext(userContext);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);

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

  return (
    <>
      <h3 className="mt-8 mb-3 text-center text-gray-400  font-medium text-2xl">
        Account info
      </h3>
      <form
        onSubmit={onsubmit}
        className="flex flex-col justify-between gap-3  w-full max-w-[600px] mx-auto"
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
    </>
  );
};

export default AccountDetails;
