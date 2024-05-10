"use client";

import { signOut } from "next-auth/react";
// import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Message = ({ data, error, message, redirect = false }) => {
  // const router = useRouter();

  const logOut = async () => {
    await signOut();
    location = "/auth/login";
    // router.replace("/auth/login");
  };
  useEffect(() => {
    // if (data) {
    //   if (data?.error) {
    //     toast.error(
    //       data?.error?.message ||
    //         // data?.error ||
    //         "An expected error happen please try again later"
    //     );
    //     router.refresh();
    //   }
    //   if (data?.data) {
    //     toast.success(message || "Process has been success");
    //     router.push("/");
    //   }
    //   // if (redirect) return router.replace("/");
    // }

    if (error) {
      toast.error(
        error?.message ||
          // error ||
          "An expected error happen please try again later"
      );
      if (error.status === 401) {
        logOut();
      }
    }
  }, [error]);

  return null;
};

export default Message;
