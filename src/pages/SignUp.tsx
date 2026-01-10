import React, { useState, type ChangeEvent } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../utils/Api";
import { toast } from "sonner";
import Stacks from "../components/Stacks";
import { LuLoaderCircle } from "react-icons/lu";

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
  const defaultImage = "/images/download.png";
  const [previewUrl, setPreviewUrl] = useState<string | null>(defaultImage);
  const [value, setValue] = useState({
    name: "",
    email: "",
    stack: "",
    password: "",
    passwordConfirm: "",
  });
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({
    name: "",
    email: "",
    stack: "",
    password: "",
    passwordConfirm: "",
  });

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
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setValue((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
    if (!fieldValue && fieldValue === "") {
      setErrors({ ...errors, [fieldName]: `${fieldName} is required` });
    } else {
      setErrors({ ...errors, [fieldName]: "" });
    }

    if (fieldName === "passwordConfirm") {
      if (fieldValue !== value?.password) {
        setErrors({ ...errors, passwordConfirm: "passwords do not match!" });
      }
    }
  };

  function setStack(stack: string) {
    setValue({ ...value, stack: stack });
  }
  const navigate = useNavigate();
  //

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const newErrors: Record<string, string> = {};
      const formData = new FormData();
      Object.entries(value).forEach(([key, val]) => {
        if (val) {
          formData.append(key, val);
        } else if (!val || val === "") {
          newErrors[key] = `${key} is required!`;
        }
      });
      setErrors(newErrors);

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
        localStorage.removeItem("token");
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        toast.success("Account created successfully!");
        navigate("/dashboard");
      } else {
        toast.error("Failed to create account. Please try again.");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  console.log(errors);
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
            encType="multipart/form-data"
            className="w-4/5 sm:w-2/4 md:w-1/3 flex flex-col gap-2 sm:gap-4"
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
            <div>
              <input
                onChange={handleChangeValue}
                type="text"
                name="name"
                id="name"
                required
                placeholder="Full Name"
                className="w-full border border-gray-300 mt-2 py-2 sm:py-3 px-4 rounded-xl outline-none  placeholder:text-gray-500 placeholder:text-xs sm:placeholder:text-sm"
              />
              {errors?.name && (
                <p className="text-sm text-red-500">{errors?.name}</p>
              )}
            </div>

            <div>
              <input
                onChange={handleChangeValue}
                type="email"
                name="email"
                id="email"
                required
                placeholder="E-mail"
                className="w-full border border-gray-300 py-2 sm:py-3 px-4 rounded-xl outline-none  placeholder:text-gray-500 placeholder:text-xs sm:placeholder:text-sm"
              />
              {errors?.email && (
                <p className="text-sm text-red-500">{errors?.email}</p>
              )}
            </div>

            <div>
              <div className="relative">
                <input
                  onChange={(e) => {
                    handleChangeValue(e);
                    handlePasswordChange1(e);
                  }}
                  type={showPass ? "text" : "password"}
                  name="password"
                  id="password"
                  required
                  value={password}
                  placeholder="Password"
                  className="w-full border border-gray-300 py-2 sm:py-3 px-4 rounded-xl outline-none  placeholder:text-gray-500 placeholder:text-xs sm:placeholder:text-sm"
                />
                <span
                  onChange={handlePasswordChange2}
                  className="size-6 absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </span>
              </div>
              {errors?.password && (
                <p className="text-sm text-red-500">{errors?.password}</p>
              )}
            </div>

            <div>
              <div className="relative">
                <input
                  onChange={(e) => {
                    handleChangeValue(e);
                    handlePasswordChange2(e);
                  }}
                  type={confirmShowPass ? "text" : "password"}
                  name="passwordConfirm"
                  id="passwordConfirm"
                  required
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  className="w-full border border-gray-300 py-2 sm:py-3 px-4 rounded-xl outline-none placeholder:text-gray-500 placeholder:text-xs sm:placeholder:text-sm"
                />
                <span
                  className="size-6 absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer "
                  onClick={() => setConfirmShowPass(!confirmShowPass)}
                >
                  {confirmShowPass ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </span>
              </div>
              {errors?.passwordConfirm && (
                <p className="text-sm text-red-500">
                  {errors?.passwordConfirm}
                </p>
              )}
            </div>

            <div>
              <Stacks setStack={setStack} />
              {errors?.stack && (
                <p className="text-sm text-red-500">{errors?.stack}</p>
              )}
            </div>

            <button
              type="button"
              onClick={(e) => handleSubmit(e)}
              disabled={isLoading}
              className="mx-auto w-1/2 mt-2 py-1.5 sm:py-2 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-200 text-sm text-gray-600"
            >
              {isLoading ? (
                <LuLoaderCircle className="mx-auto animate-spin" />
              ) : (
                "Sign up"
              )}
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
