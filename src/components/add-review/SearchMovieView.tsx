"use-client";

import { TmdbDemoMovie } from "@/interfaces/tmdb/TmdbDemoMovie";
import classNames from "@/helpers/style/classNames";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import {
  Dispatch,
  ForwardedRef,
  SetStateAction,
  forwardRef,
  useState,
} from "react";
import MovieResultItem from "./MovieResultItem";

type Props = {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  searchResults: TmdbDemoMovie[];
  onSelectMovie: (movie: TmdbDemoMovie) => void;
};

function SearchMovieView(
  { searchQuery, setSearchQuery, searchResults, onSelectMovie }: Props,
  searchInputRef: ForwardedRef<HTMLInputElement>
) {
  // search icon visibility
  const [searchIconVisible, setSearchIconVisible] = useState(true);

  return (
    <div className="space-y-2">
      <div className="relative">
        <AnimatePresence>
          {searchIconVisible && (
            <motion.span exit={{ opacity: 0 }}>
              <MagnifyingGlassIcon className="absolute left-2 top-1/2 w-4 -translate-y-1/2 text-gray-500" />
            </motion.span>
          )}
        </AnimatePresence>
        <input
          ref={searchInputRef}
          type="search"
          className={classNames(
            "w-full rounded-2xl bg-gray-200 py-2 pe-3 transition-all placeholder:text-gray-500",
            searchIconVisible ? "ps-8" : "ps-3"
          )}
          aria-label="Search for reviews, movies, and other film buffs"
          placeholder="Search for a movie .."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          onFocus={() => setSearchIconVisible(false)}
          onBlur={() => setSearchIconVisible(true)}
        />
      </div>

      {/* Movie result grid */}
      {searchResults.length > 0 && (
        <motion.ul className="grid grid-cols-4 gap-x-2.5 gap-y-4 p-1" layout>
          {searchResults.map((movie) => (
            <motion.li key={movie.id} layout>
              <MovieResultItem movie={movie} onClick={onSelectMovie} />
            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>
  );
}

export default forwardRef(SearchMovieView);
