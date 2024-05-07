"use client";

import fetchApi from "@/component/util/fetchApi";
import { useState } from "react";
import { toast } from "react-toastify";

const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const onsubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error, data } = await fetchApi("/user", {
        method: "PUT",
        body: JSON.stringify({
          password,
          newPassword,
          confirmPassword,
        }),
      });

      if (error) throw error;

      toast.success("update password success");
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
      <h3 className="mt-8  text-center text-gray-400  font-medium text-2xl">
        Account Password Update
      </h3>
      <form
        onSubmit={onsubmit}
        className="flex flex-col my-8 justify-between gap-3  w-full max-w-[600px] mx-auto"
      >
        <h4 className="text-gray-500 font-medium">Current Password</h4>
        <input
          required
          className="p-4 bg-gray-200 outline-none rounded"
          type="text"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <h4 className="text-gray-500 font-medium">New Password</h4>
        <input
          required
          className={`p-4 bg-gray-200 outline-none rounded `}
          type="text"
          name="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <h4 className="text-gray-500 font-medium">New Password Conformation</h4>
        <input
          required
          className={`p-4 bg-gray-200 outline-none rounded `}
          type="text"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
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

export default UpdatePassword;
