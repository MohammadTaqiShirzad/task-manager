import { useState } from "react";
import { CiBellOn } from "react-icons/ci";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function addDays(date: Date, amount: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + amount);
  return d;
}

const Dates = () => {
  const today = new Date();

  // شروع نوار (نه هفته!)
  const [startDate, setStartDate] = useState<Date>(addDays(today, -3));

  const [selectedDate, setSelectedDate] = useState<Date>(today);

  // 7 روز پشت سر هم
  const dates = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  return (
    <div className=" flex flex-col gap-4 overflow-hidden">
      <div className="flex gap-8 items-center justify-end ">
        <div className="flex gap-4 items-center">
          <div className="flex gap-4 items-center justify-evenly border border-gray-500 rounded-xl sm:py-0.5 px-4 shadow-md shadow-gray-300">
            <h3>Ali Ahmadi</h3>
            <img
              src="/images/milr969373561.jpg"
              alt=""
              className="size-8 sm:size-9 rounded-full"
            />
          </div>
          <div className="">
            <CiBellOn className="size-8 sm:size-10 border border-gray-500 rounded-xl shadow-md shadow-gray-300" />
          </div>
        </div>
      </div>
      <div className="w-full flex items-center lg:gap-1 border rounded-xl shadow-md py-1 lg:px-4 lg:py-3">
        {/* Left */}
        <button
          className="p-2 rounded-full hover:bg-gray-100"
          onClick={() => setStartDate(addDays(startDate, -1))}
        >
          <BsChevronLeft />
        </button>

        {/* Dates */}
        <div className="flex justify-between w-full">
          {dates.map((date, i) => {
            const isSelected =
              date.toDateString() === selectedDate.toDateString();
              const currentDate =
              date.toDateString() === today.toDateString();

            return (
              <button
                key={i}
                onClick={() => setSelectedDate(date)}
                className="flex flex-col items-center lg:gap-2"
              >
                <span className="text-sm text-gray-700">
                  {days[date.getDay()]}
                </span>

                <span
                  className={`size-8 lg:size-10 text-sm flex items-center justify-center rounded-full transition
                    ${currentDate ? "bg-gray-900 text-white" : ""}
                  ${
                    isSelected
                      ? "bg-gray-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {date.getDate()}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right */}
        <button
          className="p-2 rounded-full hover:bg-gray-100"
          onClick={() => setStartDate(addDays(startDate, 1))}
        >
          <BsChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Dates;
