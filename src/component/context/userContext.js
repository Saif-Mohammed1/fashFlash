"use client";
// import { useSession } from "next-auth/react";
// import  { createContext, useState } from "react";
// export const userContext = createContext(null);
// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState("");
// const session=useSession()
//   const value = {
//     user,
//     setUser,
//   };
//   return <userContext.Provider value={value}>{children}</userContext.Provider>;
// };
import { createContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export const userContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const { data: session, status } = useSession();

  // useEffect to wait for session loading
  useEffect(() => {
    if (status === "loading") {
      return; // Wait until session is loaded
    }
    // Once session is loaded, set the user if session exists
    if (session?.user) {
      setUser(session.user);
    }
  }, [session, status]);

  // Render the component only if the session is loaded
  return status === "loading" ? (
    <div className="flex justify-center items-center h-screen">
      <div className="border-t-4 border-blue-500 rounded-full animate-spin h-12 w-12"></div>
    </div>
  ) : (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};
