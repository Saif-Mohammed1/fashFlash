"use client";
import fetchApi from "@/component/util/fetchApi";
import { Box, TextField, Typography } from "@mui/material";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !password) return;
    try {
      const { data, error } = await fetchApi("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
          passwordConfirm,
        }),
      });
      if (error) throw error;

      toast.success("an account created!");
      const sign = await signIn("credentials", {
        password,
        email,
        redirect: false,
        // callbackUrl: "/auth/verify-email",
      });
      if (sign.error) {
        throw sign.error;
      }
      setTimeout(() => {
        router.replace("/auth/verify-email");
      }, 3000);
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
    >
      <Typography variant="h4" color="gray" sx={{ textAlign: "center" }}>
        Sign Up
      </Typography>
      <p className="text-gray-500 text-center">
        Already have an account?
        <Link href="login" className="text-blue-500 hover:text-blue-700">
          {" "}
          Sign In here
        </Link>
      </p>
      <TextField
        variant="outlined"
        label="Name"
        onChange={(e) => setName(e.target.value)}
        type="text"
        required
        defaultValue={name}
      />
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
      <TextField
        variant="outlined"
        label="passwordConfirm"
        onChange={(e) => setPasswordConfirm(e.target.value)}
        type={showPass ? "text" : "password"}
        required
        defaultValue={passwordConfirm}
      />
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium p-2 rounded text-xl">
        {loading ? "Account is creating....." : "Create an Account"}{" "}
      </button>
    </Box>
  );
};

export default Register;
