"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { SessionProvider } from "next-auth/react";

const AuthProvider = ({ children }) => {
  return (
    <>
      <ToastContainer position="top-right" />
      <SessionProvider>{children}</SessionProvider>
    </>
  );
};

export default AuthProvider;
