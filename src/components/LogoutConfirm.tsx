import { Link } from "react-router-dom";

const LogoutConfirm = () => {
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center bg-[url('/images/Welcome.png')] bg-no-repeat bg-cover">
        <div className="w-2/3 flex flex-col gap-4 items-center">
          <h3 className="text-3xl text-gray-600 mb-2">You Log Out!</h3>
          <span className="text-gray-600">
            creat a new{" "}
            <Link to="/signup" className="text-blue-700 ">
              account
            </Link>
          </span>
          <Link
            to="/signin"
            className="text-gray-600 py-2 px-16 rounded-xl border border-gray-500 shadow-md shadow-gray-300"
          >
            Sign In
          </Link>
        </div>
      </div>
    </>
  );
};

export default LogoutConfirm;
