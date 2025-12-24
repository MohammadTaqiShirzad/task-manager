import React from "react";
import { Link } from "react-router-dom";
// import SignInPage from "./SignInPage";
const Welcome = () => {
  return (
    <>
      <div className=" flex flex-col gap-3 items-center justify-center h-screen">
        <h1 className="text-4xl text-gray-800 font-semibold">Welcome Back</h1>
        <p className="text-xl text-gray-700">Here you log in securely</p>
        <img
          src="/images/Group.png"
          alt="Login Illustration"
          className="w-[300px] my-6"
        />
        <Link
          to="/signin"
          className="w-[250px] text-gray-700 py-2 px-4 text-sm text-center border border-gray-500 rounded-xl cursor-pointer hover:bg-gray-200"
        >
          Sign in
        </Link>
        <Link
          to="/account"
          onClick={(e) => {
            console.log(e);
            e.preventDefault();
            window.location.href = "/account";
          }}
          className="w-[250px] text-gray-700 py-2 px-4 text-sm text-center border border-gray-500 rounded-xl cursor-pointer hover:bg-gray-200"
        >
          Sign up
        </Link>
      </div>
    </>
  );
};

export default Welcome;
