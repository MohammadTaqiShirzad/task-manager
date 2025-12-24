"use client";

import { useState } from "react";
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

const people = [
  { id: 1, name: "Wade Cooper" },
  { id: 2, name: "Arlene Mccoy" },
  { id: 3, name: "Devon Webb" },
  { id: 4, name: "Tom Cook" },
  { id: 5, name: "Tanya Fox" },
  { id: 6, name: "Hellen Schmidt" },
  { id: 7, name: "Caroline Schultz" },
  { id: 8, name: "Mason Heaney" },
  { id: 9, name: "Claudie Smitham" },
  { id: 10, name: "Emil Schaefer" },
];

export default function Mentors({ classes }: { classes?: string }) {
  const [selected, setSelected] = useState(people[3]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <Label className="text-sm font-medium text-gray-900">
        Mentor:
      </Label>
      <div className="relative w-full">
        <ListboxButton
          className={cn(
            "grid cursor-pointer grid-cols-1 rounded-md bg-white py-2 px-6 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6",
            classes
          )}
        >
          <span className="col-start-1 row-start-1 truncate pr-6">
            {selected.name}
          </span>
          <BsChevronExpand className="col-start-1 row-start-1 self-center justify-self-end text-gray-500 sm:size-4" />
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg outline-1 outline-black/5 data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
        >
          {people.map((person) => (
            <ListboxOption
              key={person.id}
              value={person}
              className="w-full group cursor-pointer py-4 px-6 text-gray-900 select-none data-focus:bg-gray-800 data-focus:text-white data-focus:outline-hidden flex items-center rounded-md "
            >
              <IoIosCheckmarkCircleOutline className="size-4 mr-2  text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white" />{" "}
              <span className=" truncate font-normal group-data-selected:font-semibold">
                {person.name}
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
