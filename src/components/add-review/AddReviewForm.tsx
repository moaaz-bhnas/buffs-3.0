"use client";

import {
  FormEvent,
  ForwardedRef,
  forwardRef,
  useEffect,
  useState,
  useTransition,
} from "react";
import { MovieSearchResult } from "@/interfaces/tmdb/MovieSearchResult";
import { MovieApiClient } from "@/apis/movie-api-client";
import classNames from "@/helpers/style/classNames";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ImageSize } from "@/interfaces/tmdb/ImageSize";
import { useUpdateEffect } from "usehooks-ts";
import { motion } from "framer-motion";
import SelectedMovieView from "./SelectedMovieView";
import useMeasure from "react-use-measure";
import SearchMovieView from "./SearchMovieView";
import { useAsyncFn } from "react-use";
import { RegisteringReview } from "@/interfaces/database/RegisteringReview";
import mapTmdbMovieToDBMovie from "@/helpers/reviews/mapTmdbMovieToDBMovie";
import { ServerApiClient } from "@/apis/server-api-client";

type Props = {
  closeModal?: () => void;
};

const movieApiClient = new MovieApiClient();
const serverApiClient = new ServerApiClient();

type TOnSubmit = (event: FormEvent<HTMLFormElement>) => Promise<void>;

function AddReviewForm(
  { closeModal = () => {} }: Props,
  searchInputRef: ForwardedRef<HTMLInputElement>
) {
  // review data
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

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

  // height transition
  const [formRef, formBounds] = useMeasure({ offsetSize: true });

  // submit
  const [handleSubmitState, handleSubmit] = useAsyncFn<TOnSubmit>(
    async (event) => {
      // 1. prevent default behaviour on submit
      event.preventDefault();

      // 2. collect review data
      if (!selectedSearchResult) {
        return;
      }
      const review: RegisteringReview = {
        movieDetails: mapTmdbMovieToDBMovie(selectedSearchResult),
        rating,
        review: reviewText,
      };

      // 3. Push
      const result = serverApiClient.createReview(review); // pass token too
    },
    [rating, reviewText, selectedSearchResult]
  );

  return (
    <motion.div
      animate={{
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
        onSubmit={handleSubmit}
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

        {/* 1. Search view */}
        {!selectedSearchResult && (
          <SearchMovieView
            ref={searchInputRef}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchResults={searchResults}
            onSelectMovie={handleSelectMovie}
          />
        )}

        {/* 2. Selected view */}
        {selectedSearchResult && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <SelectedMovieView
              movie={selectedSearchResult}
              rating={rating}
              setRating={setRating}
              reviewText={reviewText}
              setReviewText={setReviewText}
              setSelectedSearchResult={setSelectedSearchResult}
            />
          </motion.div>
        )}
      </form>
    </motion.div>
  );
}

export default forwardRef(AddReviewForm);
