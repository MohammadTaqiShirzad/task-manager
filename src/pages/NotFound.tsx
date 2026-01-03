import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-full h-screen flex flex-col gap-4 justify-center items-center">
      <h1 className="text-gray-600 text-6xl font-bold">404</h1>
      <h2 className="text-gray-700 text-4xl font-medium">Page Not Found</h2>
      <p className="text-2xl text-gray-700">Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="cursor-pointer text-blue-500 font-semibold hover:bg-gray-100 rounded py-2 px-4 hover:border-b-2 border-blue-500 transition-all duration-300">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
