import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import List from "../../component/user/list/list.component";
import Link from "next/link";

const Layout = async ({ children }) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <div className="h-[90vh] font-bold text-gray-400 text-center flex flex-col items-center justify-center">
        <p> you are not authorized</p>
        <Link href="/auth/login" className="hover:text-green-500">
          LogIn
        </Link>
      </div>
    );
    // NextResponse.MyProfilejson({ message: "you are not authorized" }, { status: 401 });
  }
  /**    /* justify-content: unset; 
    position: absolute;
    left: 0;
    top: 83px;
    z-index: 20;
    background-coabsloutelor: #acacac99;
    height: 250px; */
  return (
    <div className="flex justify-between mx-auto  relative bg-white -mb-4">
      <List session={session} />
      <div className="w-full h-[84vh] overflow-auto mt-8 no-scrollbar ">
        {children}
      </div>
    </div>
  );
};

export default Layout;
