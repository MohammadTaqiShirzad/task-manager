import { Link } from "react-router-dom";
const Welcome = () => {
  const isLoginedIn = localStorage.getItem("token");
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
        {isLoginedIn ? (
          <Link
            to="/dashboard"
            className="w-[250px] text-gray-700 py-2 px-4 text-sm text-center border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-200"
          >
            Go to Dashboard
          </Link>
        ) : (
          <div className="flex flex-col gap-4">
            <Link
              to="/signin"
              className="w-[250px] text-gray-700 py-2 px-4 text-sm text-center border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-200"
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              className="w-[250px] text-gray-700 py-2 px-4 text-sm text-center border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-200"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Welcome;
