import React from "react";
import { NavLink } from "react-router-dom";
import { RiHome5Line } from "react-icons/ri";
import { MdTask } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { AiOutlineMenu } from "react-icons/ai";
import LogOut from "../pages/LogOut";

export default function SideBar() {
  const sideBarLinks = [
    {
      id: 1,
      name: "Dashboard",
      href: "/dashboard",
      icon: <RiHome5Line />,
    },
    {
      id: 2,
      name: "My Task",
      href: "/mytask",
      icon: <MdTask />,
    },
  ];

  const [open, setOpen] = React.useState(false);
  const [logoutOpen, setLogoutOpen] = React.useState(false);

  return (
    <>
      {open && (
        <div
          className="h-screen w-full fixed z-10 top-0 left-0 bg-black/30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      <div
        className={
          "h-screen fixed lg:sticky max-lg:w-64 z-50 top-0 max-lg:left-0 gap-6 justify-between lg:flex " +
          (open ? "max-lg:flex" : "max-lg:hidden")
        }
      >
        <div className="h-screen w-screen bg-gray-900 rounded-tr-3xl rounded-br-3xl lg:rounded-2xl flex flex-col gap-4 p-4 shadow-md shadow-gray-300 object-cover">
          <div className="w-full mx-auto flex gap-4 items-center justify-center text-white font-semibold border-b py-4 px-8">
            <img
              src="/images/milr969373561.jpg"
              alt=""
              className="size-12 rounded-full"
            />{" "}
            ali ahmadi
          </div>
          <ul className="w-full text-white flex flex-col gap-4">
            {sideBarLinks.map((link) => (
              <li
                key={link.id}
                className="w-full overflow-hidden border rounded-xl"
              >
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    (isActive ? "bg-gray-200 text-gray-800 border-0" : "") +
                    " py-2 px-8 flex gap-2 items-center  "
                  }
                >
                  {link.icon}
                  <span>{link.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
          <button
            className="py-2 px-8 flex gap-2 items-center border border-gray-100 hover:bg-gray-200 cursor-pointer text-white hover:text-gray-900 rounded-xl"
            onClick={() => setLogoutOpen(!logoutOpen)}
          >
            <IoLogOutOutline />
            <span>Log Out</span>
          </button>
          <LogOut
            isOpen={logoutOpen}
            cancelLogout={() => setLogoutOpen(false)}
          />
        </div>
      </div>
      {/* sidebar toggler */}
      <button
        className="absolute top-12 left-4 z-40 size-8 sm:size-10 border border-gray-500 rounded-xl shadow-md shadow-gray-300 flex items-center justify-center cursor-pointer bg-gray-800 text-white hover:bg-gray-900 lg:hidden"
        onClick={() => setOpen(!open)}
      >
        <AiOutlineMenu />
      </button>
    </>
  );
}
