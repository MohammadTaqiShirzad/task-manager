"use client";

import { useEffect, useState } from "react";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { BsChevronExpand } from "react-icons/bs";
import { cn } from "../utils/cn";
import { trainers } from "../utils/Api";

type Trainer = {
  _id: string;
  name: string;
};
type MentorsProps = {
  classes?: string;
  setMentor: (mentor: string) => void;
};

export default function Mentors({ classes, setMentor }: MentorsProps) {
  const [trainer, setTrainer] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Trainer | null>(null);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const data = await trainers();
        setTrainer(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load my reports.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  if (loading) return <p className="p-4">Loading my reports...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  return (
    <Listbox
      value={selected}
      onChange={(value) => {
        setSelected(value);
        if (value) setMentor(value?._id);
      }}
    >
      <Label className="text-sm font-medium text-gray-900">Mentor:</Label>
      <div className="relative w-full">
        <ListboxButton
          className={cn(
            "grid cursor-pointer grid-cols-1 rounded-md bg-white py-2 px-6 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6",
            classes
          )}
        >
          <span className="col-start-1 row-start-1 truncate pr-6">
            {selected ? selected.name : "Select mentor"}
          </span>
          <BsChevronExpand className="col-start-1 row-start-1 self-center justify-self-end text-gray-500 sm:size-4" />
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg outline-1 outline-black/5 data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
        >
          {Array.isArray(trainer) &&
            trainer.map((tr: Trainer) => (
              <ListboxOption
                key={tr._id}
                value={tr}
                className="w-full group cursor-pointer py-4 px-6 text-gray-900 select-none data-focus:bg-gray-800 data-focus:text-white data-focus:outline-hidden flex items-center rounded-md "
              >
                <IoIosCheckmarkCircleOutline className="size-4 mr-2  text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white" />{" "}
                <span className=" truncate font-normal group-data-selected:font-semibold">
                  {tr.name}
                </span>
              </ListboxOption>
            ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
