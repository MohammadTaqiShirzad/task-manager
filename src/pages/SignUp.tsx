import React, { useState, type ChangeEvent } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../utils/Api";
import { toast } from "sonner";
import Stacks from "../components/Stacks";

const SignUp = () => {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPass, setShowPass] = React.useState(false);
  const [confirmShowPass, setConfirmShowPass] = React.useState(false);
  const handlePasswordChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handlePasswordChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };
  const defaultImage = "/images/download.png"
  const [previewUrl, setPreviewUrl] = useState<string | null>(defaultImage);
  const [value, setValue] = useState({
    name: "",
    email: "",
    stack: "",
    password: "",
    passwordConfirm: "",
  });
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);

  // Handle file input change and create preview URL
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // setImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };
  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  function setStack(stack: string) {
    setValue({ ...value, stack: stack });

  }
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(value).forEach(([key, val]) => {
      if (val) formData.append(key, val);
    });
      if (!profilePhoto) {
        const response = await fetch(defaultImage);
        const blob = await response.blob();
        const file = new File([blob], "/images/download.jpg", {
          type: blob.type,
        });
        formData.append("profilePhoto", file);
      } else {
        formData.append("profilePhoto", profilePhoto);
      }
    const res = await signUp(formData);
    if (res) {
      localStorage.removeItem("token")
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } else {
      toast.error("Failed to create account. Please try again.");
    }
  }

  return (
    <>
      <div className="w-full mx-auto h-screen bg-[url('/images/Welcome.png')] bg-no-repeat bg-cover object-cover px-4 sm:px-16">
        <div className="flex flex-col gap-4 items-center justify-center my-4 sm:gap-6">
          <div className="flex flex-col gap-3 items-center text-center">
            <h1 className="text-3xl sm:text-3xl md:text-4xl text-gray-800 font-semibold">
              Create Account
            </h1>
            <p className="text-lg sm:text-xl text-gray-600">
              Fill in the details to create an account
            </p>
          </div>
          <form
            action="#"
            encType="multipart/form-data"
            className="w-4/5 sm:w-2/4 md:w-1/3 flex flex-col gap-2 sm:gap-4 relative"
          >
            <div className="bg-gray-50 size-18 sm:size-20 md:size-22 mx-auto text-center border border-gray-300 rounded-full outline-none cursor-pointer relative flex justify-center items-center">
              {previewUrl ? (
                <img
                  src={previewUrl ?? "/images/"}
                  alt=""
                  className="size-full rounded-full object-cover"
                />
              ) : (
                <IoPersonOutline className="size-10 text-gray-400 " />
              )}
              <div className="size-7 sm:size-8 absolute left-11 top-12 sm:left-12 sm:top-14 md:left-14 md:top-16 shrink-0 inset-0 flex items-center justify-center border border-gray-300 rounded-full bg-gray-400 bg-[url('/images/gallery-edit.svg')]  bg-no-repeat bg-center hover:opacity-100 transition-opacity">
                <input
                  onChange={(e) => {
                    handleImageChange(e);
                    setProfilePhoto(e.target.files ? e.target.files[0] : null);
                  }}
                  type="file"
                  name="profilePicture"
                  id="profilePicture"
                  className="opacity-0"
                />
              </div>
            </div>
            <input
              onChange={handleChangeValue}
              type="text"
              name="name"
              id="name"
              placeholder="Full Name"
              className="w-full border border-gray-300 mt-2 py-2 sm:py-3 px-4 rounded-xl outline-none  placeholder:text-gray-500 placeholder:text-xs sm:placeholder:text-sm"
            />
            <input
              onChange={handleChangeValue}
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              className="w-full border border-gray-300 py-2 sm:py-3 px-4 rounded-xl outline-none  placeholder:text-gray-500 placeholder:text-xs sm:placeholder:text-sm"
            />
            <input
              onChange={(e) => {
                handleChangeValue(e);
                handlePasswordChange1(e);
              }}
              type={showPass ? "text" : "password"}
              name="password"
              id="password"
              value={password}
              placeholder="Password"
              className="w-full border border-gray-300 py-2 sm:py-3 px-4 rounded-xl outline-none  placeholder:text-gray-500 placeholder:text-xs sm:placeholder:text-sm"
            />
            <span
              onChange={handlePasswordChange2}
              className=" absolute right-4 top-50 sm:right-4 sm:top-63 md:right-4 md:top-65 text-gray-600 cursor-pointer"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <IoEyeOffOutline /> : <IoEyeOutline />}
            </span>
            <input
              onChange={(e) => {
                handleChangeValue(e);
                handlePasswordChange2(e);
              }}
              type={confirmShowPass ? "text" : "password"}
              name="passwordConfirm"
              id="passwordConfirm"
              value={confirmPassword}
              placeholder="Confirm Password"
              className="w-full border border-gray-300 py-2 sm:py-3 px-4 rounded-xl outline-none placeholder:text-gray-500 placeholder:text-xs sm:placeholder:text-sm"
            />
            <span
              className="size-5 absolute right-3 top-63 sm:right-4 sm:top-79 md:right-3 md:top-82 text-gray-600 cursor-pointer "
              onClick={() => setConfirmShowPass(!confirmShowPass)}
            >
              {confirmShowPass ? <IoEyeOffOutline /> : <IoEyeOutline />}
            </span>
            <div>
              <Stacks setStack={setStack} />
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              className="mx-auto w-1/2 mt-2 py-1.5 sm:py-2 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-200 text-sm text-gray-600"
            >
              Sign up
            </button>
          </form>
          <div className="w-full flex flex-col gap-4 items-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-gray-600 font-semibold hover:underline ml-1.5"
              >
                Sign in.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
