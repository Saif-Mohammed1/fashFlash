"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Storefront as StorefrontIcon,
  ShoppingCart as ShoppingCartIcon,
  MoneyOff as MoneyOffIcon,
  Assessment as AssessmentIcon,
  Email as EmailIcon,
} from "@mui/icons-material";

import { usePathname } from "next/navigation";

const DashboardList = ({ session }) => {
  const path = usePathname();

  const [click, setClick] = useState(false);
  const [links, setLinks] = useState("");
  useEffect(() => {
    if (path.split("/")[2]) {
      setLinks(path.split("/")[2]);
    }
    if (path.split("/")[1] === "dashboard" && !path.split("/")[2]) {
      setLinks(path.split("/")[1]);
    }
  }, [path]);
  const toggleList = () => setClick(!click);

  const myList = [
    {
      link: "dashboard",
      name: "Dashboard",
      icon: <DashboardIcon />,
    },
    {
      link: "users",
      name: "Users",
      icon: <PeopleIcon />,
    },
    {
      link: "products",
      name: "Products",
      icon: <StorefrontIcon />,
    },
    {
      link: "orders",
      name: "Orders",
      icon: <ShoppingCartIcon />,
    },
    {
      link: "refunds",
      name: "Refunds",
      icon: <MoneyOffIcon />,
    },
    {
      link: "reports",
      name: "Reports",
      icon: <AssessmentIcon />,
    },
    { link: "contact-us", name: "Contact Us", icon: <EmailIcon /> },
  ];
  return (
    <div
      className={`fixed text-white ${
        click ? "left-[2px]" : "left-[-262px]"
      }  bgSoft  top-[70px] 
      z-20  md:static h-[88vh] p-4
      w-[260px] transition-[left] duration-300 
      ease-in-out`}
    >
      <div className="flex">
        <Image
          src={"/users/user.jpg"}
          height={40}
          width={40}
          className="rounded-full"
          alt={session?.user?.name.split(" ")[0]}
        />
        <div className="flex flex-col ml-2">
          <span>{session?.user?.name.split(" ")[0]}</span>
          <span>{session?.user?.role}</span>
        </div>
      </div>
      <ul className="flex flex-col mt-4 list-none">
        {myList.map(({ name, link, icon }) => (
          <Link
            key={link}
            href={`${link === "dashboard" ? "/" + link : "/dashboard/" + link}`}
            className={`mb-2 p-2 hover:bg-gray-50/25 rounded font-medium +text-gray-700 ${
              links === link ? "bg-gray-50/25" : " "
            }`}
          >
            <li className="flex items-center">
              {icon}
              <span className="ml-2">{name}</span>
            </li>
          </Link>
        ))}

        <button
          onClick={toggleList}
          className={`absolute /bg-white p-.5 text-white ${"left-[262px]"} top-[50%] md:hidden`}
        >
          {click ? <ArrowBackIos /> : <ArrowForwardIos />}
        </button>
      </ul>
    </div>
  );
};

export default DashboardList;
