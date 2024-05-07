"use client";

import fetchApi from "@/component/util/fetchApi";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const [status, setStatus] = useState(false);
  const [token, setToken] = useState("");
  const [tokenChecked, setTokenChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      if (email) {
        if (token && !tokenChecked) {
          const restPassword = await fetchApi("/auth/forgetPassword", {
            method: "PATCH",
            body: JSON.stringify({
              email,
              token,
            }),
          });
          if (restPassword.error) throw restPassword.error;
          const text = document.querySelector(".text-change");

          if (text) {
            text.innerText =
              "Please Update your password to have access to your account in future.";
          }
          setTokenChecked(true);
        } else if (tokenChecked) {
          const updatePassword = await fetchApi("/auth/updatePassword", {
            method: "PATCH",
            body: JSON.stringify({
              email,
              token,
              password,
              confirmPassword,
            }),
          });
          if (updatePassword.error) throw updatePassword.error;
          toast.success("Update password has been success!");

          const data = await signIn("credentials", {
            email,
            password,
            redirect: false,
            callbackUrl: "/",
          });
          if (data.error) {
            // Authentication failed
            throw data.error;
          }
          // setUser(data);
          // Authentication success
          //    toast.success("Login success 👌");
          // Redirect or perform additional actions upon successful login
          // setTimeout(() => {
          //   router.replace("/");
          // }, 6000);
          setToken("");
          setStatus(false);

          setTokenChecked(false);
        } else {
          const { data, error } = await fetchApi("/auth/forgetPassword", {
            method: "POST",
            body: JSON.stringify({
              email,
            }),
          });
          if (error) throw error;
          toast.success("Rest password has been sent please check your email!");
          if (!status) {
            const text = document.querySelector(".text-change");

            if (text) {
              text.textContent =
                "Please enter the rest password token that we have sent to your email.";
              text.className = "text-blue-500 text-center";
            }
            setStatus(true);
          }
        }
      }
      //   if (status) {
      //     const { data, error } = await fetchApi("/auth/forgetPassword", {
      //       method: "POST",
      //       body: JSON.stringify({
      //         email: email.value,
      //       }),
      //     });
      //   }
    } catch (error) {
      toast.error(
        error?.message ||
          error ||
          "an expected error happen please try again later"
      );
    }
  };
  return (
    <form className="flex flex-col gap-3" onSubmit={onSubmit}>
      <input
        name="email"
        type="email"
        required
        onChange={(e) => setEmail(e.target.value)}
        className="p-4 bg-gray-200 outline-none rounded"
        placeholder="Your Email Address"
      />
      {status && (
        <input
          name="token"
          type="text"
          required={tokenChecked ? true : false}
          onChange={(e) => setToken(e.target.value)}
          className="p-4 bg-gray-200 outline-none rounded"
          placeholder="Please Enter Your Rest Password"
        />
      )}
      {tokenChecked && (
        <>
          <input
            name="password"
            type="text"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="p-4 bg-gray-200 outline-none rounded"
            placeholder="Please Enter Your New Password"
          />
          <input
            name="confirmPassword"
            type="text"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="p-4 bg-gray-200 outline-none rounded"
            placeholder="Please Confirm Your Password"
          />
        </>
      )}
      <input
        type="submit"
        className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        value="Reset Password"
      />
    </form>
  );
};

export default ForgetPassword;
