"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { MovieSearchResult } from "@/interfaces/movies/MovieSearchResult";
import { MovieApiClient } from "@/api/movie-api-client";
import classNames from "@/utils/style/classNames";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ImageType } from "@/interfaces/movies/ImageType";
import { ImageSize } from "@/interfaces/movies/ImageSize";
import MovieResultItem from "./MovieResultItem";
import AnimateHeight from "react-animate-height";

type Props = {};

const movieApiClient = new MovieApiClient();

function AddReviewForm({}: Props) {
  // Search logic
  const [_, startTransition] = useTransition();
  const [searchResults, setSearchResults] = useState<MovieSearchResult[]>([]);
  const [selectedSearchResult, setSelectedSearchResult] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const searchAndSetResults = async (searchQuery: string): Promise<void> => {
    const searchResults = await movieApiClient.searchMovies(searchQuery, {
      imageType: ImageType.backdrop,
      imageSize: ImageSize.sm,
    });
    if (searchResults) {
      startTransition(() => {
        setSearchResults(searchResults);
      });
    }
  };

  useEffect(() => {
    searchAndSetResults(searchQuery);
  }, [searchQuery]);

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
    <form className="space-y-3">
      <h2 className="font-semibold">Write a review</h2>

      {/* Search input */}
      <div className="relative">
        {searchIconVisible && (
          <MagnifyingGlassIcon className="absolute left-2 top-1/2 w-4 -translate-y-1/2 text-gray-500" />
        )}
        <input
          type="search"
          className={classNames(
            "w-full rounded-2xl bg-gray-200 py-2 transition placeholder:text-gray-500 ",
            searchIconVisible ? "ps-8" : "ps-3"
          )}
          aria-label="Search for reviews, movies, and other film buffs"
          placeholder="Search for a movie .."
          onChange={(event) => setSearchQuery(event.target.value)}
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
        <ul ref={gridRef} className="grid grid-cols-3 gap-x-2 gap-y-4">
          {searchResults.map((movie) => (
            <li key={movie.id}>
              <MovieResultItem movie={movie} />
            </li>
          ))}
        </ul>
      </AnimateHeight>
    </form>
  );
}

export default AddReviewForm;
