import { Link } from "react-router-dom";
import Mentors from "./Mentors";
import { IoCalendarNumberOutline } from "react-icons/io5";
type MyReportProps = {
  isOpen: boolean;
  setOpen: () => void;
  className?: string;
};

const MyReport = ({ isOpen, setOpen, className }: MyReportProps) => {
  const date = new Date();
  // const [day, setDay] = React.useState(date.getDate());
  const currentDate = date.toLocaleDateString();
  return (
    isOpen && (
      <div className="fixed w-screen h-screen top-0 left-0 bg-black/30 flex justify-center items-center z-50 p-4">
        <div className="max-w-7xl min-h-screen mx-auto flex justify-center items-center">
          <div className="w-full shadow-xl overflow-hidden rounded-none lg:rounded-2xl">
            {/* Header */}
            <div className="flex justify-between items-center text-white bg-gray-800 py-4 px-6">
              <h2 className="text-2xl font-bold">My Report</h2>
              <div className="text-gray-100 flex items-center gap-2">
                {currentDate}
                <span className="text-2xl cursor-pointer">
                  <Link to="/calendar">
                    <IoCalendarNumberOutline />
                  </Link>{" "}
                </span>
              </div>
            </div>

            {/* Layout Grid */}
            <div className="bg-white flex flex-col gap-4 px-6 pt-6">
              <div className="flex flex-col lg:flex-row gap-6 justify-between">
                <div className="lg:w-1/2  flex flex-col gap-6  lg:border-r-2 border-gray-300 lg:pr-6">
                  {/* Profile */}
                  <div className="border-b sm:border border-gray-400 sm:rounded-xl p-4 flex items-center gap-4 sm:shadow-md shadow-gray-300">
                    <img
                      src="/images/milr969373561.jpg"
                      className="w-16 h-16 rounded-full"
                      alt="profile"
                    />
                    <div className="w-full flex flex-col justify-center  py-2 rounded-lg">
                      <h3 className="font-semibold">Ali ahmad Mohammadi</h3>
                      <p className="text-sm text-gray-500">UI/UX Designer</p>
                    </div>
                  </div>
                  {/* Sign in/out */}
                  <div className="grid grid-cols-2 gap-2  ">
                    <div className="col-span-1 flex justify-center items-center border border-gray-400 p-2 sm:p-4 rounded-tl-lg rounded-bl-lg shadow-md shadow-gray-300 ">
                      <label className="text-xs sm:text-sm font-semibold border-r border-gray-400 pr-2">
                        Sign in
                      </label>
                      <input
                        type="time"
                        className="w-1/2 outline-0 rounded-lg p-1.5 text-gray-700 text-sm font-medium sm:text-base"
                      />
                    </div>
                    <div className="col-span-1 flex justify-center items-center border border-gray-400 p-2 sm:p-4 rounded-tr-xl rounded-br-xl shadow-md shadow-gray-300">
                      <label className="text-xs sm:text-sm font-semibold border-r border-gray-400 pr-2 ">
                        Sign out
                      </label>
                      <input
                        type="time"
                        className="w-1/2 outline-0 rounded-lg p-1.5 text-gray-700 text-sm font-medium sm:text-base"
                      />
                    </div>
                  </div>

                  {/* Mentor */}
                  <div className="border border-gray-400 rounded-xl py-2 text-xs sm:text-base sm:py-4 px-8 shadow-md shadow-gray-300 flex gap-4 items-center justify-between">
                    <Mentors classes="w-full" />
                  </div>
                  {/* Tutor */}
                  <div className="border border-gray-400 rounded-xl py-1.5 sm:py-4 px-8 shadow-md shadow-gray-300 flex gap-4 items-center justify-between">
                    <label className="font-semibold">Tutor :</label>
                    <input className="w-4/6 rounded-lg py-1.5 outline-none" />
                  </div>
                </div>
                <div className=" flex flex-col gap-6 lg:w-1/2">
                  {/* Task Box */}
                  <div className="border border-gray-400 shadow-md shadow-gray-300 rounded-xl p-4">
                    <label className="font-semibold">Task :</label>
                    <textarea className="w-full h-10 sm:h-20 rounded-lg p-4 outline-none"></textarea>
                  </div>
                  {/* Report Box */}
                  <div className="border border-gray-400 rounded-xl p-4 shadow-md shadow-gray-300">
                    <label className="text-sm font-semibold">Report</label>
                    <textarea className="w-full h-20 sm:h-40 rounded-lg p-2 outline-none"></textarea>
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-between lg:justify-end gap-4 my-4">
                <button
                  onClick={setOpen}
                  className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={setOpen}
                  className="px-6 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-900 cursor-pointer"
                >
                  Done ✓
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default MyReport;
