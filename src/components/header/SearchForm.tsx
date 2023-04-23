"use client";

import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import classNames from "@/utils/style/classNames";

type Props = {};

const searchResults = ["Gone Girl", "The Perks of Being a Walflower"];

function SearchForm({}: Props) {
  const [selectedSearchResult, setSelectedSearchResult] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSearchResults =
    searchQuery === ""
      ? searchResults
      : searchResults.filter((person) => {
          return person.toLowerCase().includes(searchQuery.toLowerCase());
        });

  return (
    <Combobox
      as="form"
      className="relative"
      value={selectedSearchResult}
      onChange={setSelectedSearchResult}
      nullable
    >
      {({ open }) => (
        <>
          {/* Combobox.Button is added to make the combobox expands once the input is focused  */}
          <Combobox.Button as="div" className="relative">
            {!open && (
              <MagnifyingGlassIcon className="w-4 absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
            )}
            <Combobox.Input
              className={classNames(
                "placeholder:text-gray-500 bg-gray-200 py-2 rounded-2xl w-full transition focus:outline-none focus:ring-2 focus:ring-teal-400",
                !open ? "ps-8" : "ps-3"
              )}
              aria-label="Search for reviews, movies, and other film buffs"
              placeholder="Search"
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </Combobox.Button>
          <Transition
            enter="transition duration-100 ease-oudoppler"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Combobox.Options className="absolute w-full rounded shadow-lg border top-3 bg-white">
              {filteredSearchResults.map((result) => (
                <Combobox.Option key={result} value={result} as={Fragment}>
                  {({ active }) => (
                    <li
                      className={classNames(
                        "p-3 border-b flex justify-between",
                        active ? "bg-gray-100 cursor-pointer" : ""
                      )}
                    >
                      {result}
                    </li>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>
        </>
      )}
    </Combobox>
  );
}

export default SearchForm;
