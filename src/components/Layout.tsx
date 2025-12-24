import SideBar from "./SideBar";
import Dates from "./Dates";
import React, { useState } from "react";
import Search from "./Search";
import { BsPlusLg } from "react-icons/bs";
import MyReport from "./MyReport";
interface Layout {
  children: React.ReactNode;
}

export default function Layout({ children}: Layout) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="w-full grid grid-cols-10 p-4 mx-auto gap-8 h-screen">
        <div className="lg:col-span-2">
          <SideBar />
        </div>
        <div className="col-span-10 lg:col-span-8 w-full">
          <div className="flex flex-col mx-auto gap-4">
            <Dates />
            <Search />
            <button
              onClick={() => setOpen(true)}
              className="bg-gray-800 text-white text-4xl rounded-xl fixed right-0 bottom-0 p-1 mb-4 mr-12 shadow-md shadow-gray-300 transition:duration-300 hover:bg-gray-900"
            >
              <BsPlusLg />
            </button>
            <MyReport isOpen={open} setOpen={() => setOpen(false)} className="transition-all duration-300" />
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
