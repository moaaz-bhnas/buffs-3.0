"use client";

import { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import classNames from "@/utils/style/classNames";
import { MovieSearchResult } from "@/interfaces/movies/MovieSearchResult";
import { MovieApiClient } from "@/api/movie-api-client";

const movieApiClient = new MovieApiClient();

function filterSearchResults(
  searchQuery: string,
  searchResults: MovieSearchResult[]
): MovieSearchResult[] {
  let filteredSearchResults: MovieSearchResult[];
  if (searchQuery === "") {
    filteredSearchResults = searchResults;
  } else {
    filteredSearchResults = searchResults.filter((result) =>
      result.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  return filteredSearchResults;
}

type Props = {};

function MoviesSearchInput({}: Props) {
  const [searchResults, setSearchResults] = useState<MovieSearchResult[]>([]);
  const [selectedSearchResult, setSelectedSearchResult] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const searchAndSetResults = async (searchQuery: string): Promise<void> => {
    const searchResults = await movieApiClient.searchMovies(searchQuery);
    if (searchResults) {
      setSearchResults(searchResults);
    }
  };

  useEffect(() => {
    searchAndSetResults(searchQuery);
  }, [searchQuery]);

  const filteredSearchResults = filterSearchResults(searchQuery, searchResults);

  return (
    <Combobox
      as="div"
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
              <MagnifyingGlassIcon className="absolute left-2 top-1/2 w-4 -translate-y-1/2 text-gray-500" />
            )}
            <Combobox.Input
              className={classNames(
                "w-full rounded-2xl bg-gray-200 py-2 transition placeholder:text-gray-500",
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
            <Combobox.Options className="panel top-3">
              {filteredSearchResults.map((result) => (
                <Combobox.Option
                  key={result.id}
                  value={result.id}
                  as={Fragment}
                >
                  {({ active }) => (
                    <li
                      className={classNames(
                        "menu-item",
                        active ? "cursor-pointer bg-gray-100" : ""
                      )}
                    >
                      {result.title}
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

export default MoviesSearchInput;
