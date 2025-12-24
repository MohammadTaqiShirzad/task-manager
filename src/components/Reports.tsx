import React from "react";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import Calendar from "./Calender";
export default function Reports() {
  const reports = [
    {
      id: 1,
      profilePhoto: "/images/milr969373561.jpg",
      fullName: "Ali Ahmadi",
      signIn: "7:00 AM",
      signOut: "7:00 PM",
      mentor: "Ali Ahmadi",
      tutor: "Ali Ahmadi",
      tasks: "My report…",
      reports: "lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: 2,
      profilePhoto: "/images/milr969373561.jpg",
      fullName: "John Doe",
      signIn: "8:00 AM",
      signOut: "4:00 PM",
      mentor: "Jane Smith",
      tutor: "Bob Johnson",
      tasks: "Complete the project",
      reports: "lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: 3,
      profilePhoto: "/images/milr969373561.jpg",
      fullName: "Alice Johnson",
      signIn: "9:00 AM",
      signOut: "5:00 PM",
      mentor: "Michael Brown",
      tutor: "Sarah Davis",
      tasks: "Prepare presentation",
      reports: "lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: 4,
      profilePhoto: "/images/milr969373561.jpg",
      fullName: "Bob Brown",
      signIn: "10:00 AM",
      signOut: "6:00 PM",
      mentor: "Alice Johnson",
      tutor: "Michael Brown",
      tasks: "Review code",
      reports: "lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: 5,
      profilePhoto: "/images/milr969373561.jpg",
      fullName: "Charlie Green",
      signIn: "11:00 AM",
      signOut: "7:00 PM",
      mentor: "David Wilson",
      tutor: "Emily Clark",
      tasks: "Finalize report",
      reports: "lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: 6,
      profilePhoto: "/images/milr969373561.jpg",
      fullName: "Diana White",
      signIn: "8:30 AM",
      signOut: "4:30 PM",
      mentor: "James Wilson",
      tutor: "Linda Brown",
      tasks: "Prepare for meeting",
      reports: "lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: 7,
      profilePhoto: "/images/milr969373561.jpg",
      fullName: "Eva Black",
      signIn: "9:15 AM",
      signOut: "5:15 PM",
      mentor: "Chris Green",
      tutor: "Patricia White",
      tasks: "Conduct user research",
      reports: "lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
  ];

  const date = new Date();
  const currentDate = date.toLocaleDateString();
  const [calendarOpen, setCalendarOpen] = React.useState(false);
  return (
    <div className="w-full mx-auto border rounded-xl shadow-lg shadow-gray-300">
      <div className="w-full flex justify-between items-center mb-4 bg-gray-900 text-white p-2 lg:p-4 rounded-tr-xl rounded-tl-xl">
        <h2 className="text-lg font-semibold">Today</h2>
        <p className="flex items-center lg:gap-2">
          {currentDate}{" "}
          <button
            className="text-xl lg:text-2xl mx-2 cursor-pointer z-20"
            onClick={() => setCalendarOpen(!calendarOpen)}
          >
            <IoCalendarNumberOutline />
          </button>{" "}
          <Calendar isOpen={calendarOpen} setOpen={setCalendarOpen} />
        </p>
      </div>

      <div
        className="overflow-auto max-h-86"
        style={{ scrollbarWidth: "none" }}
      >
        <table className="text-sm min-w-full table whitespace-nowrap">
          <thead className="sticky top-0 bg-white z-10 px-4">
            <tr className="border-b p-3 border-gray-300 text-left text-gray-700 font-medium">
              <th className="max-sm:px-4 py-3 sm:pl-4">Full Name</th>
              <th className="max-sm:px-4">Sign in</th>
              <th className="max-sm:px-4">Sign out</th>
              <th className="max-sm:px-4">Mentor</th>
              <th className="max-sm:px-4">Tutor</th>
              <th className="max-sm:px-4">Tasks</th>
              <th className="max-sm:px-4">Reports</th>
              <th className="max-sm:px-4">Action</th>
            </tr>
          </thead>
          <tbody className="">
            {reports.map((row) => {
              const formatReports =
                row.reports.length > 30
                  ? row.reports.slice(0, 30) + "..."
                  : row.reports;
              return (
                <tr
                  key={row.id}
                  className="border-b border-gray-300 text-sm text-gray-700"
                >
                  <td className="max-sm:px-4 py-3 sm:pl-4 flex items-center gap-2 mr-4 lg:mr-0">
                    <img
                      src={row.profilePhoto}
                      alt=""
                      className="size-10 rounded-full"
                    />{" "}
                    <span>{row.fullName}</span>
                  </td>
                  <td className="max-sm:px-4 mr-4 lg:mr-0">{row.signIn}</td>
                  <td className="max-sm:px-4 mr-4 lg:mr-0">{row.signOut}</td>
                  <td className="max-sm:px-4 mr-4 lg:mr-0">{row.mentor}</td>
                  <td className="max-sm:px-4 mr-4 lg:mr-0">{row.tutor}</td>
                  <td className="max-sm:px-4 mr-4 lg:mr-0">{row.tasks}</td>
                  <td className="text-center max-sm:px-4 ">{formatReports}</td>
                  <td className="max-sm:px-4 flex gap-1 text-xl justify-center items-center ">
                    <button className="text-gray-900 hover:gray-red-800 hover:bg-gray-200 p-2 rounded-lg cursor-pointer">
                      <RiDeleteBinLine />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
