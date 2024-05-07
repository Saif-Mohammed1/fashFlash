import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Layout = async ({ children }) => {
  const session = await getServerSession(authOptions);
  // Check if the session exists and the user is signed in but not verified
  if (session && session.user && session.user.emailVerify == false) {
    return <div className="min-h-[54vh]">{children}</div>; // Render the children normally
  } else {
    redirect("/");
  }
};

export default Layout;
