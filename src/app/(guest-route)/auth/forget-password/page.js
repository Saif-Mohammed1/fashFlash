import ForgetPassword from "@/component/authentication/forget-password/forget-password";

export const metadata = {
  title: "Forget Password",
  description: "Forget Password",
};

const Page = () => {
  return (
    <div className="p-4 my-4 space-y-4   sm:w-[50%] sm:mx-auto ">
      <h2 className=" font-medium text-2xl text-gray-400 text-center header">
        Password Recovery
      </h2>
      <p className=" text-center text-gray-800/50 text-[15px] text-change">
        Enter the email address you used when you joined and we'll send you
        instructions to reset your password.
      </p>
      <ForgetPassword />
    </div>
  );
};

export default Page;
