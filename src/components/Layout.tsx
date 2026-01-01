import SideBar from "./SideBar";
import Dates from "./Dates";
import React, { useState } from "react";
import Search from "./Search";
import { BsPlusLg } from "react-icons/bs";
import Profile from "./Profile";
import CreateReport from "./CreateReport";
import { DateContext } from "../utils/date-context";
import { SearchContext } from "../utils/search-context";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const [open, setOpen] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  console.log(date);
  const [query, setQuery] = useState("");

  return (
    <>
      <div className="w-full h-full grid grid-cols-10 p-4 mx-auto gap-8">
        <div className="lg:col-span-2">
          <SideBar />
        </div>
        <div className="col-span-10 lg:col-span-8 w-full h-full">
          <div className="flex flex-col mx-auto gap-4">
            <Profile />
            <Dates />
            <SearchContext.Provider value={{ query, setQuery }}>
              <Search />

              <button
                onClick={() => setOpen(!open)}
                className="bg-gray-800 text-white text-4xl rounded-xl fixed right-0 bottom-0 p-1 mb-4 mr-12 shadow-md shadow-gray-300 transition:duration-300 hover:bg-gray-900"
              >
                <BsPlusLg />
              </button>
              <CreateReport isOpen={open} setOpen={() => setOpen(false)} />
              
              <div className="w-full  mx-auto border rounded-xl shadow-lg shadow-gray-300 overflow-hidden ">
                <div className="w-full flex justify-between items-center mb-4 bg-gray-900 text-white p-2 sm:p-3 lg:p-4 rounded-tr-xl rounded-tl-xl">
                  <h2 className="text-lg font-semibold">Today</h2>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="date-input outline-none"
                  />
                </div>

                <div
                  className="overflow-auto max-h-86"
                  style={{ scrollbarWidth: "none" }}
                >
                  <table className="text-sm min-w-full table whitespace-nowrap">
                    <thead className="sticky top-0 bg-white z-10 px-4">
                      <tr className="border-b p-3 border-gray-300 text-left text-gray-700 font-medium">
                        <th className="max-lg:px-4 py-3 sm:pl-4">Full Name</th>
                        <th className="max-lg:px-4">Sign in</th>
                        <th className="max-lg:px-4">Sign out</th>
                        <th className="max-lg:px-4">Mentor</th>
                        <th className="max-lg:px-4">Tasks</th>
                        <th className="max-lg:px-4">Reports</th>
                      </tr>
                    </thead>
                    <tbody>
                      <DateContext.Provider value={date.toString()}>
                        {children}
                      </DateContext.Provider>
                    </tbody>
                  </table>
                </div>
              </div>
            </SearchContext.Provider>
          </div>
        </div>
      </div>
    </>
  );
}
