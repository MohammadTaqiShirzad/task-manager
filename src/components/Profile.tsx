import { CiBellOn } from "react-icons/ci";

const Profile = () => {
  const user = localStorage.getItem("user");
  const userData = user ? JSON.parse(user) : null;
  return (
    <div className="flex gap-8 items-center justify-end ">
      <div className="flex gap-4 items-center">
        <div className="flex gap-4 items-center justify-evenly border border-gray-300 rounded-xl sm:py-0.5 px-4 shadow-md shadow-gray-300">
          <h3>{userData?.name || "User Name"}</h3>
          <img
            src={userData?.profilePhoto}
            alt=""
            className="size-8 sm:size-9 rounded-full object-cover"
          />
        </div>
        <div className="">
          <CiBellOn className="size-8 sm:size-10 border border-gray-300 rounded-xl shadow-md shadow-gray-300" />
        </div>
      </div>
    </div>
  );
};

export default Profile;
