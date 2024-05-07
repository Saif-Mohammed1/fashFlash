"use client";
// /*
// import {
//   AppBar,
//   Box,
//   Toolbar,
//   IconButton,
//   Typography,
//   Menu,
//   Container,
//   Avatar,
//   Button,
//   Tooltip,
//   MenuItem,
// } from "@mui/material";
// import AdbIcon from "@mui/icons-material/Adb";
// import MenuIcon from "@mui/icons-material/Menu";
// import Link from "next/link";
// import { useContext, useEffect, useState } from "react";
// import { signOut } from "next-auth/react";
// import fetchApi from "../util/fetchApi";
// import { toast } from "react-toastify";
// import { Favorite } from "@mui/icons-material";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import { userContext } from "../context/userContext";
// const pages = [
//   // { label: "Products", component: Link, href: "/" },
//   {
//     label: "Cart",
//     icon: <ShoppingCartIcon className=" mr-2" />,
//     component: Link,
//     href: "/cart",
//   },
//   {
//     label: "WishList",
//     icon: <Favorite className=" mr-2 " />,
//     component: Link,
//     href: "/favorite",
//   },
// ];

// // [
// //   ("Products", "cart", "fav")
// // ];
// const settings = [
//   // { label: "Profile", component: Link, href: "/" },
//   { label: "Account", component: Link, href: "/account" },
//   { label: "Dashboard", component: Link, href: "/dashboard" },
//   { label: "Logout", component: "button", href: null },
// ];
// function ResponsiveAppBar() {
//   const [anchorElNav, setAnchorElNav] = useState(null);
//   const [anchorElUser, setAnchorElUser] = useState(null);
//   const [userAuth, setUserAuth] = useState(null);
//   const [admin, setAdmin] = useState(null);
//   const { user } = useContext(userContext);
//   useEffect(() => {
//     if (user) {
//       if (user?.role === "admin") {
//         setAdmin(user?.role);
//       }
//       setUserAuth(user);
//     }
//   }, [user]);

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };
//   const LogOut = async () => {
//     try {
//       await signOut();
//       // Send a request to the server to clear the JWT cookie
//       const { data, error } = await fetchApi("/auth/logout", {
//         method: "POST",
//         credentials: "include", // Important to include credentials for cookies
//       });
//       if (error) throw error;
//     } catch (error) {
//       toast.error(
//         error?.message ||
//           error ||
//           "an expected error happen please try again later"
//       );
//     }
//   };
//   return (
//     <AppBar position="static">
//       <Container maxWidth="xl">
//         {/* //appear from md screens to  */}
//         <Toolbar disableGutters>
//           <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
//           <Typography
//             variant="h6"
//             noWrap
//             component={Link}
//             href="/"
//             sx={{
//               mr: 2,
//               display: { xs: "none", md: "flex" },
//               fontFamily: "monospace",
//               fontWeight: 700,
//               textDecoration: "none",
//             }}
//           >
//             fashFlash
//           </Typography>

//           <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
//             <IconButton
//               size="large"
//               aria-label="account of current user"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//               color="inherit"
//             >
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: "bottom",
//                 horizontal: "left",
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: "top",
//                 horizontal: "left",
//               }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{
//                 display: { xs: "block", md: "none" },
//               }}
//             >
//               {pages.map(({ label, icon, component, href }) => (
//                 <MenuItem key={label} onClick={handleCloseNavMenu}>
//                   <Typography
//                     textAlign="center"
//                     component={component}
//                     href={href}
//                   >
//                     {icon}
//                     {label}
//                   </Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//           <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
//           <Typography
//             variant="h5"
//             noWrap
//             component={Link}
//             href="/"
//             sx={{
//               mr: 2,
//               display: { xs: "flex", md: "none" },
//               flexGrow: 1,
//               fontFamily: "monospace",
//               fontWeight: 700,

//               textDecoration: "none",
//             }}
//           >
//             fashFlash
//           </Typography>
//           <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
//             {pages.map(({ label, icon, component, href }) => (
//               <Button
//                 key={label}
//                 component={component}
//                 href={href}
//                 onClick={handleCloseNavMenu}
//                 sx={{
//                   my: 2,
//                   color: "white",
//                   display: "block",
//                   textTransform: "unset",
//                 }}
//               >
//                 {icon}
//                 {label}
//               </Button>
//             ))}
//           </Box>

