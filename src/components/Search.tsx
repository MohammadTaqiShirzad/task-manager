import React from "react";
import { LuSearch } from "react-icons/lu";

const Search = () => {
  return (
    <>
      <div className="w-full border border-gray-500 rounded-xl py-1 px-4 lg:py-2 shadow-md shadow-gray-300 flex justify-between items-center">
        <input type="text" placeholder="Search" className="w-full outline-0" />
        <LuSearch />
      </div>
    </>
  );
};

export default Search;
