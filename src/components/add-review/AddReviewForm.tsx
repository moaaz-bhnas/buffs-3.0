"use client";

import { useEffect, useState } from "react";
import { MovieSearchResult } from "@/interfaces/movies/MovieSearchResult";
import { MovieApiClient } from "@/api/movie-api-client";
import classNames from "@/utils/style/classNames";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ImageType } from "@/interfaces/movies/ImageType";
import { ImageSize } from "@/interfaces/movies/ImageSize";
import MovieResultItem from "./MovieResultItem";

type Props = {};

const movieApiClient = new MovieApiClient();

function AddReviewForm({}: Props) {
  // Search related states
  const [searchResults, setSearchResults] = useState<MovieSearchResult[]>([]);
  const [selectedSearchResult, setSelectedSearchResult] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // search icon visibility
  const [searchIconVisible, setSearchIconVisible] = useState(true);

  const searchAndSetResults = async (searchQuery: string): Promise<void> => {
    const searchResults = await movieApiClient.searchMovies(searchQuery, {
      imageType: ImageType.backdrop,
      imageSize: ImageSize.sm,
    });
    console.log({ searchResults });
    if (searchResults) {
      setSearchResults(searchResults);
    }
  };

  useEffect(() => {
    searchAndSetResults(searchQuery);
  }, [searchQuery]);

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
          placeholder="Search"
          onChange={(event) => setSearchQuery(event.target.value)}
          onFocus={() => setSearchIconVisible(false)}
          onBlur={() => setSearchIconVisible(true)}
        />
      </div>

      {/* Movie result grid */}
      <ul className="flex">
        {searchResults.map((movie) => (
          <li key={movie.id}>
            <MovieResultItem movie={movie} />
          </li>
        ))}
      </ul>
    </form>
  );
}

export default AddReviewForm;
