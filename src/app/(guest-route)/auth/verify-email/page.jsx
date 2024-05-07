import VerifyEmail from "@/component/authentication/verify-email/verifyEmail";

const Page = async () => {
  return (
    <div className="p-4 my-5 #space-y-2 sm:w-[500px] sm:mx-auto">
      <h1 className="text-center font-medium text-gray-700/70 text-xl">
        Verify Your Email
      </h1>
      <p className="text-center text-gray-400 my-2">
        Please enter the verification code that we have sent to your email. if
        you don't have it please ask for new one
      </p>
      <VerifyEmail />
    </div>
  );
};

export default Page;
