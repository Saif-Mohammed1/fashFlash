"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { usePathname } from "next/navigation";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import fetchApi from "@/component/util/fetchApi";
import Message from "@/component/message/message";
import {
  AccountCircle as AccountCircleIcon,
  Lock as LockIcon,
  ShoppingBag as ShoppingBagIcon,
  LocationOn as LocationOnIcon,
  MoneyOff as MoneyOffIcon,
  Assessment as AssessmentIcon,
  BusinessCenter as BusinessCenterIcon,
  AddCircleOutline as AddCircleOutlineIcon,
} from "@mui/icons-material";

const List = ({ session }) => {
  const path = usePathname();
  const [click, setClick] = useState(false);
  const [links, setLinks] = useState("");
  useEffect(() => {
    if (path == "/account/my-product/add-product") {
      setLinks("my-product/add-product");
      return;
    }
    if (path.split("/")[2]) {
      setLinks(path.split("/")[2]);
    }
  }, [path]);
  const toggleList = () => setClick(!click);
  const deleteUser = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        const user = await fetchApi("/user", { method: "DELETE" });
        if (user.error) {
          return <Message data={user} />;
        }
        // Send a request to the server to clear the JWT cookie
        await signOut();
        const logout = await fetchApi("/auth/logout", {
          method: "POST",
          credentials: "include", // Important to include credentials for cookies
        });
      }
      if (logout.error) {
        return <Message data={logout} />;
      }
      toast.success("Account successfully deleted.");
    } catch (error) {
      toast.error(
        error?.message ||
          error ||
          "an expected error happen please try again later"
      );
    }
  };
  let myList = [
    {
      link: "account-details",
      name: "Account Details",
      icon: <AccountCircleIcon />,
    },
    {
      link: "change-password",
      name: "Update Password",
      icon: <LockIcon />,
    },
    {
      link: "my-orders",
      name: "My Orders",
      icon: <ShoppingBagIcon />,
    },
    {
      link: "my-address",
      name: "My Address",
      icon: <LocationOnIcon />,
    },
    {
      link: "my-refunds",
      name: "My Refunds",
      icon: <MoneyOffIcon />,
    },
    {
      link: "my-reports",
      name: "My Reports",
      icon: <AssessmentIcon />,
    },
  ];

  if (session.user.role === "admin" || session.user.role === "seller") {
    myList.push(
      {
        link: "my-product",
        name: "My Product",
        icon: <BusinessCenterIcon />,
      },
      {
        link: "my-product/add-product",
        name: "Add New Product",
        icon: <AddCircleOutlineIcon />,
      }
    );
  }
  return (
    <>
      <ul
        className={`fixed   ${
          click ? "left-[2px]" : "left-[-262px]"
        } border-2 bg-gray-100  top-[70px] 
      z-20  md:static h-[89vh] flex flex-col 
      +justify-between +items-center list-none p-4
      w-[260px] transition-[left] duration-300 
      ease-in-out`}
      >
        {myList.map(({ name, link, icon }) => (
          <Link
            key={link}
            href={`/account/${link}`}
            className={`mb-2 p-2 hover:bg-gray-200 rounded font-medium text-gray-700 ${
              links === link ? " bg-gray-400" : " bg-gray-300"
            }`}
          >
            <li className="flex items-center gap-1 whitespace-nowrap">
              {icon}
              {name}
            </li>
          </Link>
        ))}
        <button
          onClick={toggleList}
          className={`absolute /bg-white p-.5 text-gray-500 ${"left-[262px]"} top-[50%] md:hidden`}
        >
          {click ? <ArrowBackIos /> : <ArrowForwardIos />}
        </button>{" "}
        <button
          onClick={deleteUser}
          className={`border mt-auto border-gray-300 self-center p-3 hover:bg-red-600 hover:text-white  transition-all font-medium text-base text-gray-600 `}
        >
          Delete Account
        </button>
      </ul>
    </>
  );
};

export default List;
