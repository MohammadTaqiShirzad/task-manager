import { Link } from "react-router-dom";
import Mentors from "./Mentors";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { useState, type ChangeEvent } from "react";
import { toast } from "sonner";
import { createReport } from "../utils/Api";
export type CreateReportProps = {
  isOpen: boolean;
  setOpen: () => void;
  className?: string;
};
export type ReportForm = {
  signIn: string;
  signOut: string;
  task: string;
  report: string;
  trainer?: string;
  creator?: string;
  stack?: string;
};
const CreateReport = ({ isOpen, setOpen }: CreateReportProps) => {
  const [value, setValue] = useState<ReportForm>({
    signIn: "",
    signOut: "",
    task: "",
    report: "",
    trainer: "",
    creator: "",
    stack: "",
  });
  const handleChangeValue = (e: ChangeEvent<HTMLElement>) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    setValue((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  function setMentor(mentor: string) {
    setValue({ ...value, trainer: mentor });
  }
  console.log(value);
  const to12HourFormat = (time: string) => {
    if (!time) return "";

    const [hours, minutes] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes);

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trainer) {
      toast.error("Please select a mentor");
      return;
    }
    const res = await createReport(value);
    if (res) {
      setOpen()
      toast.success("Report created successfully!");
    } else {
      toast.error("Failed to create report. Please try again.");
    }
    console.log(res);
  }

  const user = localStorage.getItem("user");
  const userData = user ? JSON.parse(user) : null;
  const date = new Date();
  const currentDate = date.toLocaleDateString();

  return (
    isOpen && (
      <div className="fixed w-screen h-screen top-0 left-0 bg-black/60 flex justify-center items-center z-50 p-4">
        <div className="max-w-7xl min-h-screen mx-auto flex justify-center items-center" >
          <div className="w-full shadow-xl overflow-hidden rounded lg:rounded-2xl ">
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
                  <div className="border-b sm:border border-gray-400 sm:rounded-xl p-2 lg:p-4 flex items-center gap-4 sm:shadow-md shadow-gray-300">
                    <img
                      src={userData?.profilePhoto || ""}
                      className="w-16 h-16 rounded-full"
                      alt=""
                    />
                    <div className="w-full flex flex-col justify-center  py-2 rounded-lg">
                      <h3 className="font-semibold">
                        {userData?.name || "Unknown User"}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {userData?.stack || "UI/UX Designer"}
                      </p>
                    </div>
                  </div>
                  {/* Sign in/out */}
                  <div className="grid grid-cols-2 gap-2  ">
                    <div className="col-span-1 flex justify-center items-center border border-gray-400 p-2 lg:px-4 rounded-tl-lg rounded-bl-lg shadow-md shadow-gray-300 ">
                      <label className="text-xs sm:text-sm font-semibold border-r border-gray-400 pr-2">
                        Sign in
                      </label>
                      <input
                        name="signIn"
                        type="time"
                        onChange={(e) => {
                          const formatted = to12HourFormat(e.target.value);
                          setValue((prev) => ({ ...prev, signIn: formatted }));
                        }}
                        className="w-1/2 outline-0 rounded-lg p-1.5 text-gray-700 text-sm font-medium sm:text-base"
                      />
                    </div>
                    <div className="col-span-1 flex justify-center items-center border border-gray-400 p-2 lg:px-4 rounded-tr-xl rounded-br-xl shadow-md shadow-gray-300">
                      <label className="text-xs whitespace-nowrap sm:text-sm font-semibold border-r border-gray-400 pr-2 ">
                        Sign out
                      </label>
                      <input
                        name="signOut"
                        type="time"
                        onChange={(e) => {
                          const formatted = to12HourFormat(e.target.value);
                          setValue((prev) => ({ ...prev, signOut: formatted }));
                        }}
                        className="w-1/2 outline-0 rounded-lg text-gray-700 text-sm font-medium sm:text-base"
                      />
                    </div>
                  </div>

                  {/* Mentor */}
                  <div className="border border-gray-400 rounded-xl p-2 lg:px-4 text-xs sm:text-base shadow-md shadow-gray-300 flex gap-4 items-center justify-between">
                    <Mentors classes="w-full" setMentor={setMentor} />
                  </div>
                </div>
                <div className=" flex flex-col gap-6 lg:w-1/2">
                  {/* Task Box */}
                  <div className="flex border border-gray-400 shadow-md shadow-gray-300 rounded-xl p-2 lg:px-4">
                    <label className="font-semibold">Task:</label>
                    <textarea
                      name="task"
                      onChange={handleChangeValue}
                      className="w-full h-10 lg:h-15 rounded-lg p-2 outline-none"
                    ></textarea>
                  </div>
                  {/* Report Box */}
                  <div className="flex  border border-gray-400 rounded-xl p-2 lg:px-4 shadow-md shadow-gray-300">
                    <label className="text-sm font-semibold">Report:</label>
                    <textarea
                      name="report"
                      onChange={handleChangeValue}
                      className="w-full h-15 lg:h-30 rounded-lg p-2 outline-none"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-between lg:justify-end gap-8 my-4">
                <button
                  onClick={setOpen}
                  className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
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

export default CreateReport;
