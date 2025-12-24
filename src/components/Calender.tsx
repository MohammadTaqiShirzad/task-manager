import { useState } from "react";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { GrNext, GrPrevious } from "react-icons/gr";
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
type CalendarProps = {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
};

const Calendar = ({ isOpen, setOpen }: CalendarProps) => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));

  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const isSelected = (day: number) =>
    selectedDate &&
    selectedDate.getDate() === day &&
    selectedDate.getMonth() === month &&
    selectedDate.getFullYear() === year;

  return (
    isOpen && (
      <div
        className="fixed top-0 left-0 z-50 size-full bg-black/70 mx-auto flex justify-center items-center px-4"
        onClick={() => setOpen(false)}
      >
        <div className="w-full md:w-2/3  lg:w-1/2  rounded-xl overflow-hidden bg-white"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-slate-800 text-white px-6 py-4">
            <h2 className="text-xl font-semibold">
              {currentDate.toLocaleString("default", { month: "long" })}
            </h2>

            <div className="flex gap-4 items-center">
              {year} <IoCalendarNumberOutline className="size-5" />
            </div>
          </div>

          {/* Days */}
          <div className="w-full flex gap-2 pb-2 px-4 items-center">
            <button onClick={prevMonth} className="text-gray-700">
              <GrPrevious />
            </button>
            <div className="flex-1">
              <div className="grid grid-cols-7 border-b ">
                {days.map((day) => (
                  <div
                    key={day}
                    className="py-2 text-center font-medium text-gray-700"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Dates */}
              <div className="grid grid-cols-7 items-center text-center justify-center">
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                  <div key={i} />
                ))}

                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  return (
                    <div
                      key={day}
                      onClick={() =>
                        setSelectedDate(new Date(year, month, day))
                      }
                      className={`size-6 text-xs sm:size-10 flex items-center text-gray-700 justify-center cursor-pointer m-1 bg-gray-100 rounded-lg  
                ${
                  isSelected(day)
                    ? "bg-gray-900 text-white  "
                    : "hover:bg-slate-100"
                }`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>
            <button onClick={nextMonth} className="text-gray-700"> 
              <GrNext />
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Calendar;
