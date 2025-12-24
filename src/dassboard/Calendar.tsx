import React, { useState } from "react";
// import Calendar from "react-calendar";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };
  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };
  return (
    <>
      <div className="max-w-7xl mx-auto p-4 border border-black rounded-xl shadow-md text-center">
        <div className="flex justify-evenly items-center mb-3 border">
          <button className="text-black" onClick={prevMonth}>⬅</button>
          <h2 className="text-lg font-semibold bg-gray-600">
            {currentDate.toLocaleString("default", { month: "long" })} {year}
          </h2>
          <button onClick={nextMonth}>➡</button>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="font-bold">
              {d}
            </div>
          ))}
          {[...Array(firstDay).keys()].map((_, i) => (
            <div key={`empty-${i}`}></div>
          ))}
          {[...Array(daysInMonth).keys()].map((d) => (
            <div
              key={d}
              className="p-2 rounded-md hover:bg-blue-200 cursor-pointer"
            >
              {d + 1}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Calendar;
