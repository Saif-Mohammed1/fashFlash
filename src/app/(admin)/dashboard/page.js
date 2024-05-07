import Header from "@/component/admin-dashboard/header";
import NavBar from "@/component/admin-dashboard/navBar";
import Payments from "@/component/admin-dashboard/payments";
// import Cher from "@/component/admin-dashboard/rechart";
export const metadata = {
  title: "Admin Dashboard ",
  description: "Dashboard",
};

const Page = () => {
  return (
    <>
      {/* <NavBar /> */}
      <Header />
      <Payments />
      {/* <Cher /> */}
    </>
  );
};

export default Page;
