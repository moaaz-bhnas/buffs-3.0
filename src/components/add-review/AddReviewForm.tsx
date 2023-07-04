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
import ThemeButton from "../theme-button/ThemeButton";
import errorMessages from "@/utils/messages/errorMessages";
import successMessages from "@/utils/messages/successMessages";

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
  const [isLoadingResults, setIsLoadingResults] = useState(false);

  const handleSelectMovie = (movie: MovieSearchResult) => {
    setSelectedSearchResult(movie);
    setSearchQuery("");
    setRating(0);
  };

  const searchAndSetResults = async (searchQuery: string): Promise<void> => {
    if (searchQuery === "") return;

    setIsLoadingResults(true);
    const searchResult = await movieApiClient.searchMovies(searchQuery, {
      withImages: true,
      imageSize: ImageSize.lg,
    });
    if (searchResult.isOk()) {
      startTransition(() => {
        setSearchResults(searchResult.value);
        setIsLoadingResults(false);
      });
    } else {
      setIsLoadingResults(false);
    }
  };

  useEffect(() => {
    searchAndSetResults(searchQuery);
  }, [searchQuery]);

  useUpdateEffect(
    function clearResultsAfterLastAsyncFinishes() {
      if (!isLoadingResults && searchQuery === "") {
        startTransition(() => {
          setSearchResults([]);
        });
      }
    },
    [isLoadingResults, searchQuery]
  );

  // height transition
  const [formRef, formBounds] = useMeasure({ offsetSize: true });

  // submit
  const [isSuccess, setIsSuccess] = useState(false);
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

      // 2. Push
      const result = await serverApiClient.createReview(review);

      if (result.isErr()) {
        throw new Error(result.error.errorMessage);
      }

      setIsSuccess(true);
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
          <>
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

            <ThemeButton
              type="submit"
              className="w-full"
              loading={handleSubmitState.loading}
              errorMessage={
                handleSubmitState.error && errorMessages.somthingWentWrong
              }
              successMessage={isSuccess ? successMessages.review : undefined}
              disabled={rating === 0}
            >
              Post
            </ThemeButton>
          </>
        )}
      </form>
    </motion.div>
  );
}

export default forwardRef(AddReviewForm);
