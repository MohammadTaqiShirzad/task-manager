import Mentors from "./Mentors";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { useEffect, useState, type ChangeEvent } from "react";
import { toast } from "sonner";
import { createReport } from "../utils/Api";
import type { Report } from "./Reports";

export type CreateReportProps = {
  isOpen: boolean;
  setOpen: () => void;
  className?: string;
  report?: Report | null;
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
const CreateReport = ({ isOpen, setOpen, report }: CreateReportProps) => {
  const [value, setValue] = useState<ReportForm>({
    signIn: "",
    signOut: "",
    task: "",
    report: "",
    trainer: "",
    creator: "",
    stack: "",
  });
  useEffect(() => {
    if (report) {
      setValue({
        signIn: report.signIn,
        signOut: report.signOut,
        task: report.task,
        report: report.report,
        trainer: report.trainer._id,
        creator: report.creator._id,
        stack: report.creator.stack,
      });
    }
  }, [report]);

  if (!isOpen) return null;

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
      setOpen();
      toast.success("Report created successfully!");
    } else {
      toast.error("Failed to create report. Please try again.");
    }
  }

  const user = localStorage.getItem("user");
  const userData = user ? JSON.parse(user) : null;
  const date = new Date();
  const currentDate = date.toLocaleDateString();
  const profileUser = report?.creator || userData;

  return (
    isOpen && (
      <div className="fixed w-screen h-screen top-0 left-0 bg-black/60 flex justify-center items-center z-50 p-4">
        <div className="max-w-4xl md:w-2xl lg:w-3xl min-h-screen mx-auto flex justify-center items-center">
          <div className="w-full z-50 shadow-xl ">
            {/* Header */}
            <div className="flex justify-between items-center rounded-tr-xl rounded-tl-xl text-white bg-gray-800 py-4 px-6">
              <h2 className="text-xl sm:text-2xl font-bold">My Report</h2>
              <div className="text-gray-100 flex items-center gap-2">
                {currentDate}
                <span className="text-2xl">
                  <IoCalendarNumberOutline />
                </span>
              </div>
            </div>

            {/* Layout Grid */}
            <div className="bg-white rounded-br-xl rounded-bl-xl flex flex-col gap-4 px-6 pt-6">
              <div className="flex flex-col lg:flex-row gap-6 justify-between">
                <div className="lg:w-1/2  flex flex-col gap-6  lg:border-r-2 border-gray-300 lg:pr-6">
                  {/* Profile */}
                  <div className="border-b sm:border border-gray-400 sm:rounded-xl p-2 lg:p-4 flex items-center gap-4 sm:shadow-md shadow-gray-300">
                    <img
                      src={profileUser?.profilePhoto || ""}
                      className="w-16 h-16 rounded-full"
                      alt=""
                    />
                    <div className="w-full flex flex-col justify-center  py-2 rounded-lg">
                      <h3 className="font-semibold">
                        {profileUser?.name || "Unknown User"}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {profileUser?.stack || "Unknown stack"}
                      </p>
                    </div>
                  </div>
                  {/* Sign in/out */}
                  <div className="grid grid-cols-2 gap-2  ">
                    <div className="col-span-1 flex justify-center items-center border border-gray-400 p-2 lg:px-4 rounded-tl-lg rounded-bl-lg shadow-md shadow-gray-300 ">
                      <label className="text-xs sm:text-sm font-semibold border-r text-gray-700 border-gray-400 pr-2">
                        Sign in
                      </label>
                      {report ? (
                        <span className="w-1/2 px-2 text-xs font-medium text-gray-700 sm:text-sm">
                          {value.signIn}
                        </span>
                      ) : (
                        <input
                          type="time"
                          name="signIn"
                          onChange={(e) => {
                            const formatted = to12HourFormat(e.target.value);
                            setValue((prev) => ({
                              ...prev,
                              signIn: formatted,
                            }));
                          }}
                          className="w-1/2 outline-0 rounded-lg p-1.5 text-gray-700 text-sm font-medium sm:text-base"
                        />
                      )}
                    </div>
                    <div className="col-span-1 flex justify-center items-center border border-gray-400 p-2 lg:px-4 rounded-tr-xl rounded-br-xl shadow-md shadow-gray-300">
                      <label className="text-xs text-gray-700 whitespace-nowrap sm:text-sm font-semibold border-r border-gray-400 pr-2 ">
                        Sign out
                      </label>
                      {report ? (
                        <span className="w-1/2 px-2 text-xs sm:text-sm font-medium text-gray-700">
                          {value.signIn}
                        </span>
                      ) : (
                        <input
                          type="time"
                          name="signOut"
                          onChange={(e) => {
                            const formatted = to12HourFormat(e.target.value);
                            setValue((prev) => ({
                              ...prev,
                              signOut: formatted,
                            }));
                          }}
                          className="w-1/2 outline-0 rounded-lg p-1.5 text-gray-700 text-sm font-medium sm:text-base"
                        />
                      )}
                    </div>
                  </div>

                  {/* Mentor */}
                  <div className="border border-gray-400 rounded-xl p-2 lg:px-4 text-xs sm:text-base shadow-md shadow-gray-300 flex gap-4 items-center justify-between">
                    {report ? (
                      <span className="font-medium text-gray-700 p-2 text-xs sm:text-sm">
                        <span className="text-sm">Mentors: </span>
                        {report.trainer.name}
                      </span>
                    ) : (
                      <Mentors classes="w-full " setMentor={setMentor} />
                    )}
                  </div>
                </div>
                <div className=" flex flex-col gap-2 lg:w-1/2">
                  {/* Task Box */}
                  <div className="p-2 lg:px-4">
                    <label className="block mb-2 font-semibold text-sm text-gray-700">
                      Task:
                    </label>
                    {report ? (
                      <span className="w-full block whitespace-break-spaces h-10 lg:h-15 font-medium text-xs sm:text-sm text-gray-700 p-2 overflow-y-auto border border-gray-400 shadow-md shadow-gray-300 rounded-xl">
                        {report.task}
                      </span>
                    ) : (
                      <textarea
                        name="task"
                        placeholder="task"
                        value={value.task}
                        onChange={handleChangeValue}
                        className="w-full h-10 lg:h-15 p-2 outline-none border border-gray-400 shadow-md shadow-gray-300 rounded-xl"
                      ></textarea>
                    )}
                  </div>
                  {/* Report Box */}
                  <div className="p-2 lg:px-4 ">
                    <label className=" block mb-2 text-sm font-semibold text-gray-700">
                      Report:
                    </label>
                    {report ? (
                      <span className="block w-full whitespace-break-spaces h-15 lg:h-30 font-medium text-xs sm:text-sm text-gray-700 p-2 overflow-y-auto border border-gray-400 rounded-xl shadow-md shadow-gray-300 ">
                        {report.report}
                      </span>
                    ) : (
                      <textarea
                        name="report"
                        placeholder="report"
                        value={value.report}
                        onChange={handleChangeValue}
                        className="w-full h-15 lg:h-30 p-2 outline-none border border-gray-400 rounded-xl shadow-md shadow-gray-300"
                      ></textarea>
                    )}
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
                {!report && (
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-900 cursor-pointer"
                  >
                    Done ✓
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default CreateReport;
