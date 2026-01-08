import { GoArrowRight } from "react-icons/go";
import { GoArrowLeft } from "react-icons/go";
import { GoCheckCircle } from "react-icons/go";
import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { cn } from "../utils/cn";

const Stacks = ({ setStack }: { setStack: (stack: string) => void }) => {
  const stackOptions = [
    {
      label: "Frontend Developer",
      value: "Front-end Developer",
      className: "sm:rounded-tl-xl sm:rounded-bl-xl",
    },
    {
      label: "Backend Developer",
      value: "Back-end Developer",
      className: "sm:rounded-tr-xl sm:rounded-br-xl",
    },
    {
      label: "Fullstack Developer",
      value: "Full-stack Developer",
      className: "sm:rounded-tl-xl sm:rounded-bl-xl",
    },
    {
      label: "UI/UX Designer",
      value: "UI/UX designer",
      className: "sm:rounded-tr-xl sm:rounded-br-xl",
    },
    {
      label: "Mobile Developer",
      value: "Mobile",
      className: "sm:rounded-tl-xl sm:rounded-bl-xl",
    },
    {
      label: "Media",
      value: "Media",
      className: "sm:rounded-tr-xl sm:rounded-br-xl",
    },
  ];

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const selectedOption = stackOptions.find(
    (option) => option.value === selectedValue
  );

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full border border-gray-300 rounded-xl px-4 py-2.5 sm:py-3 text-sm text-gray-700 text-start hover:bg-gray-950/10 cursor-pointer flex items-center justify-between"
      >
        <span className={selectedValue ? "text-gray-500" : "text-gray-500"}>
          {selectedOption?.label ?? "Choose your stack"}
        </span>
        <GoArrowRight className="text-xl ml-4" />
      </button>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/85 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="sm:w-2/3 relative transform overflow-hidden rounded-lg bg-white px-4 py-6 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8  sm:max-w-lg sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <div className="mb-4 sm:mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">
                      What's Your Field?
                    </h1>
                    <p className="text-gray-800">
                      {selectedValue ? selectedValue : "Select mentor"}
                    </p>
                  </div>
                  <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
                    {stackOptions.map((option) => {
                      return (
                        <button
                          type="button"
                          key={option.value}
                          onClick={() => {
                            setSelectedValue(option.value);
                            setStack(option.value);
                          }}
                          className={`${cn(
                            "border border-gray-300 rounded-none px-3 py-2 text-sm text-gray-800 hover:bg-gray-950/10 cursor-pointer flex items-center gap-1",
                            option.className,
                            selectedValue === option.value
                              ? "bg-gray-600 text-white"
                              : "bg-white text-gray-600 border-gray-300 hover:bg-gray-950/10"
                          )}`}
                        >
                          <GoCheckCircle />
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6  flex gap-2 flex-col">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                  }}
                  className="w-2/3 sm:w-1/3 mx-auto text-gray-700 border border-gray-500 rounded-xl bg-[#D0E8FF] px-3 py-1.5 text-sm  shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2 flex items-center justify-center gap-1"
                >
                  Continue
                  <GoArrowRight />
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpen(false)}
                  className="w-2/3 sm:w-1/3 mx-auto text-gray-700 border border-gray-500 rounded-xl px-3 py-1.5 text-sm  shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2 flex items-center justify-center gap-1"
                >
                  <GoArrowLeft />
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
export default Stacks;
