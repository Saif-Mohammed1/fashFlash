import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import DashboardList from "@/component/admin-dashboard/dashboardList";
const Layout = async ({ children }) => {
  const session = await getServerSession(authOptions);
  if (session?.user?.role === "admin") {
    return (
      <div className="flex justify-between   relative bg p-1 -mb-4 gap-2">
        <DashboardList session={session} />
        <div className="w-full   /p-3 space-y-4 ">
          <div className="max-w-[1500px] mx-auto overflow-y-auto no-scrollbar h-[86vh]">
            {children}
          </div>
        </div>
      </div>
    );
  }
  redirect("/");
};

export default Layout;
