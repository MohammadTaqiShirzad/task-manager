import React, { useState, type ChangeEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { toast } from "sonner";
import { signIn } from "../utils/Api";
import { useLoginUser } from "../utils/authContext";

type TSignIn = {
  email: string;
  password: string;
};

const SignIn = () => {
  const [password, setPassword] = React.useState("");
  const [showPass, setShowPass] = React.useState(false);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const [value, setValue] = useState<TSignIn>({
    email: "",
    password: "",
  });
  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  console.log(value);
  const navigate = useNavigate();
  const { setHasToken } = useLoginUser();


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await signIn(value);
    if (res) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setHasToken(true); 
      navigate("/dashboard"); 
      toast.success("Signed In successfully!");
      navigate("/dashboard");
    } else {
      toast.error("Failed to sign in. Please try again.");
    }
  }

  return (
    <>
      <div className="w-full bg-[url('/images/Welcome.png')] bg-no-repeat bg-cover">
        <div className="flex flex-col gap-8 items-center justify-center h-screen">
          <div className="flex flex-col gap-3 items-center">
            <h1 className="text-4xl text-gray-800 font-semibold">Sign in</h1>
            <p className="text-lg sm:text-xl text-gray-600">
              Here you log in securely
            </p>
          </div>
          <form
            action={"#"}
            encType="multipart/form-data"
            className="w-4/5 sm:w-3/5 md:w-2/3 lg:w-1/3 flex flex-col gap-4 relative"
          >
            <input
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              onChange={handleChangeValue}
              className="w-full border border-gray-300 py-2 sm:py-3 px-4 rounded-xl outline-none placeholder:text-gray-500 placeholder:text-xs sm:placeholder:text-sm"
            />
            <input
              type={showPass ? "text" : "password"}
              name="password"
              id="password"
              value={password}
              onChange={(e) => {
                handlePasswordChange(e);
                handleChangeValue(e);
              }}
              placeholder="Password"
              className="w-full border border-gray-300 py-2 sm:py-3 px-4 rounded-xl outline-none placeholder:text-gray-500 placeholder:text-xs sm:placeholder:text-sm "
            />
            <span
              className="size-6 absolute right-2 top-17 sm:right-4 sm:top-20 mt-0.5 text-gray-500 cursor-pointer"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <IoEyeOffOutline /> : <IoEyeOutline />}
            </span>
            <button
              type="button"
              onClick={handleSubmit}
              className="w-1/2 mx-auto text-gray-500 py-1.5 sm:py-2 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-200 text-sm"
            >
              Sign in
            </button>
          </form>
          <div className="flex flex-col gap-4 items-center">
            <hr className="w-[300px] text-gray-400" />
            <div className="flex flex-col items-center text-gray-500 text-sm">
              <span>Or</span>
              <p>
                {" "}
                Create an
                <Link
                  to="/signup"
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
export default SignIn;
