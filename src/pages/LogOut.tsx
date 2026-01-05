import { useNavigate } from "react-router-dom";
import { GoCheckCircle } from "react-icons/go";
type MyReportProps = {
  isOpen: boolean;
  cancelLogout: () => void;
};

const LogOut = ({ isOpen, cancelLogout }: MyReportProps) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/logout");
  };
  return (
    isOpen && (
      <div className="fixed top-0 left-0 size-full bg-black/50 mx-auto flex justify-center items-center px-4">
        <div className="w-full sm:w-1/3 md:w-1/2 lg:w-1/3 bg-white rounded-xl">
          <div className="w-full text-xl sm:text-2xl text-white font-medium bg-gray-800 rounded-tr-xl rounded-tl-xl p-3 sm:p-4">
            <span>Log out</span>
          </div>
          <div className="w-full py-6 sm:py-6 px-6 sm:px-10 md:px-12 flex flex-col gap-8 justify-center items-center">
            <h2 className="w-full text-center text-red-700 sm:text-xl md:text-2xl py-6 rounded-xl shadow shadow-gray-400">
              Do you want to Logout{" "}
            </h2>
            <div className="w-full flex gap-2 justify-between items-center">
              <button
                type="button"
                className="py-2 px-6 rounded-xl shadow shadow-gray-300 cursor-pointer"
                onClick={cancelLogout}
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="py-2 px-6 rounded-xl shadow shadow-gray-300 bg-gray-600 text-white flex gap-2 items-center cursor-pointer"
              >
                <span>Yes</span> <GoCheckCircle />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default LogOut;
