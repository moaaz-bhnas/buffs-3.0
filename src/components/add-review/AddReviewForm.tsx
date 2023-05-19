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
import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ImageSize } from "@/interfaces/movies/ImageSize";
import MovieResultItem from "./MovieResultItem";
import { useUpdateEffect } from "usehooks-ts";
import { AnimatePresence, motion } from "framer-motion";
import SelectedMovieView from "./SelectedMovieView";
import useMeasure from "react-use-measure";

type Props = {
  closeModal?: () => void;
};

const movieApiClient = new MovieApiClient();

function AddReviewForm(
  { closeModal = () => {} }: Props,
  searchInputRef: ForwardedRef<HTMLInputElement>
) {
  // review data
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  // Search logic
  const [_, startTransition] = useTransition();
  const [searchResults, setSearchResults] = useState<MovieSearchResult[]>([]);
  const [selectedSearchResult, setSelectedSearchResult] =
    useState<MovieSearchResult | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectMovie = (movie: MovieSearchResult) => {
    setSelectedSearchResult(movie);
    setSearchQuery("");
    setRating(0);
  };

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

  // search icon visibility
  const [searchIconVisible, setSearchIconVisible] = useState(true);

  // height transition
  const [formRef, formBounds] = useMeasure({ offsetSize: true });

  return (
    <motion.div
      animate={{
        // height: formBounds.height > 0 ? formBounds.height : "auto",
        height: formBounds.height,
        width: formBounds.width,
      }}
      transition={{ duration: 0.4, bounce: 0 }}
    >
      <form
        ref={formRef}
        className={classNames(
          "space-y-4",
          selectedSearchResult ? "w-[50rem]" : "w-[30rem]"
        )}
      >
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

        {/* Back to search */}
        {selectedSearchResult && (
          <button
            className="flex items-center gap-x-2 underline"
            type="button"
            onClick={() => setSelectedSearchResult(null)}
          >
            <ArrowLeftIcon className="w-4" />
            Review another movie
          </button>
        )}

        {/* Search input */}
        {!selectedSearchResult && (
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
              onChange={(event) => setSearchQuery(event.target.value)}
              onFocus={() => setSearchIconVisible(false)}
              onBlur={() => setSearchIconVisible(true)}
            />
          </div>
        )}

        {/* Selected movie data */}
        <AnimatePresence>
          {selectedSearchResult && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <SelectedMovieView
                movie={selectedSearchResult}
                rating={rating}
                setRating={setRating}
                review={review}
                setReview={setReview}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Movie result grid */}
        {!selectedSearchResult && searchResults.length > 0 && (
          <motion.ul className="grid grid-cols-3 gap-x-2.5 gap-y-4 p-1" layout>
            {searchResults.map((movie, index) => (
              <motion.li key={movie.id} layout>
                <MovieResultItem movie={movie} onClick={handleSelectMovie} />
              </motion.li>
            ))}
          </motion.ul>
        )}
      </form>
    </motion.div>
  );
}

export default forwardRef(AddReviewForm);
