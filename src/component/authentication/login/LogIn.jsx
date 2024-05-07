"use client";
import { Box, Button, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    try {
      const data = await signIn("credentials", {
        email,
        password,
        redirect: false,
        // callbackUrl: "/",
      });
      if (data.error) {
        // Authentication failed
        throw new Error(data.error);
      }
      // setUser(data);
      // Authentication success
      toast.success("Login success 👌");
      // Redirect or perform additional actions upon successful login
      setTimeout(() => {
        router.replace("/");
      }, 3000);
    } catch (error) {
      toast.error(
        error?.message ||
          error ||
          "an expected error happen please try again later"
      );
    }
  };

  return (
    <Box
      component="form"
      onSubmit={submitHandler}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "600px",
        mx: "auto",
      }}
      my={6}
      px={"16px"}
      className="space-y-8 p-4 shadow-lg rounded bg-white/60"
      height={"70vh"}
    >
      <Typography variant="h4" color="gray" sx={{ textAlign: "center" }}>
        SignIn
      </Typography>
      <p className="text-gray-500 text-center">
        Don't have an account?
        <Link href="register" className="text-blue-500 hover:text-blue-700">
          {" "}
          Sign Up
        </Link>
      </p>
      <TextField
        variant="outlined"
        label="Email"
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        required
        defaultValue={email}
      />
      <div className="relative flex items-center">
        <TextField
          className="w-full"
          variant="outlined"
          label="password"
          onChange={(e) => setPassword(e.target.value)}
          type={showPass ? "text" : "password"}
          required
          defaultValue={password}
        />
        <span className="absolute right-3">
          {showPass ? (
            <VisibilityIcon
              className="text-gray-500 cursor-pointer"
              onClick={() => setShowPass(!showPass)}
            />
          ) : (
            <VisibilityOffIcon
              className="text-gray-500 cursor-pointer"
              onClick={() => setShowPass(!showPass)}
            />
          )}
        </span>
      </div>
      <div className="flex flex-row justify-between">
        <Link
          href="forget-password"
          className="text-gray-500 hover:text-gray-600"
        >
          Forgot your password?
        </Link>
      </div>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium p-2 rounded text-xl">
        Login
      </button>
    </Box>
  );
};

export default LogIn;
