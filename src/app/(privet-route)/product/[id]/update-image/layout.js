import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Layout = async ({ children }) => {
  const session = await getServerSession(authOptions);

  if (session?.user?.role === "admin" || session?.user?.role === "seller") {
    return <>{children}</>;
  }
  redirect("/");
};

export default Layout;
