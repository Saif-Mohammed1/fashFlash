"use client";

import fetchApi from "@/component/util/fetchApi";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const router = useRouter();
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  //console.log("session", session);
  const Send = async () => {
    try {
      setLoading(true);

      const { data, error } = await fetchApi("/user/verify-email");

      if (error) throw error;
      toast.success(data?.message || data);
    } catch (error) {
      toast.error(
        error?.message ||
          error ||
          "an expected error happened please try again later"
      );
    } finally {
      setLoading(false);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    const { verificationCode } = e.target.elements;
    try {
      if (!verificationCode) return;
      setSubmitLoading(true);
      const { data, error } = await fetchApi("/user/verify-email", {
        method: "PUT",
        body: JSON.stringify({
          verificationCode: verificationCode.value,
        }),
      });
      if (error) throw error;
      verificationCode.value = "";
      await update({
        ...session,
        user: {
          ...session?.user,
          emailVerify: true,
        },
      });
      router.push("/");
    } catch (error) {
      //throw
      toast.error(
        error?.message ||
          error ||
          "an expected error happened please try again later"
      );
    } finally {
      setSubmitLoading(false);
    }
  };
  return (
    <>
      <form
        id="verificationForm"
        className="flex flex-col gap-3  "
        onSubmit={onSubmit}
      >
        <input
          type="text"
          name="verificationCode"
          id="verificationCode"
          placeholder="Enter your verification code"
          required
          className="p-3 bg-gray-200 rounded outline-none"
        />
        <button
          type="submit"
          className="p-2 rounded bg-blue-500 hover:bg-blue-600 font-medium text-white text-xl"
        >
          {submitLoading ? "Verifying..." : "Verify"}{" "}
        </button>
      </form>
      <button
        onClick={Send}
        className="p-2 float-right rounded mt-5 bg-blue-400 hover:bg-blue-500 font-medium text-white text-sm"
      >
        {loading ? "Sending..." : "  don't have code?"}
      </button>
    </>
  );
};

export default VerifyEmail;
