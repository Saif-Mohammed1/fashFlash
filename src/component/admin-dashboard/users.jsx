"use client";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { createUser, handleEditClick } from "../util/sweatAlert/users";
import { DeleteEvent } from "../util/sweatAlert/staticEvent";
import { useRouter } from "next/navigation";

const Users = ({ users }) => {
  const [usersList, setUsersList] = useState(users || []);
  const [filteredUsers, setFilteredUsers] = useState([]);
  // const [path, setPath] = useState("");
  const router = useRouter();
  let debounceTimer;
  // //console.log("path window.location.pathname", path);

  const onChange = (e) => {
    clearTimeout(debounceTimer);

    const searchTerm = e.target.value.trim().toLowerCase();

    debounceTimer = setTimeout(() => {
      let queryString = new URLSearchParams(window.location.search);

      if (searchTerm) {
        // Set the search term in the URL
        queryString.set("email", searchTerm);
      } else {
        // Remove the email parameter from the URL when the search term is empty
        queryString.delete("email");
      }

      const path = `${window.location.pathname}?${queryString.toString()}`;
      // Use router.push to navigate to the new URL
      router.push(path);
    }, 800); // Adjust debounce time as needed
  };

  const onDelete = async (id) => {
    try {
      await DeleteEvent(
        "/dashboard/users/" + id,
        "user has been deleted successful"
      );

      setUsersList((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } catch (error) {
      toast.error(
        error?.message ||
          error ||
          "an expected error happen please try again later"
      );
    }
  };
  const createUserHandler = async () => {
    try {
      await createUser();
      router.refresh();
    } catch (error) {
      toast.error(
        error?.message ||
          error ||
          "an expected error happen please try again later"
      );
    }
  };
  const editHandler = async (id) => {
    try {
      await handleEditClick(id);
      router.refresh();
    } catch (error) {
      toast.error(
        error?.message ||
          error ||
          "an expected error happen please try again later"
      );
    }
  };
  useEffect(() => {
    setUsersList(users);
  }, [users]);
  // return (
  //   <div className="+text-center bgSoft p-3 space-y-2 lg:mx-auto lg:max-w-[1200px] ">
  //     <div className="flex justify-between mb-4 ">
  //       <input
  //         type="search"
  //         name="search"
  //         className="rounded p-1 px-2 outline-none bg-gray-50/25 "
  //         onChange={onChange}
  //         placeholder="search by email"
  //       />
  //       <button
  //         onClick={createUserHandler}
  //         className="p-2 mx-2 bg-blue-500 rounded hover:bg-blue-600 text-white"
  //       >
  //         Create New User
  //       </button>
  //     </div>
  //     <div className="text-white +text-center h-[70vh] overflow-x-auto no-scrollbar ">
  //       <div
  //         className="flex font-medium justify-between  items-center
  //       gap-5 mb-5"
  //       >
  //         <span className={Style.user}>Name</span>
  //         <span className={`${Style.user} `}>Email</span>
  //         <span className={Style.user}>Created At</span>
  //         <span className={Style.user}>Role</span>
  //         <span className={Style.user}>Active</span>
  //         <span className={`${Style.user}  text-center`}>Actions</span>
  //       </div>
  //       <div className="flex flex-col w-full gap-5   ">
  //         {filteredUsers.length > 0
  //           ? filteredUsers.map((user, index) => (
  //               <div
  //                 key={index}
  //                 className="flex justify-between  items-center +text-center w-full gap-5"
  //               >
  //                 <span className={Style.user}>{user.name.split(" ")[0]}</span>
  //                 <span
  //                   className={`${Style.user} overflow-x-auto no-scrollbar`}
  //                 >
  //                   {user.email}
  //                 </span>
  //                 <span className={Style.user}>
  //                   {user.createdAt.split("T")[0]}
  //                 </span>
  //                 <span className={Style.user}>{user.role}</span>
  //                 <span className={Style.user}>
  //                   {user.active ? "true" : "false"}
  //                 </span>
  //                 <div className={`${Style.user}  text-center space-x-2`}>
  //                   <button
  //                     onClick={() => handleEditClick(user._id)}
  //                     className="p-1 px-2  bg-green-600 rounded hover:bg-green-700 "
  //                   >
  //                     Edit
  //                   </button>
  //                   <button
  //                     onClick={() => onDelete(user._id)}
  //                     className="p-1 px-2   bg-red-700 rounded hover:bg-red-800"
  //                   >
  //                     Delete
  //                   </button>
  //                 </div>
  //               </div>
  //             ))
  //           : usersList.map((user, index) => (
  //               <div
  //                 key={index}
  //                 className="flex justify-between items-center +text-center w-full gap-5"
  //               >
  //                 <span className={Style.user}>{user.name.split(" ")[0]}</span>
  //                 <span className={Style.user}>{user.email}</span>
  //                 <span className={Style.user}>
  //                   {user.createdAt.split("T")[0]}
  //                 </span>
  //                 <span className={Style.user}>{user.role}</span>
  //                 <span className={Style.user}>
  //                   {user.active ? "true" : "false"}
  //                 </span>
  //                 <div className={`${Style.user}  text-center space-x-2`}>
  //                   <button
  //                     onClick={() => editHandler(user._id)}
  //                     className="p-1 px-2  bg-green-600 rounded hover:bg-green-700 "
  //                   >
  //                     Edit
  //                   </button>
  //                   <button
  //                     onClick={() => onDelete(user._id)}
  //                     className="p-1 px-2   bg-red-700 rounded hover:bg-red-800"
  //                   >
  //                     Delete
  //                   </button>
  //                 </div>
  //               </div>
  //             ))}
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <section className="bgSoft mx-auto p-2 ">
      <div className="flex justify-between mb-4 ">
        <input
          type="search"
          name="search"
          className="rounded p-1 px-2 outline-none bg-gray-50/25 "
          onChange={onChange}
          placeholder="search by email"
        />
        <button
          onClick={createUserHandler}
          className="p-2 /mx-2 bg-blue-500 rounded hover:bg-blue-600 text-white"
        >
          Create New User
        </button>
      </div>
      <div className=" md:text-center">
        <div className="grid grid-cols-1 md:grid-cols-8 gap-4 bg-gray-100/20 md:place-items-center text-white/70 p-1 rounded-t-lg">
          <span className="font-semibold md:col-span-1">Name</span>
          <span className="font-semibold md:col-span-1">Role</span>
          <span className="font-semibold md:col-span-2">Email</span>
          <span className="font-semibold md:col-span-1">Active</span>
          <span className="font-semibold md:col-span-1">Email Verified</span>
          <span className="font-semibold md:col-span-1">Created At</span>

          <span className="font-semibold md:col-span-1 text-center">
            Actions
          </span>
        </div>
        <div className="h-[60vh] overflow-x-auto no-scrollbar">
          {filteredUsers.length > 0
            ? filteredUsers.map((user, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-8 gap-4 items-center border-b p-2"
                >
                  <span className="md:col-span-1 truncate">{user.name}</span>
                  <span className="md:col-span-1">{user.role}</span>
                  <span className="md:col-span-2 truncate">{user.email}</span>
                  <span className="md:col-span-1">
                    {user.active ? "Yes" : "No"}
                  </span>
                  <span className="md:col-span-1">
                    {user.emailVerify ? "Yes" : "No"}
                  </span>
                  <span className="md:col-span-1">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                  <div className="col-span-1 text-center">
                    <button
                      onClick={() => editHandler(user._id)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(user._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            : usersList.map((user, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-8 gap-4 items-center border-b p-2"
                >
                  <span className=" md:col-span-1">{user.name}</span>
                  <span className="md:col-span-1">{user.role}</span>
                  <span className="md:col-span-2 truncate">{user.email}</span>
                  <span className="md:col-span-1">
                    {user.active ? "Yes" : "No"}
                  </span>
                  <span className="md:col-span-1">
                    {user.emailVerify ? "Yes" : "No"}
                  </span>
                  <span className="md:col-span-1">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                  <div className="col-span-1 text-center">
                    <button
                      onClick={() => editHandler(user._id)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(user._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default Users;
