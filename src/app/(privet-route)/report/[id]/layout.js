import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const Layout = async ({ children }) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <p className=" text-center my-32 bg-gray-200 p-4 rounded">
        please login first to provide your report thanks for visiting our
        website (:
      </p>
    );
  }

  return <>{children}</>;
};

export default Layout;
