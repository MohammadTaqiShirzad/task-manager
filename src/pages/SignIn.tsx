import React from "react";
import { Link } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
const SignInPage = () => {
  const [password, setPassword] = React.useState("");
  const [showPass, setShowPass] = React.useState(false);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <div className="w-full bg-[url('/images/Welcome.png')] bg-no-repeat bg-cover">
        <div className="flex flex-col gap-8 items-center justify-center h-screen">
          <div className="flex flex-col gap-3 items-center">
            <h1 className="text-4xl text-gray-800 font-semibold">Sign in</h1>
            <p className="text-lg sm:text-xl text-gray-600">Here you log in securely</p>
          </div>
          <div className="w-4/5 sm:w-3/5 md:w-2/3 lg:w-1/3 flex flex-col gap-4 relative">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              className="w-full border border-gray-500 py-2 sm:py-3 px-4 rounded-xl outline-none placeholder:text-gray-500 placeholder:text-xs sm:placeholder:text-sm"
            />
            <input
              type={showPass ? "text" : "password"}
              name="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
              className="w-full border border-gray-500 py-2 sm:py-3 px-4 rounded-xl outline-none placeholder:text-gray-500 placeholder:text-xs sm:placeholder:text-sm "
            />
            <span
              className="size-6 absolute right-2 top-17 sm:right-4 sm:top-20 mt-0.5 text-gray-500 cursor-pointer"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <IoEyeOffOutline /> : <IoEyeOutline />}
            </span>
          </div>
          <div className="flex flex-col gap-4 items-center">
            <button className="text-gray-500 px-20 py-1.5 sm:py-2 border border-gray-500 rounded-xl cursor-pointer hover:bg-gray-200 text-sm">
              <Link to="/dashboard">Sign in</Link>
            </button>
            <hr className="w-[300px] text-gray-400" />
            <div className="flex flex-col items-center text-gray-500 text-sm">
              <span>Or</span>
              <p>
                {" "}
                Create an
                <Link
                  to="/account"
                  className="text-blue-500 hover:underline ml-1.5"
                >
                  account.
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