//           {
//             <Box display={"flex"}>
//               {/* {admin &&
//                 (AdminDashboard ? (
//                   <Link href="te">Admin View</Link>
//                 ) : (
//                   <Link href="te">Client View</Link>
//                 ))} */}
//               {!userAuth && (
//                 <>
//                   <Typography
//                     variant="h6"
//                     component={Link}
//                     href="/auth/login"
//                     color="white"
//                     p="6px"
//                   >
//                     logIn
//                   </Typography>
//                   <Typography
//                     variant="h6"
//                     component={Link}
//                     href="/auth/register"
//                     color="white"
//                     p="6px"
//                   >
//                     register
//                   </Typography>
//                 </>
//               )}
//             </Box>
//           }
//           {userAuth && (
//             <Box sx={{ flexGrow: 0 }}>
//               <Tooltip title="Open settings">
//                 <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                   <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
//                 </IconButton>
//               </Tooltip>

//               <Menu
//                 sx={{ mt: "45px" }}
//                 id="menu-appear"
//                 anchorEl={anchorElUser}
//                 anchorOrigin={{
//                   vertical: "top",
//                   horizontal: "right",
//                 }}
//                 keepMounted
//                 transformOrigin={{
//                   vertical: "top",
//                   horizontal: "right",
//                 }}
//                 open={Boolean(anchorElUser)}
//                 onClose={handleCloseUserMenu}
//               >
//                 {settings.map(({ label, component, href }) => (
//                   <MenuItem
//                     key={label}
//                     onClick={handleCloseUserMenu}
//                     hidden={!admin && label === "Dashboard" ? false : true}
//                   >
//                     {label === "Dashboard" && !admin ? null : (
//                       <Typography
//                         component={component}
//                         href={href}
//                         textAlign="center"
//                         {...(href === null && { onClick: () => LogOut() })}
//                       >
//                         {label}
//                       </Typography>
//                     )}
//                   </MenuItem>
//                 ))}
//               </Menu>
//             </Box>
//           )}
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }
// export default ResponsiveAppBar;
import React, { useState, useEffect, useContext, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import fetchApi from "../util/fetchApi";
import { toast } from "react-toastify";
import { userContext } from "../context/userContext";

import { Avatar } from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import { Storefront as StorefrontIcon } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { signOut } from "next-auth/react";
import {
  Lock as LockIcon,
  PersonAdd as PersonAddIcon,
} from "@mui/icons-material";

const pages = [
  { label: "Cart", href: "/cart", icon: <ShoppingCartIcon /> },
  { label: "WishList", href: "/favorite", icon: <FavoriteIcon /> },
];

const settings = [
  { label: "Account", href: "/account", icon: <AccountCircleIcon /> },
  { label: "Dashboard", href: "/dashboard", icon: <DashboardIcon /> },
  { label: "Logout", href: "", icon: <ExitToAppIcon /> },
];

function ResponsiveAppBar() {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);
  const [openSmallMenu, setOpenSmallMenu] = useState(false);
  // const [anchorElUser, setAnchorElUser] = useState(null);
  const [userAuth, setUserAuth] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useContext(userContext);
  const userMenuRef = useRef(null);
  const smallMenuRef = useRef(null);
  const path = usePathname();
  // console.log("path", path);
  useEffect(() => {
    // Function to handle clicks outside of the user menu
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setOpenMenu(false); // Close the user menu if click occurs outside of it
      }
      if (
        smallMenuRef.current &&
        !smallMenuRef.current.contains(event.target)
      ) {
        setOpenSmallMenu(false); // Close the small menu if click occurs outside of it
      }
    }

    // Add event listener to the document to handle clicks outside of the user menu
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup function to remove the event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Empty dependency array to ensure this effect runs only once

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        setAdmin(user.role);
      }
      setUserAuth(user);
    }
  }, [user]);

  const handleOpenUserMenu = (event) => {
    setOpenMenu(!openMenu);
  };
  const handleSmallNavMenu = (event) => {
    setOpenSmallMenu(!openSmallMenu);
  };

  // //console.log("path window.location.pathname", path);

  const handleSearch = (e) => {
    e.preventDefault();

    const search = searchTerm.trim().toLowerCase();

    let queryString = new URLSearchParams(window.location.search);

    if (search) {
      // Set the search term in the URL
      queryString.set("name", search);
    } else {
      // Remove the name parameter from the URL when the search term is empty
      queryString.delete("name");
    }

    const path = `/?${queryString.toString()}`;
    // Use router.push to navigate to the new URL
    router.push(path);
  };
  let debounceTimer;

  // //console.log("path window.location.pathname", path);

  const onChange = (e) => {
    clearTimeout(debounceTimer);

    const searchTerm = e.target.value.trim().toLowerCase();

    debounceTimer = setTimeout(() => {
      let queryString = new URLSearchParams(window.location.search);

      if (searchTerm) {
        // Set the search term in the URL
        queryString.set("name", searchTerm);
      } else {
        // Remove the name parameter from the URL when the search term is empty
        queryString.delete("name");
      }

      const path = `/?${queryString.toString()}`;
      // Use router.push to navigate to the new URL
      router.push(path);
    }, 800); // Adjust debounce time as needed
  };

  const LogOut = async () => {
    try {
      await signOut();
      await fetchApi("/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      router.push("/auth/login");
    } catch (error) {
      toast.error(
        error?.message ||
          "An unexpected error occurred. Please try again later."
      );
    }
  };

  return (
    <nav
      id="nav-bar "
      className={path.includes("dashboard") ? "bg text-white" : ""}
    >
      <div className=" mx-auto flex items-center justify-between md:justify-center p-4">
        <Link href="/" className="flex items-center">
          <span className=" mr-1">
            <StorefrontIcon />
          </span>

          <>
            <span className="hidden md:flex text-base font-medium md:text-lg md:font-bold md:mr-2 cursor-pointer">
              fashFlash
            </span>
          </>
        </Link>
        <div className=" md:hidden flex-1 mx-2 ">
          <input
            type="search"
            placeholder="Search..."
            onChange={onChange}
            className="border outline-none w-full border-gray-300 rounded-md px-3 py-1 mr-2 flex-1"
          />
        </div>
        <div className="relative md:hidden" ref={smallMenuRef}>
          <button onClick={handleSmallNavMenu}>
            <MenuIcon />
          </button>

          <ul
            className={`${
              openSmallMenu ? "absolute" : "hidden"
            } z-50 right-0 top-12 bg-white shadow-md rounded-md p-2 transition-all `}
            id="user-menu"
          >
            {pages.map(({ label, href, icon }) => (
              <li key={label}>
                <Link key={label} href={href}>
                  <span className="flex gap-1 px-4 py-2 text-gray-800 cursor-pointer hover:text-black">
                    {icon}
                    {label}
                  </span>
                </Link>
              </li>
            ))}
            {!userAuth && (
              <>
                <li>
                  <Link href="/auth/login">
                    <span className="flex gap-1 px-4 py-2 text-gray-800 cursor-pointer hover:text-black">
                      <LockIcon /> LogIn
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/auth/register">
                    <span className="flex gap-1 px-4 py-2 text-gray-800 cursor-pointer hover:text-black">
                      <PersonAddIcon /> Register
                    </span>
                  </Link>
                </li>
              </>
            )}
            {user &&
              settings.map(({ label, href, icon }) => (
                <li key={label}>
                  {label === "Dashboard" && !admin ? null : (
                    <Link
                      href={href}
                      onClick={() => (label === "Logout" ? LogOut() : null)} // Wrap the onClick event handler in an arrow function
                    >
                      <span className="flex gap-1 px-4 py-2 text-gray-800 cursor-pointer hover:text-black">
                        {icon}
                        {label}
                      </span>
                    </Link>
                  )}
                </li>
              ))}
          </ul>
        </div>
        <div
          className="hidden md:flex md:items-center md:justify-end space-x-4 flex-1"
          id="nav-items"
        >
          <form onSubmit={handleSearch} className="flex items-center  flex-1">
            <input
              type="search"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border outline-none border-gray-300 rounded-md px-3 py-1 mr-2 flex-1"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-1 rounded-md"
            >
              Search
            </button>
          </form>
          {pages.map(({ label, href, icon }) => (
            <Link key={label} href={href}>
              <span className="text-white cursor-pointer">
                {icon}
                {label}
              </span>
            </Link>
          ))}
          {!userAuth && (
            <>
              <Link href="/auth/login">
                <span className="text-white cursor-pointer">LogIn</span>
              </Link>
              <Link href="/auth/register">
                <span className="text-white cursor-pointer">Register</span>
              </Link>
            </>
          )}
          {userAuth && (
            <div className="relative " ref={userMenuRef}>
              <button onClick={handleOpenUserMenu}>
                <Avatar
                  alt={user ? user.name : "Unknown"}
                  src={
                    user.photo.startsWith("http")
                      ? user.photo
                      : "/users/user.jpg"
                  }
                />
              </button>
              <ul
                className={`${
                  openMenu ? "absolute" : "hidden"
                } z-50 right-0 top-12 bg-white shadow-md rounded-md p-2 transition-all`}
                id="user-menu"
              >
                {settings.map(({ label, href, icon }) => (
                  <li key={label}>
                    {label === "Dashboard" && !admin ? null : (
                      <Link href={href}>
                        <span
                          onClick={label === "Logout" ? LogOut : null}
                          className="flex gap-1 px-4 py-2 text-gray-800 cursor-pointer hover:text-black"
                        >
                          {icon}
                          {label}
                        </span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default ResponsiveAppBar;
