"use client";

import {
  ForwardedRef,
  forwardRef,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { MovieSearchResult } from "@/interfaces/movies/MovieSearchResult";
import { MovieApiClient } from "@/api/movie-api-client";
import classNames from "@/utils/style/classNames";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ImageSize } from "@/interfaces/movies/ImageSize";
import MovieResultItem from "./MovieResultItem";
import AnimateHeight from "react-animate-height";
import { useUpdateEffect } from "usehooks-ts";

type Props = {
  closeModal?: () => void;
};

const movieApiClient = new MovieApiClient();

function AddReviewForm(
  { closeModal = () => {} }: Props,
  searchInputRef: ForwardedRef<HTMLInputElement>
) {
  // Search logic
  const [_, startTransition] = useTransition();
  const [searchResults, setSearchResults] = useState<MovieSearchResult[]>([]);
  const [selectedSearchResult, setSelectedSearchResult] =
    useState<MovieSearchResult | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  console.log({ searchResults });

  const searchAndSetResults = async (searchQuery: string): Promise<void> => {
    if (searchQuery === "") return;

    setIsLoading(true);
    const searchResult = await movieApiClient.searchMovies(searchQuery, {
      withImages: true,
      imageSize: ImageSize.lg,
    });
    if (searchResult.isOk()) {
      startTransition(() => {
        setSearchResults(searchResult.value);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    searchAndSetResults(searchQuery);
  }, [searchQuery]);

  useUpdateEffect(
    function clearResultsAfterLastAsyncFinishes() {
      if (!isLoading && searchQuery === "") {
        startTransition(() => {
          setSearchResults([]);
        });
      }
    },
    [isLoading, searchQuery]
  );

  // Animating grid height
  const gridRef = useRef<HTMLUListElement>(null);
  const [gridHeight, setGridHeight] = useState<number | "auto">(0);
  /**
   * For the grid height to be animated with movie results are generated
   * it needs to switch between two values
   * 1. The grid height starts with 0 (inital value of state)
   * 2. User types and results appear in the UI
   * 3. grid height is changed to "auto" (in useEffect) with animation
   * 4. After animation ends we calculate the current height
   * of the grid and set it.
   * 5. Repeat from 2
   */
  const handleHeightAnimationEnd = () => {
    if (!gridRef.current) return;

    const gridHeight = gridRef.current.clientHeight;
    setGridHeight(gridHeight);
  };
  useEffect(() => {
    if (searchResults.length > 0) {
      setGridHeight("auto");
    } else {
      setGridHeight(0);
    }
  }, [searchResults]);

  // search icon visibility
  const [searchIconVisible, setSearchIconVisible] = useState(true);

  return (
    <form className="space-y-4">
      <header className="flex items-center justify-between">
        <h2 className="font-semibold">Write a review</h2>
        <button
          className="bg-gray-20 flex h-10 w-10 rounded-full transition hover:bg-gray-300 focus:bg-gray-300"
          type="button"
          onClick={closeModal}
        >
          <XMarkIcon className="m-auto w-6" />
        </button>
      </header>

      {/* Search input */}
      <div className="relative">
        {searchIconVisible && (
          <MagnifyingGlassIcon className="absolute left-2 top-1/2 w-4 -translate-y-1/2 text-gray-500" />
        )}
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
          onChange={(event) => setSearchQuery(event.target.value.trim())}
          onFocus={() => setSearchIconVisible(false)}
          onBlur={() => setSearchIconVisible(true)}
        />
      </div>

      {/* Movie result grid */}
      <AnimateHeight
        height={gridHeight}
        duration={300}
        onHeightAnimationEnd={handleHeightAnimationEnd}
      >
        <ul ref={gridRef} className="grid grid-cols-3 gap-x-2.5 gap-y-4 p-1">
          {searchResults.map((movie) => (
            <li key={movie.id}>
              <MovieResultItem
                movie={movie}
                setSelectedSearchResult={setSelectedSearchResult}
              />
            </li>
          ))}
        </ul>
      </AnimateHeight>
    </form>
  );
}

export default forwardRef(AddReviewForm);
